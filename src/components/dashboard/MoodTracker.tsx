import React from 'react';
import { Brain } from 'lucide-react';

const MoodTracker = () => {
  const moods = [
    { emoji: '😊', label: 'Happy', percentage: 40 },
    { emoji: '😌', label: 'Calm', percentage: 30 },
    { emoji: '😔', label: 'Sad', percentage: 15 },
    { emoji: '😤', label: 'Stressed', percentage: 15 },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Mood Tracker</h2>
        <Brain className="h-6 w-6 text-rose-500" />
      </div>

      <div className="space-y-4">
        {moods.map((mood, index) => (
          <div key={index}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-lg">{mood.emoji} {mood.label}</span>
              <span className="text-sm text-gray-600">{mood.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-rose-500 rounded-full h-2 transition-all duration-300"
                style={{ width: `${mood.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodTracker;