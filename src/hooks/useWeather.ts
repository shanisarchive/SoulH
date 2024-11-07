import { useState, useEffect } from 'react';

export interface WeatherData {
  condition: 'clear' | 'clouds' | 'rain' | 'snow';
  temp: number;
  time: 'day' | 'night';
}

export const useWeather = (): WeatherData => {
  const [weather, setWeather] = useState<WeatherData>({
    condition: 'clear',
    temp: 20,
    time: 'day'
  });

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // For demo, we'll simulate weather data
        const hour = new Date().getHours();
        const conditions: WeatherData['condition'][] = ['clear', 'clouds', 'rain', 'snow'];
        const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
        
        setWeather({
          condition: randomCondition,
          temp: Math.round(Math.random() * 15 + 15), // Random temp between 15-30
          time: hour >= 6 && hour < 18 ? 'day' : 'night'
        });
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };

    fetchWeather();
    const interval = setInterval(fetchWeather, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  return weather;
};