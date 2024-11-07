import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const steps = [
  {
    title: 'Basic Information',
    fields: [
      { name: 'height', label: 'Height (cm)', type: 'number' },
      { name: 'weight', label: 'Weight (kg)', type: 'number' },
      { name: 'birthdate', label: 'Date of Birth', type: 'date' }
    ]
  },
  {
    title: 'Health History',
    fields: [
      { name: 'conditions', label: 'Existing Health Conditions', type: 'text' },
      { name: 'medications', label: 'Current Medications', type: 'text' },
      { name: 'allergies', label: 'Allergies', type: 'text' }
    ]
  },
  {
    title: 'Lifestyle',
    fields: [
      { name: 'activity', label: 'Activity Level', type: 'select', options: ['Sedentary', 'Light', 'Moderate', 'Active'] },
      { name: 'sleep', label: 'Average Sleep Hours', type: 'number' },
      { name: 'stress', label: 'Stress Level', type: 'select', options: ['Low', 'Medium', 'High'] }
    ]
  }
];

const OnboardingPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save onboarding data and mark user as onboarded
      updateUser({ onboarded: true });
      navigate('/app');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const currentStepData = steps[currentStep];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-400 to-purple-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl">
          <div className="flex items-center justify-center mb-8">
            <Heart className="h-10 w-10 text-white animate-pulse" />
            <span className="text-3xl font-bold text-white ml-2">Soul Health</span>
          </div>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-white">{currentStepData.title}</h2>
              <span className="text-white">Step {currentStep + 1} of {steps.length}</span>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full">
              <div
                className="bg-white h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {currentStepData.fields.map((field) => (
              <div key={field.name}>
                <label className="block text-white mb-2">{field.label}</label>
                {field.type === 'select' ? (
                  <select
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  >
                    <option value="">Select...</option>
                    {field.options?.map((option) => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    value={formData[field.name] || ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white"
                  />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              className={`flex items-center space-x-2 px-6 py-2 rounded-lg transition-colors ${
                currentStep === 0
                  ? 'opacity-0 pointer-events-none'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back</span>
            </button>
            <button
              onClick={handleNext}
              className="flex items-center space-x-2 px-6 py-2 bg-white text-purple-600 rounded-lg hover:bg-white/90 transition-colors"
            >
              <span>{currentStep === steps.length - 1 ? 'Complete' : 'Next'}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;