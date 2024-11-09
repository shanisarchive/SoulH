// In LandingPage.tsx (or LandingPage.js if using plain JavaScript)
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sun, Moon, Sunrise, Sunset, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import WeatherBackground from '../components/WeatherBackground';
import { useTheme } from '../hooks/useTheme';

// Import your video file
import videoBackground from '../assets/Minimalist Yoga Registration Landing Page (1).mp4';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { timeOfDay, weather, styles } = useTheme();

  const TimeIcon = {
    dawn: Sunrise,
    day: Sun,
    dusk: Sunset,
    night: Moon
  }[timeOfDay];

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className={`relative min-h-screen ${styles.background} transition-colors duration-1000`}>
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src={videoBackground} type="video/mp4" />
        {/* Provide a fallback if the video format is unsupported */}
        Your browser does not support the video tag.
      </video>

      <WeatherBackground />

      {/* Main Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          {/* Hero Section */}
          <Hero TimeIcon={TimeIcon} />

          {/* Features Section */}
          <Features />

          {/* Privacy Promise Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
                Your Privacy is Our Priority
              </h2>
              <p className="text-xl text-white/80 mb-8 animate-fade-in-delay">
                All data processing happens on your device. Zero backend, zero server-side 
                processing, complete privacy guaranteed.
              </p>
              <button
                onClick={handleGetStarted}
                className="group inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 
                         text-white rounded-full transition-all transform hover:scale-105"
              >
                Learn About Our Privacy
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* WHO Standards Section */}
          <section className="py-20 px-4 bg-white/5 backdrop-blur-md">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
                WHO-Standard Health Insights
              </h2>
              <p className="text-xl text-white/80 mb-8 animate-fade-in-delay">
                Experience precision health monitoring with insights powered by World Health 
                Organization standards and guidelines.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                {[
                  {
                    title: 'Evidence-Based',
                    description: 'Health insights backed by WHO research and guidelines'
                  },
                  {
                    title: 'Global Standards',
                    description: 'Adherence to international health monitoring protocols'
                  },
                  {
                    title: 'Regular Updates',
                    description: 'Latest health guidelines and recommendations'
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 
                             transition-all transform hover:scale-105"
                  >
                    <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                    <p className="text-white/80">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 animate-fade-in">
                Start Your Wellness Journey Today
              </h2>
              <p className="text-xl text-white/80 mb-8 animate-fade-in-delay">
                Join thousands of users who have transformed their approach to health and 
                wellbeing with Soul Health.
              </p>
              <button
                onClick={handleGetStarted}
                className="group px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white 
                         rounded-full transition-all transform hover:scale-105 
                         flex items-center justify-center mx-auto"
              >
                Get Started Now
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
