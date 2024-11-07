import React from 'react';
import { Activity } from 'lucide-react';

const ActivityChart = () => {
  const data = [65, 59, 80, 81, 56, 55, 40];
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const maxValue = Math.max(...data);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Weekly Activity</h2>
        <Activity className="h-6 w-6 text-rose-500" />
      </div>

      <div className="flex items-end space-x-2 h-48">
        {data.map((value, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className="w-full bg-rose-500 rounded-t-lg transition-all duration-300 hover:bg-rose-600"
              style={{ height: `${(value / maxValue) * 100}%` }}
            />
            <span className="text-sm text-gray-600 mt-2">{days[index]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityChart;