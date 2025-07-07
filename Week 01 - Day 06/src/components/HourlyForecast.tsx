// components/HourlyForecast.tsx
import React from 'react';
import { Sun } from 'lucide-react';

interface HourlyForecastProps {
  hourlyData: Array<{
    time: string;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
  }>;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyData }) => {
  const formatTime = (timeString: string, index: number) => {
    if (index === 0) return 'Now';
    const time = new Date(timeString);
    return time.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="px-6 py-4">
      <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
        <h3 className="text-white/80 text-sm font-medium mb-4">Now</h3>
        <div className="flex justify-between items-center">
          {hourlyData.slice(0, 4).map((hour, index) => (
            <div key={index} className="flex flex-col items-center">
              <Sun className="w-8 h-8 text-yellow-300 mb-2" />
              <span className="text-xl font-semibold text-white mb-1">
                {Math.round(hour.temp_c)}°
              </span>
              <span className="text-white/70 text-xs">
                {formatTime(hour.time, index)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HourlyForecast;