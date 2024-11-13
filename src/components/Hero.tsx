import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Features from '../components/Features';
import Footer from '../components/Footer';
import videoBackground from '../assets/311876098316009475.mp4';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth');
  };

  const handleLearnAboutPrivacy = () => {
    navigate('/privacy'); // Navigate to Privacy Policy page
  };

  return (
    <div className="relative min-h-screen">
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

      <div className="fixed top-0 w-full z-20">
        <Navbar />
      </div>

      <div className="relative z-10 text-center text-white pt-24">
        <main className="px-4 mt-16">
          <section className="text-center mb-10">
            <h1 className="text-5xl font-bold mb-4">
              Empower Your Health Journey with AI-Driven Insights
            </h1>
            <p className="text-lg text-white/80 mb-8">
              Experience a revolutionary approach to wellness, powered by advanced AI and secure, client-side processing for complete privacy.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-transform transform hover:scale-105 shadow-lg"
              >
                Get Started
              </button>
              <button onClick={handleLearnAboutPrivacy} className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all transform hover:scale-105">
                Learn About Our Privacy
                <ArrowRight className="ml-2" />
              </button>
            </div>
          </section>

          <Features />
          <section className="py-20 px-4 bg-black/60 rounded-lg shadow-lg mx-4 mb-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-2xl font-bold mb-6">Your Privacy is Our Priority</h2>
              <p className="text-base text-white/80 mb-8">
                All data processing happens on your device. Zero backend, zero server-side processing, complete privacy guaranteed.
              </p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
