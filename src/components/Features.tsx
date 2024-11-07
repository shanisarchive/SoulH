import React from 'react';
import { Brain, Shield, Activity, FileHeart } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Analysis',
    description: 'Advanced algorithms provide personalized health insights and recommendations.'
  },
  {
    icon: Shield,
    title: 'Complete Privacy',
    description: '0 backend, 0 server-side processing. All data processed locally for maximum security.'
  },
  {
    icon: Activity,
    title: 'Real-time Monitoring',
    description: 'Track your wellness metrics with instant feedback and analysis.'
  },
  {
    icon: FileHeart,
    title: 'WHO Compliance',
    description: 'Health insights powered by WHO API for globally trusted recommendations.'
  }
];

const Features = () => {
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-md p-6 rounded-xl hover:bg-white/20 transition-all transform hover:scale-105"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-rose-500 mb-6">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;