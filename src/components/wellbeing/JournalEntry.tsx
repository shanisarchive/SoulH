import React, { useState } from 'react';
import { Save, Book, Hash, Smile } from 'lucide-react';
import { useJournal } from '../../hooks/useJournal';

interface JournalEntryProps {
  quadrant: string;
}

const JournalEntry: React.FC<JournalEntryProps> = ({ quadrant }) => {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState(5);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const { saveEntry } = useJournal();

  const handleSave = async () => {
    if (!content) return;
    
    setIsSaving(true);
    try {
      await saveEntry({
        content,
        quadrant,
        mood,
        tags
      });
      setContent('');
      setTags([]);
      setTagInput('');
    } catch (error) {
      console.error('Error saving entry:', error);
    }
    setIsSaving(false);
  };

  const handleAddTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Book className="h-5 w-5 text-rose-500" />
          <h3 className="text-lg font-semibold text-gray-900">Journal Entry</h3>
        </div>
        <button
          onClick={handleSave}
          disabled={!content || isSaving}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
            content && !isSaving
              ? 'bg-rose-500 text-white hover:bg-rose-600'
              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? 'Saving...' : 'Save'}</span>
        </button>
      </div>

      {/* Mood Slider */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Mood</span>
          <Smile className={`h-5 w-5 ${
            mood > 7 ? 'text-green-500' :
            mood > 4 ? 'text-yellow-500' :
            'text-red-500'
          }`} />
        </div>
        <input
          type="range"
          min="1"
          max="10"
          value={mood}
          onChange={(e) => setMood(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Tags Input */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <Hash className="h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
            placeholder="Add tags..."
            className="flex-1 text-sm border-b border-gray-200 focus:border-rose-500 focus:outline-none"
          />
        </div>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 rounded-full text-sm bg-rose-100 text-rose-700"
              >
                #{tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="ml-1 text-rose-500 hover:text-rose-700"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your thoughts here..."
        className="w-full h-64 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 resize-none"
      />

      <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
        <span>{content.length} characters</span>
        <span>Last saved: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
};

export default JournalEntry;