// components/CurrentWeather.tsx
import React from 'react';
import { Sun, Wind, Droplets } from 'lucide-react';

interface CurrentWeatherProps {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

const CurrentWeather: React.FC<CurrentWeatherProps> = ({
  temperature,
  condition,
  humidity,
  windSpeed
}) => {
  return (
    <div className="px-6 py-8 text-center">
      <div className="flex items-center justify-center mb-4">
        <span className="text-8xl font-thin text-white">{Math.round(temperature)}°</span>
        <Sun className="w-16 h-16 text-white ml-6" />
      </div>
      <p className="text-2xl text-white mb-8 font-light">{condition}</p>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">Humidity</span>
            <Droplets className="w-4 h-4 text-white/80" />
          </div>
          <span className="text-2xl font-semibold text-white">{humidity}%</span>
        </div>
        
        <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/80 text-sm">Wind</span>
            <Wind className="w-4 h-4 text-white/80" />
          </div>
          <span className="text-2xl font-semibold text-white">{windSpeed} km/h</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;