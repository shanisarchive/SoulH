import React from 'react';
import { Sparkles } from 'lucide-react';
import { useJournalPrompts } from '../../hooks/useJournalPrompts';

interface JournalPromptsProps {
  quadrant: string;
}

const JournalPrompts: React.FC<JournalPromptsProps> = ({ quadrant }) => {
  const { prompts, selectPrompt } = useJournalPrompts(quadrant);

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Sparkles className="h-5 w-5 text-purple-500" />
        <h3 className="text-lg font-semibold text-gray-900">Journal Prompts</h3>
      </div>
      <div className="space-y-4">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => selectPrompt(prompt)}
            className="w-full p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors text-left"
          >
            <p className="text-purple-800">{prompt}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default JournalPrompts;