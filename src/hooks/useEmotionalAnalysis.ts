import { useState, useEffect } from 'react';

interface Emotion {
  name: string;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

interface DayTrend {
  label: string;
  score: number;
}

export const useEmotionalAnalysis = () => {
  const [emotions, setEmotions] = useState<Emotion[]>([]);
  const [insights, setInsights] = useState<string[]>([]);
  const [trends, setTrends] = useState<DayTrend[]>([]);

  useEffect(() => {
    // Simulate fetching emotional data
    setEmotions([
      { name: 'Joy', percentage: 75, trend: 'up' },
      { name: 'Gratitude', percentage: 85, trend: 'up' },
      { name: 'Peace', percentage: 60, trend: 'stable' },
      { name: 'Energy', percentage: 70, trend: 'down' }
    ]);

    setInsights([
      'Your emotional balance has improved by 15% this week',
      'Morning journaling shows positive impact on daily mood',
      'Physical activity correlates with higher joy levels',
      'Consider more mindfulness practices during peak stress hours'
    ]);

    setTrends([
      { label: 'Mon', score: 85 },
      { label: 'Tue', score: 75 },
      { label: 'Wed', score: 90 },
      { label: 'Thu', score: 65 },
      { label: 'Fri', score: 80 },
      { label: 'Sat', score: 85 },
      { label: 'Sun', score: 88 }
    ]);
  }, []);

  return { emotions, insights, trends };
};