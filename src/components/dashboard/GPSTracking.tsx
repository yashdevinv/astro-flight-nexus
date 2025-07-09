
import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

interface GPSData {
  lat: number;
  lon: number;
  alt: number;
}

interface GPSTrackingProps {
  gps: GPSData;
  trajectory?: Array<{lat: number, lon: number}>;
}

export const GPSTracking: React.FC<GPSTrackingProps> = ({ gps, trajectory }) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 h-full">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
        <Navigation className="w-5 h-5 mr-2" />
        GPS TRACKING
      </h3>
      
      {/* Map Placeholder */}
      <div className="h-32 bg-slate-900/50 rounded border border-slate-700 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20" />
        <div className="absolute top-2 left-2 text-xs text-gray-400">
          Live Map View
        </div>
        
        {/* Simulated rocket position */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <div className="w-6 h-6 border-2 border-red-500/50 rounded-full absolute -top-1.5 -left-1.5 animate-ping" />
        </div>
        
        {/* Trajectory line */}
        <svg className="absolute inset-0 w-full h-full">
          <path 
            d="M 10,100 Q 50,50 100,80 T 150,90" 
            stroke="cyan" 
            strokeWidth="2" 
            fill="none"
            strokeDasharray="5,5"
            className="opacity-60"
          />
        </svg>
      </div>

      {/* GPS Coordinates */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Latitude</span>
          <span className="text-sm font-mono text-white">{gps.lat.toFixed(6)}°</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Longitude</span>
          <span className="text-sm font-mono text-white">{gps.lon.toFixed(6)}°</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">GPS Altitude</span>
          <span className="text-sm font-mono text-white">{gps.alt.toFixed(1)}m</span>
        </div>
      </div>

      {/* Predicted Landing */}
      <div className="mt-4 p-3 bg-slate-800/50 rounded border border-slate-600">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-semibold text-orange-400">PREDICTED LANDING</span>
        </div>
        <div className="text-xs text-gray-300">
          {(gps.lat + 0.001).toFixed(6)}°, {(gps.lon + 0.002).toFixed(6)}°
        </div>
        <div className="text-xs text-gray-400 mt-1">
          ~450m NE from launch site
        </div>
      </div>
    </div>
  );
};
