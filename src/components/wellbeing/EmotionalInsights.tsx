import React from 'react';
import { Brain, TrendingUp, Heart } from 'lucide-react';
import { useEmotionalAnalysis } from '../../hooks/useEmotionalAnalysis';

const EmotionalInsights: React.FC = () => {
  const { emotions, insights, trends } = useEmotionalAnalysis();

  return (
    <div className="bg-white border rounded-lg p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Brain className="h-5 w-5 text-indigo-500" />
        <h3 className="text-lg font-semibold text-gray-900">Emotional Insights</h3>
      </div>

      <div className="space-y-6">
        {/* Emotion Tracking */}
        <div className="space-y-4">
          {emotions.map((emotion) => (
            <div key={emotion.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">
                  {emotion.name}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">{emotion.percentage}%</span>
                  {emotion.trend === 'up' && (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  )}
                  {emotion.trend === 'down' && (
                    <TrendingUp className="h-4 w-4 text-red-500 transform rotate-180" />
                  )}
                  {emotion.trend === 'stable' && (
                    <div className="h-0.5 w-4 bg-gray-400 rounded" />
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-500 rounded-full h-2 transition-all duration-500"
                  style={{ width: `${emotion.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Weekly Trends */}
        <div className="border-t pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            <h4 className="font-medium text-gray-900">Weekly Trends</h4>
          </div>
          <div className="h-32 flex items-end space-x-2">
            {trends.map((day, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className="w-full bg-blue-500 rounded-t transition-all duration-300"
                  style={{ height: `${day.score}%` }}
                />
                <span className="text-xs text-gray-600 mt-2">{day.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights */}
        <div className="border-t pt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="h-5 w-5 text-rose-500" />
            <h4 className="font-medium text-gray-900">AI Analysis</h4>
          </div>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className="p-3 bg-rose-50 rounded-lg text-sm text-rose-800"
              >
                {insight}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmotionalInsights;