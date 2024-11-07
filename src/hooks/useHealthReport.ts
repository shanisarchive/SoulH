import { useState } from 'react';

interface PhysicalMetric {
  name: string;
  value: string;
  status: 'good' | 'warning' | 'critical';
}

interface MentalHealthInsight {
  title: string;
  description: string;
}

interface HealthReport {
  physicalMetrics: PhysicalMetric[];
  mentalHealthInsights: MentalHealthInsight[];
  recommendations: string[];
}

export const useHealthReport = () => {
  const [report, setReport] = useState<HealthReport | null>(null);

  const generateReport = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setReport({
      physicalMetrics: [
        { name: 'Heart Rate', value: '72 bpm', status: 'good' },
        { name: 'Blood Pressure', value: '120/80', status: 'good' },
        { name: 'Sleep Quality', value: '85%', status: 'good' },
        { name: 'Physical Activity', value: '7.5k steps', status: 'warning' }
      ],
      mentalHealthInsights: [
        {
          title: 'Stress Management',
          description: 'Your stress levels have decreased by 20% over the past month.'
        },
        {
          title: 'Emotional Balance',
          description: 'Showing improved emotional resilience in challenging situations.'
        },
        {
          title: 'Sleep Patterns',
          description: 'Regular sleep schedule contributing to better mental clarity.'
        }
      ],
      recommendations: [
        'Increase daily physical activity to reach 10,000 steps',
        'Maintain current meditation practice',
        'Consider adding strength training twice per week',
        'Continue regular sleep schedule'
      ]
    });
  };

  return { generateReport, report };
};