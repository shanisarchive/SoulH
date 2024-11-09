import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import Footer from '../components/Footer';
import { useTheme } from '../hooks/useTheme';

// Import your video and logo
import videoBackground from '../assets/Minimalist Yoga Registration Landing Page (1).mp4';
import SoulLogo from '../assets/Screenshot_2024-03-03_120833-removebg-preview.png'; // Update this with the exact logo filename

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const { timeOfDay, styles } = useTheme();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  return (
    <div className="relative min-h-screen">
      {/* Full-Screen Fixed Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ position: 'fixed' }}
      >
        <source src={videoBackground} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay Content */}
      <div className="relative z-10">
        <Navbar />
        
        {/* Centered Logo */}
        <div className="flex items-center justify-center mt-16 mb-10">
          <img src={SoulLogo} alt="Soul Health Logo" className="w-40 h-40 md:w-64 md:h-64 opacity-90" />
        </div>

        <main className="px-4">
          {/* Hero Section */}
          <section className="text-center text-white mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Empower Your Health Journey with AI-Driven Insights
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-6">
              Experience a revolutionary approach to wellness, powered by advanced AI and secure, client-side processing for complete privacy.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-full transition-transform transform hover:scale-105"
              >
                Get Started
              </button>
              <button className="px-8 py-4 bg-white/10 text-white rounded-full transition-transform transform hover:scale-105">
                Learn More
              </button>
            </div>
          </section>

          {/* Features Section */}
          <Features />

          {/* Privacy Promise Section */}
          <section className="py-20 px-4 bg-black/60 rounded-lg shadow-lg mx-4 mb-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Privacy is Our Priority</h2>
              <p className="text-lg text-white/80 mb-8">
                All data processing happens on your device. Zero backend, zero server-side processing, complete privacy guaranteed.
              </p>
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center px-8 py-4 bg-blue-600/70 hover:bg-blue-700 text-white rounded-full transition-all transform hover:scale-105"
              >
                Learn About Our Privacy
                <ArrowRight className="ml-2" />
              </button>
            </div>
          </section>

          {/* WHO Standards Section */}
          <section className="py-20 px-4 bg-white/10 backdrop-blur-md rounded-lg shadow-lg mx-4 mb-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">WHO-Standard Health Insights</h2>
              <p className="text-lg text-white/80 mb-8">
                Experience precision health monitoring with insights powered by World Health Organization standards and guidelines.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Evidence-Based', description: 'Health insights backed by WHO research and guidelines' },
                  { title: 'Global Standards', description: 'Adherence to international health monitoring protocols' },
                  { title: 'Regular Updates', description: 'Latest health guidelines and recommendations' },
                ].map((item, index) => (
                  <div key={index} className="p-6 bg-blue-900/70 rounded-xl hover:bg-blue-700/80 transition-transform transform hover:scale-105">
                    <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                    <p className="text-white/80">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
