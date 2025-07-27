
import React, { useEffect, useRef } from 'react';
import { MapPin, Navigation, Satellite } from 'lucide-react';

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
  const mapRef = useRef<HTMLDivElement>(null);

  // Generate trajectory points
  const generateTrajectoryPoints = () => {
    const points = [];
    const baselat = gps.lat;
    const baseLon = gps.lon;
    
    for (let i = 0; i < 10; i++) {
      points.push({
        lat: baselat + (Math.random() - 0.5) * 0.01,
        lon: baseLon + (Math.random() - 0.5) * 0.01
      });
    }
    return points;
  };

  const trajectoryPoints = generateTrajectoryPoints();

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 h-full">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
        <Navigation className="w-5 h-5 mr-2" />
        GPS TRACKING
      </h3>
      
      {/* Enhanced Map View */}
      <div className="h-32 bg-slate-900/50 rounded border border-slate-700 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-blue-900/20" />
        
        {/* Map Grid */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          {/* Grid lines */}
          {Array.from({length: 5}).map((_, i) => (
            <g key={i}>
              <line x1={`${i * 25}%`} y1="0" x2={`${i * 25}%`} y2="100%" stroke="#334155" strokeWidth="1" />
              <line x1="0" y1={`${i * 25}%`} x2="100%" y2={`${i * 25}%`} stroke="#334155" strokeWidth="1" />
            </g>
          ))}
        </svg>
        
        <div className="absolute top-2 left-2 text-xs text-gray-400 flex items-center">
          <Satellite className="w-3 h-3 mr-1" />
          Live Satellite View
        </div>
        
        {/* Launch Site */}
        <div className="absolute bottom-4 left-4">
          <div className="w-2 h-2 bg-green-500 rounded-full" />
          <div className="w-4 h-4 border-2 border-green-500/50 rounded-full absolute -top-1 -left-1 animate-ping" />
          <div className="text-xs text-green-400 absolute -bottom-4 -left-2">LAUNCH</div>
        </div>
        
        {/* Current rocket position */}
        <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <div className="w-6 h-6 border-2 border-red-500/50 rounded-full absolute -top-1.5 -left-1.5 animate-ping" />
        </div>
        
        {/* Trajectory path with multiple points */}
        <svg className="absolute inset-0 w-full h-full">
          <path 
            d="M 20,90 Q 35,70 50,40 T 80,60" 
            stroke="cyan" 
            strokeWidth="2" 
            fill="none"
            strokeDasharray="3,3"
            className="opacity-80"
          />
          {/* Trajectory points */}
          {trajectoryPoints.slice(0, 5).map((_, i) => (
            <circle
              key={i}
              cx={20 + i * 15}
              cy={90 - i * 8}
              r="1"
              fill="cyan"
              opacity={1 - i * 0.2}
            />
          ))}
        </svg>
        
        {/* Predicted landing zone */}
        <div className="absolute bottom-4 right-4">
          <div className="w-8 h-8 border-2 border-orange-400 border-dashed rounded-full flex items-center justify-center">
            <MapPin className="w-3 h-3 text-orange-400" />
          </div>
          <div className="text-xs text-orange-400 absolute -bottom-4 -left-1">LAND</div>
        </div>
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
        
        {/* GPS Quality Indicators */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400 flex items-center">
            <Satellite className="w-3 h-3 mr-1" />
            GPS Fix
          </span>
          <span className="text-sm font-mono text-green-400 flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            12 SAT
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">HDOP</span>
          <span className="text-sm font-mono text-green-400">0.8</span>
        </div>
      </div>

      {/* Enhanced Predicted Landing */}
      <div className="mt-4 p-3 bg-slate-800/50 rounded border border-slate-600">
        <div className="flex items-center space-x-2 mb-2">
          <MapPin className="w-4 h-4 text-orange-400" />
          <span className="text-sm font-semibold text-orange-400">LANDING PREDICTION</span>
        </div>
        <div className="text-xs text-gray-300">
          {(gps.lat + 0.001).toFixed(6)}°, {(gps.lon + 0.002).toFixed(6)}°
        </div>
        <div className="text-xs text-gray-400 mt-1">
          ~450m NE from launch site
        </div>
        <div className="text-xs text-green-400 mt-1">
          Confidence: 94% • Wind drift: 12m
        </div>
      </div>
    </div>
  );
};
