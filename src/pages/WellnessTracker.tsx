import React, { useState } from 'react';
import { Upload, Camera, FileText, Activity } from 'lucide-react';
import ImageAnalysis from '../components/wellness/ImageAnalysis';
import SymptomChecker from '../components/wellness/SymptomChecker';
import HealthMetrics from '../components/wellness/HealthMetrics';
import ReportUploader from '../components/wellness/ReportUploader';

const WellnessTracker: React.FC = () => {
  const [activeTab, setActiveTab] = useState('metrics');

  const tabs = [
    { id: 'metrics', label: 'Health Metrics', icon: Activity },
    { id: 'analysis', label: 'Image Analysis', icon: Camera },
    { id: 'symptoms', label: 'Symptom Checker', icon: FileText },
    { id: 'reports', label: 'Upload Reports', icon: Upload },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Wellness Tracker</h1>
        
        <div className="flex space-x-4 border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-rose-500 text-rose-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-6">
          {activeTab === 'metrics' && <HealthMetrics />}
          {activeTab === 'analysis' && <ImageAnalysis />}
          {activeTab === 'symptoms' && <SymptomChecker />}
          {activeTab === 'reports' && <ReportUploader />}
        </div>
      </div>
    </div>
  );
};

export default WellnessTracker;