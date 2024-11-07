import React from 'react';
import { Heart } from 'lucide-react';

const WellnessScore = () => {
  const score = 85;
  
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Wellness Score</h2>
        <Heart className="h-6 w-6 text-rose-500" />
      </div>
      
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg className="w-48 h-48">
            <circle
              className="text-gray-200"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="96"
              cy="96"
            />
            <circle
              className="text-rose-500"
              strokeWidth="10"
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r="70"
              cx="96"
              cy="96"
              style={{
                strokeDasharray: `${2 * Math.PI * 70}`,
                strokeDashoffset: `${2 * Math.PI * 70 * (1 - score / 100)}`,
                transform: 'rotate(-90deg)',
                transformOrigin: '96px 96px'
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-4xl font-bold text-gray-900">{score}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Physical Health</p>
            <p className="text-lg font-semibold text-gray-900">90%</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Mental Health</p>
            <p className="text-lg font-semibold text-gray-900">80%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WellnessScore;