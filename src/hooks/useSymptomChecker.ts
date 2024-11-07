import { useState } from 'react';

interface Condition {
  name: string;
  probability: number;
  description: string;
}

interface Analysis {
  conditions: Condition[];
  recommendations: string[];
}

export const useSymptomChecker = () => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);

  const commonSymptoms = [
    'Headache',
    'Fever',
    'Fatigue',
    'Cough',
    'Nausea',
    'Dizziness',
    'Chest Pain',
    'Shortness of Breath',
    'Joint Pain',
    'Sore Throat',
    'Runny Nose',
    'Body Aches',
    'Loss of Appetite',
    'Chills',
    'Muscle Pain'
  ];

  const addSymptom = (symptom: string) => {
    if (selectedSymptoms.length < 9) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
      setAnalysis(null);
    }
  };

  const removeSymptom = (symptom: string) => {
    setSelectedSymptoms(selectedSymptoms.filter(s => s !== symptom));
    setAnalysis(null);
  };

  const analyzeSymptoms = async () => {
    setAnalyzing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock analysis based on symptoms
    const mockAnalysis: Analysis = {
      conditions: [
        {
          name: 'Common Cold',
          probability: 0.8,
          description: 'A viral infection of your nose and throat (upper respiratory tract).'
        },
        {
          name: 'Seasonal Allergies',
          probability: 0.6,
          description: 'An immune system response to environmental triggers like pollen.'
        },
        {
          name: 'Viral Infection',
          probability: 0.4,
          description: 'A general viral infection that may require rest and hydration.'
        }
      ],
      recommendations: [
        'Rest and get adequate sleep',
        'Stay hydrated with plenty of fluids',
        'Monitor your temperature',
        'Consider over-the-counter medications for symptom relief',
        'Consult a healthcare provider if symptoms worsen'
      ]
    };

    setAnalysis(mockAnalysis);
    setAnalyzing(false);
  };

  return {
    selectedSymptoms,
    addSymptom,
    removeSymptom,
    analysis,
    analyzing,
    commonSymptoms,
    analyzeSymptoms
  };
};