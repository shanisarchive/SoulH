import { useState, useEffect } from 'react';

type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night';

export const useTimeOfDay = (): TimeOfDay => {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('day');

  useEffect(() => {
    const updateTimeOfDay = () => {
      const hour = new Date().getHours();
      
      if (hour >= 5 && hour < 7) return 'dawn';
      if (hour >= 7 && hour < 17) return 'day';
      if (hour >= 17 && hour < 19) return 'dusk';
      return 'night';
    };

    setTimeOfDay(updateTimeOfDay());
    
    const interval = setInterval(() => {
      setTimeOfDay(updateTimeOfDay());
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, []);

  return timeOfDay;
};