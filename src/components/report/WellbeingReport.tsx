import React from 'react';
import { Smile, Brain, Heart, Sun } from 'lucide-react';

const WellbeingReport = () => {
  const dimensions = [
    {
      icon: Smile,
      label: 'Emotional Balance',
      score: 85,
      insights: ['Stable mood patterns', 'High resilience score']
    },
    {
      icon: Brain,
      label: 'Mental Clarity',
      score: 78,
      insights: ['Good focus duration', 'Effective stress management']
    },
    {
      icon: Heart,
      label: 'Social Connection',
      score: 92,
      insights: ['Strong support network', 'Regular social engagement']
    },
    {
      icon: Sun,
      label: 'Life Satisfaction',
      score: 88,
      insights: ['Positive outlook', 'Clear sense of purpose']
    }
  ];

  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Wellbeing Analysis</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dimensions.map((dim) => (
          <div key={dim.label} className="border rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-4">
              <dim.icon className="h-6 w-6 text-rose-500" />
              <div>
                <h3 className="font-medium text-gray-900">{dim.label}</h3>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 h-2 bg-gray-200 rounded-full">
                    <div
                      className="h-2 bg-rose-500 rounded-full"
                      style={{ width: `${dim.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-600">
                    {dim.score}%
                  </span>
                </div>
              </div>
            </div>
            <ul className="space-y-1">
              {dim.insights.map((insight, index) => (
                <li key={index} className="text-sm text-gray-600">
                  • {insight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-rose-50 rounded-lg">
        <h3 className="font-medium text-rose-900 mb-2">Journal Insights</h3>
        <ul className="list-disc list-inside space-y-1 text-rose-800">
          <li>Consistent gratitude practice showing positive impact</li>
          <li>Mindfulness sessions improving emotional awareness</li>
          <li>Strong alignment between values and daily actions</li>
        </ul>
      </div>
    </div>
  );
};

export default WellbeingReport;