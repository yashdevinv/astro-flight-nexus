
import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface AltitudeOverviewProps {
  altitude: number;
  velocity: number;
  flightPhase: string;
}

export const AltitudeOverview: React.FC<AltitudeOverviewProps> = ({ 
  altitude, 
  velocity, 
  flightPhase 
}) => {
  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Pre-Launch': return 'text-gray-400';
      case 'Ascent': return 'text-green-400';
      case 'Apogee': return 'text-yellow-400';
      case 'Drogue Deployed': return 'text-orange-400';
      case 'Main Deployed': return 'text-blue-400';
      case 'Landed': return 'text-purple-400';
      default: return 'text-white';
    }
  };

  const maxAltitude = 1000; // meters
  const altitudePercent = Math.min((altitude / maxAltitude) * 100, 100);

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 h-full">
      <h3 className="text-lg font-bold text-cyan-400 mb-4">ALTITUDE & DESCENT</h3>
      
      {/* Flight Phase */}
      <div className="mb-4">
        <div className="text-sm text-gray-400 mb-1">Flight Phase</div>
        <div className={`text-xl font-bold ${getPhaseColor(flightPhase)}`}>
          {flightPhase.toUpperCase()}
        </div>
      </div>

      {/* Altitude Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Altitude</span>
          <span>{altitude.toFixed(1)}m</span>
        </div>
        <div className="h-6 bg-slate-800 rounded-full overflow-hidden border border-slate-600">
          <div 
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-1000"
            style={{ width: `${altitudePercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>0m</span>
          <span>{maxAltitude}m</span>
        </div>
      </div>

      {/* Velocity */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">Vertical Velocity</div>
          <div className="flex items-center space-x-2">
            {velocity > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : velocity < 0 ? (
              <TrendingDown className="w-4 h-4 text-red-400" />
            ) : null}
            <span className="text-lg font-bold text-white">
              {Math.abs(velocity).toFixed(1)} m/s
            </span>
          </div>
        </div>
      </div>

      {/* Phase Markers */}
      <div className="space-y-2">
        <div className="text-sm text-gray-400 mb-2">Mission Milestones</div>
        {[
          { name: 'Liftoff', alt: 0, completed: altitude > 0 },
          { name: 'Max Q', alt: 200, completed: altitude > 200 },
          { name: 'Apogee', alt: 800, completed: flightPhase !== 'Pre-Launch' && flightPhase !== 'Ascent' },
          { name: 'Drogue Deploy', alt: 600, completed: ['Drogue Deployed', 'Main Deployed', 'Landed'].includes(flightPhase) },
          { name: 'Main Deploy', alt: 200, completed: ['Main Deployed', 'Landed'].includes(flightPhase) },
          { name: 'Landing', alt: 0, completed: flightPhase === 'Landed' }
        ].map((milestone, index) => (
          <div key={index} className="flex items-center space-x-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${milestone.completed ? 'bg-green-400' : 'bg-gray-600'}`} />
            <span className={milestone.completed ? 'text-green-400' : 'text-gray-500'}>
              {milestone.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
