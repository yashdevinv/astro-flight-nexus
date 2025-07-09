
import React from 'react';
import { Clock, Rocket, Umbrella, MapPin } from 'lucide-react';

interface FlightTimelineProps {
  phase: string;
  timestamp: number;
}

export const FlightTimeline: React.FC<FlightTimelineProps> = ({ phase, timestamp }) => {
  const phases = [
    { name: 'Pre-Launch', icon: Clock, completed: true },
    { name: 'Ascent', icon: Rocket, completed: ['Ascent', 'Apogee', 'Drogue Deployed', 'Main Deployed', 'Landed'].includes(phase) },
    { name: 'Apogee', icon: Rocket, completed: ['Apogee', 'Drogue Deployed', 'Main Deployed', 'Landed'].includes(phase) },
    { name: 'Drogue Deployed', icon: Umbrella, completed: ['Drogue Deployed', 'Main Deployed', 'Landed'].includes(phase) },
    { name: 'Main Deployed', icon: Umbrella, completed: ['Main Deployed', 'Landed'].includes(phase) },
    { name: 'Landed', icon: MapPin, completed: phase === 'Landed' }
  ];

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 h-80">
      <h3 className="text-lg font-bold text-cyan-400 mb-4">FLIGHT TIMELINE</h3>
      
      <div className="space-y-4">
        {phases.map((phaseItem, index) => {
          const isActive = phaseItem.name === phase;
          const IconComponent = phaseItem.icon;
          
          return (
            <div key={index} className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                phaseItem.completed 
                  ? isActive 
                    ? 'bg-orange-500 border-orange-500 animate-pulse' 
                    : 'bg-green-500 border-green-500'
                  : 'border-gray-600 bg-gray-800'
              }`}>
                <IconComponent className={`w-4 h-4 ${
                  phaseItem.completed ? 'text-white' : 'text-gray-400'
                }`} />
              </div>
              
              <div className="flex-1">
                <div className={`text-sm font-semibold ${
                  isActive ? 'text-orange-400' : 
                  phaseItem.completed ? 'text-green-400' : 'text-gray-500'
                }`}>
                  {phaseItem.name}
                </div>
                {phaseItem.completed && (
                  <div className="text-xs text-gray-400">
                    T+ {Math.floor((timestamp - (timestamp - 30000)) / 1000)}s
                  </div>
                )}
              </div>
              
              {index < phases.length - 1 && (
                <div className={`w-px h-6 ${
                  phaseItem.completed ? 'bg-green-500' : 'bg-gray-600'
                }`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Mission Timer */}
      <div className="mt-6 p-3 bg-slate-800/50 rounded border border-slate-600">
        <div className="text-sm text-gray-400 mb-1">Mission Elapsed Time</div>
        <div className="text-xl font-mono font-bold text-orange-400">
          T+ {Math.floor((Date.now() - (timestamp - 30000)) / 1000 / 60).toString().padStart(2, '0')}:
          {Math.floor(((Date.now() - (timestamp - 30000)) / 1000) % 60).toString().padStart(2, '0')}
        </div>
      </div>
    </div>
  );
};
