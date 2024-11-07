import React from 'react';
import { Cloud, CloudRain, CloudSnow, Sun, Moon } from 'lucide-react';
import { useWeather } from '../hooks/useWeather';

export const WeatherBackground: React.FC = () => {
  const weather = useWeather();

  const WeatherIcon = {
    clear: weather.time === 'day' ? Sun : Moon,
    clouds: Cloud,
    rain: CloudRain,
    snow: CloudSnow
  }[weather.condition];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <WeatherIcon
            key={i}
            className="absolute text-current animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              opacity: Math.random() * 0.5 + 0.5
            }}
          />
        ))}
      </div>
      {weather.condition === 'rain' && (
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-20 bg-current animate-rain"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}
      {weather.condition === 'snow' && (
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-current animate-snow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WeatherBackground;