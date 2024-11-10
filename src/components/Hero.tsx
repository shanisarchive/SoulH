import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface HeroProps {
  TimeIcon: LucideIcon;
}

const Hero: React.FC<HeroProps> = ({ TimeIcon }) => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleLearnMore = () => {
    // Smooth scroll to features section
    document.querySelector('#features')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="py-20 text-center relative">
      {/* Centered "soul" Text with Glowing Border */}
      <div className="absolute top-0 w-full flex justify-center items-center pt-10 z-10">
        <h1 className="text-6xl md:text-7xl font-bold text-transparent animate-glow border border-blue-400 px-4 py-2 rounded-lg">
          soul
        </h1>
      </div>

      {/* Main Hero Content */}
      <div className="max-w-4xl mx-auto px-4 mt-24">
        <div className="flex justify-center mb-8">
          <TimeIcon className="h-16 w-16 text-white animate-pulse" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
          Empower Your Health Journey with AI-Driven Insights
        </h1>
        
        <p className="text-lg md:text-xl text-white/80 mb-12 animate-fade-in-delay">
          Experience a revolutionary approach to wellness, powered by advanced AI and secure, 
          client-side processing for complete privacy.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-delay-2">
          <button
            onClick={handleGetStarted}
            className="group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white 
                     rounded-full transition-all transform hover:scale-105 
                     flex items-center justify-center"
          >
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={handleLearnMore}
            className="px-8 py-4 bg-gray-700 hover:bg-gray-800 text-white 
                     rounded-full transition-all transform hover:scale-105"
          >
            Learn More
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { number: '50K+', label: 'Active Users' },
            { number: '98%', label: 'Privacy Score' },
            { number: '4.9/5', label: 'User Rating' }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl font-bold text-white">{stat.number}</p>
              <p className="text-white/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
