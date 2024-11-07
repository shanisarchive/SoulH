import React from 'react';
import { Activity, Heart, Brain, Thermometer } from 'lucide-react';

const WellnessReport = () => {
  const metrics = [
    {
      icon: Heart,
      label: 'Cardiovascular',
      score: 92,
      status: 'Excellent',
      color: 'green'
    },
    {
      icon: Brain,
      label: 'Neural',
      score: 85,
      status: 'Good',
      color: 'blue'
    },
    {
      icon: Activity,
      label: 'Physical',
      score: 78,
      status: 'Good',
      color: 'yellow'
    },
    {
      icon: Thermometer,
      label: 'Metabolic',
      score: 88,
      status: 'Very Good',
      color: 'purple'
    }
  ];

  return (
    <div className="bg-white border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Wellness Analysis</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 bg-${metric.color}-100 rounded-lg`}>
                <metric.icon className={`h-6 w-6 text-${metric.color}-500`} />
              </div>
              <div>
                <p className="text-sm text-gray-600">{metric.label}</p>
                <div className="flex items-baseline space-x-2">
                  <span className="text-2xl font-bold text-gray-900">
                    {metric.score}
                  </span>
                  <span className={`text-sm text-${metric.color}-600`}>
                    {metric.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-medium text-blue-900 mb-2">Key Observations</h3>
        <ul className="list-disc list-inside space-y-1 text-blue-800">
          <li>Heart rate variability shows excellent recovery patterns</li>
          <li>Sleep quality has improved by 15% over the past month</li>
          <li>Physical activity levels meet WHO recommendations</li>
        </ul>
      </div>
    </div>
  );
};

export default WellnessReport;