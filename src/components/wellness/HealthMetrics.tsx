import React from 'react';
import { Heart, Activity, Moon, Apple } from 'lucide-react';
import { useSmartWatch } from '../../hooks/useSmartWatch';
import SmartWatchConnect from './SmartWatchConnect';

const HealthMetrics = () => {
  const { data: healthData, device } = useSmartWatch();

  if (!device?.connected) {
    return <SmartWatchConnect />;
  }

  const metrics = [
    {
      icon: Heart,
      label: 'Heart Rate',
      value: healthData?.heartRate || '--',
      unit: 'bpm',
      trend: getTrend(healthData?.heartRate, 'heart_rate'),
      color: 'rose'
    },
    {
      icon: Activity,
      label: 'Steps',
      value: healthData?.steps?.toLocaleString() || '--',
      unit: 'steps',
      trend: getTrend(healthData?.steps, 'steps'),
      color: 'green'
    },
    {
      icon: Moon,
      label: 'Sleep',
      value: healthData?.sleep?.duration || '--',
      unit: 'hours',
      trend: getTrend(healthData?.sleep?.duration, 'sleep'),
      color: 'blue'
    },
    {
      icon: Apple,
      label: 'Calories',
      value: healthData?.activity?.calories || '--',
      unit: 'kcal',
      trend: getTrend(healthData?.activity?.calories, 'calories'),
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 bg-${metric.color}-100 rounded-lg`}>
                  <metric.icon className={`h-6 w-6 text-${metric.color}-500`} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <div className="flex items-baseline">
                    <span className="text-2xl font-bold text-gray-900">
                      {metric.value}
                    </span>
                    <span className="ml-1 text-gray-600">{metric.unit}</span>
                  </div>
                </div>
              </div>
              <div className={`text-sm ${
                metric.trend === 'up' ? 'text-green-600' :
                metric.trend === 'down' ? 'text-red-600' :
                'text-gray-600'
              }`}>
                {metric.trend === 'up' && '↑ Improving'}
                {metric.trend === 'down' && '↓ Declining'}
                {metric.trend === 'stable' && '→ Stable'}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Real-time Activity Chart */}
      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Real-time Activity</h3>
        <div className="h-64 flex items-end space-x-2">
          {Array.from({ length: 24 }).map((_, i) => {
            const currentHour = new Date().getHours();
            const value = i <= currentHour ? getActivityValue(i) : 0;
            
            return (
              <div
                key={i}
                className="flex-1 bg-rose-500 rounded-t transition-all hover:bg-rose-600"
                style={{
                  height: `${value}%`,
                  opacity: i === currentHour ? 1 : 0.5
                }}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>12 AM</span>
          <span>12 PM</span>
          <span>11 PM</span>
        </div>
      </div>
    </div>
  );
};

// Helper function to calculate trends based on historical data
const getTrend = (currentValue: number | undefined, metric: string): 'up' | 'down' | 'stable' => {
  if (!currentValue) return 'stable';
  
  // In a real app, you would compare with historical data from your storage
  // For now, we'll return a random trend
  const trends = ['up', 'down', 'stable'] as const;
  return trends[Math.floor(Math.random() * trends.length)];
};

// Helper function to get activity value for the hour
const getActivityValue = (hour: number): number => {
  // In a real app, this would come from your health data
  // For now, we'll generate a random value
  return Math.random() * 100;
};

export default HealthMetrics;