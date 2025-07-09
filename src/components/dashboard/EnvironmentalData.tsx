
import React from 'react';
import { Thermometer, Wind, Gauge, Droplets } from 'lucide-react';
import { TelemetryData } from '@/hooks/useTelemetryData';

interface EnvironmentalDataProps {
  telemetryData: TelemetryData;
}

export const EnvironmentalData: React.FC<EnvironmentalDataProps> = ({ telemetryData }) => {
  // Simulate environmental data based on altitude
  const getEnvironmentalData = () => {
    const altitude = telemetryData.altitude;
    return {
      temperature: Math.max(-60, 15 - (altitude * 0.0065)), // Standard atmospheric lapse rate
      pressure: Math.max(0.1, 1013.25 * Math.pow(1 - (0.0065 * altitude) / 288.15, 5.255)), // Barometric formula
      humidity: Math.max(10, 65 - (altitude * 0.02)),
      windSpeed: 5 + Math.sin(altitude * 0.001) * 3,
      windDirection: (Date.now() / 1000) % 360
    };
  };

  const envData = getEnvironmentalData();

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 h-full">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
        <Thermometer className="w-5 h-5 mr-2" />
        ENVIRONMENTAL
      </h3>
      
      <div className="space-y-4">
        {/* Temperature */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-red-400" />
            <span className="text-sm text-gray-400">Temperature</span>
          </div>
          <span className="text-sm font-mono text-white">{envData.temperature.toFixed(1)}°C</span>
        </div>

        {/* Pressure */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Gauge className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-400">Pressure</span>
          </div>
          <span className="text-sm font-mono text-white">{envData.pressure.toFixed(1)} hPa</span>
        </div>

        {/* Humidity */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-400">Humidity</span>
          </div>
          <span className="text-sm font-mono text-white">{envData.humidity.toFixed(1)}%</span>
        </div>

        {/* Wind */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-gray-400">Wind</span>
          </div>
          <span className="text-sm font-mono text-white">{envData.windSpeed.toFixed(1)} m/s</span>
        </div>

        {/* Wind Direction Compass */}
        <div className="mt-4 flex justify-center">
          <div className="relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-gray-600"></div>
            <div className="absolute inset-2 rounded-full bg-slate-800"></div>
            {/* Wind direction arrow */}
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{ transform: `rotate(${envData.windDirection}deg)` }}
            >
              <div className="w-1 h-6 bg-yellow-400 rounded-full"></div>
              <div className="absolute top-1 w-0 h-0 border-l-2 border-r-2 border-b-4 border-transparent border-b-yellow-400"></div>
            </div>
            {/* Cardinal directions */}
            <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">N</div>
            <div className="absolute top-1/2 -right-1 transform -translate-y-1/2 text-xs text-gray-400">E</div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs text-gray-400">S</div>
            <div className="absolute top-1/2 -left-1 transform -translate-y-1/2 text-xs text-gray-400">W</div>
          </div>
        </div>

        {/* Atmospheric Density */}
        <div className="mt-4 p-2 bg-slate-800/50 rounded border border-slate-600">
          <div className="text-xs text-gray-400 mb-1">Air Density</div>
          <div className="text-sm font-mono text-white">
            {(envData.pressure * 100 / (287.05 * (envData.temperature + 273.15))).toFixed(3)} kg/m³
          </div>
        </div>
      </div>
    </div>
  );
};
