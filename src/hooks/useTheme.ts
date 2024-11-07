import { useWeather } from './useWeather';
import { useTimeOfDay } from './useTimeOfDay';

interface ThemeStyles {
  background: string;
  text: string;
  accent: string;
}

export const useTheme = () => {
  const weather = useWeather();
  const timeOfDay = useTimeOfDay();

  const getThemeStyles = (): ThemeStyles => {
    const baseStyles: Record<string, ThemeStyles> = {
      clear: {
        day: {
          background: 'bg-gradient-to-b from-blue-400 via-blue-200 to-blue-100',
          text: 'text-gray-900',
          accent: 'bg-rose-500'
        },
        night: {
          background: 'bg-gradient-to-b from-blue-900 via-indigo-800 to-purple-900',
          text: 'text-white',
          accent: 'bg-purple-500'
        }
      },
      clouds: {
        day: {
          background: 'bg-gradient-to-b from-gray-300 via-gray-200 to-gray-100',
          text: 'text-gray-900',
          accent: 'bg-blue-500'
        },
        night: {
          background: 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700',
          text: 'text-white',
          accent: 'bg-indigo-500'
        }
      },
      rain: {
        day: {
          background: 'bg-gradient-to-b from-gray-400 via-gray-300 to-gray-200',
          text: 'text-gray-900',
          accent: 'bg-blue-600'
        },
        night: {
          background: 'bg-gradient-to-b from-gray-900 via-gray-800 to-blue-900',
          text: 'text-white',
          accent: 'bg-blue-400'
        }
      },
      snow: {
        day: {
          background: 'bg-gradient-to-b from-gray-100 via-white to-gray-50',
          text: 'text-gray-900',
          accent: 'bg-blue-300'
        },
        night: {
          background: 'bg-gradient-to-b from-gray-800 via-gray-900 to-blue-900',
          text: 'text-white',
          accent: 'bg-blue-200'
        }
      }
    };

    return baseStyles[weather.condition]?.[weather.time] || baseStyles.clear.day;
  };

  return {
    weather,
    timeOfDay,
    styles: getThemeStyles()
  };
};