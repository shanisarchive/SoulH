import React from 'react';
import { Activity, Brain, TrendingUp, Users } from 'lucide-react';
import WellnessScore from '../components/dashboard/WellnessScore';
import ActivityChart from '../components/dashboard/ActivityChart';
import MoodTracker from '../components/dashboard/MoodTracker';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';

const Dashboard = () => {
  const stats = [
    { icon: Activity, label: 'Wellness Score', value: '85', change: '+5' },
    { icon: Brain, label: 'Mindfulness', value: '12hrs', change: '+2hrs' },
    { icon: TrendingUp, label: 'Progress', value: '92%', change: '+8%' },
    { icon: Users, label: 'Community', value: '2.4k', change: '+120' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className="flex flex-col items-end">
                <stat.icon className="h-8 w-8 text-rose-500" />
                <span className="text-sm text-green-600 mt-2">{stat.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WellnessScore />
        <ActivityChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MoodTracker />
        <UpcomingTasks />
      </div>
    </div>
  );
};

export default Dashboard;