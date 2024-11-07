import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';

const UpcomingTasks = () => {
  const tasks = [
    { title: 'Morning Meditation', time: '08:00 AM', completed: true },
    { title: 'Take Vitamins', time: '09:00 AM', completed: true },
    { title: 'Workout Session', time: '10:30 AM', completed: false },
    { title: 'Health Check-up', time: '02:00 PM', completed: false },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Today's Tasks</h2>
        <Calendar className="h-6 w-6 text-rose-500" />
      </div>

      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`flex items-center justify-between p-3 rounded-lg ${
              task.completed ? 'bg-gray-50' : 'bg-rose-50'
            }`}
          >
            <div className="flex items-center space-x-3">
              <CheckCircle
                className={`h-5 w-5 ${
                  task.completed ? 'text-green-500' : 'text-gray-400'
                }`}
              />
              <div>
                <p className={`font-medium ${
                  task.completed ? 'text-gray-500' : 'text-gray-900'
                }`}>
                  {task.title}
                </p>
                <p className="text-sm text-gray-500">{task.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingTasks;