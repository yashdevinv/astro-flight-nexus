
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
      case 'Pre-Launch': return 'text-slate-400';
      case 'Ascent': return 'text-green-400';
      case 'Apogee': return 'text-orange-400';
      case 'Drogue Deployed': return 'text-blue-400';
      case 'Main Deployed': return 'text-cyan-400';
      case 'Landed': return 'text-purple-400';
      default: return 'text-white';
    }
  };

  const maxAltitude = 1000; // meters
  const altitudePercent = Math.min((altitude / maxAltitude) * 100, 100);

  return (
    <div className="bg-slate-800/60 backdrop-blur-sm border border-orange-400/30 rounded-lg p-4 h-full shadow-lg">
      <h3 className="text-lg font-bold text-orange-400 mb-4">ALTITUDE & DESCENT</h3>
      
      {/* Flight Phase */}
      <div className="mb-4">
        <div className="text-sm text-slate-300 mb-1">Flight Phase</div>
        <div className={`text-xl font-bold ${getPhaseColor(flightPhase)}`}>
          {flightPhase.toUpperCase()}
        </div>
      </div>

      {/* Altitude Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-slate-300 mb-2">
          <span>Altitude</span>
          <span className="font-mono">{altitude.toFixed(1)}m</span>
        </div>
        <div className="h-6 bg-slate-700 rounded-full overflow-hidden border border-orange-400/20">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-green-500 transition-all duration-1000 shadow-lg"
            style={{ width: `${altitudePercent}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>0m</span>
          <span>{maxAltitude}m</span>
        </div>
      </div>

      {/* Velocity */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-300">Vertical Velocity</div>
          <div className="flex items-center space-x-2">
            {velocity > 0 ? (
              <TrendingUp className="w-4 h-4 text-green-400" />
            ) : velocity < 0 ? (
              <TrendingDown className="w-4 h-4 text-red-400" />
            ) : null}
            <span className="text-lg font-bold text-white font-mono">
              {Math.abs(velocity).toFixed(1)} m/s
            </span>
          </div>
        </div>
      </div>

      {/* Phase Markers */}
      <div className="space-y-2">
        <div className="text-sm text-slate-300 mb-2">Mission Milestones</div>
        {[
          { name: 'Liftoff', alt: 0, completed: altitude > 0 },
          { name: 'Max Q', alt: 200, completed: altitude > 200 },
          { name: 'Apogee', alt: 800, completed: flightPhase !== 'Pre-Launch' && flightPhase !== 'Ascent' },
          { name: 'Drogue Deploy', alt: 600, completed: ['Drogue Deployed', 'Main Deployed', 'Landed'].includes(flightPhase) },
          { name: 'Main Deploy', alt: 200, completed: ['Main Deployed', 'Landed'].includes(flightPhase) },
          { name: 'Landing', alt: 0, completed: flightPhase === 'Landed' }
        ].map((milestone, index) => (
          <div key={index} className="flex items-center space-x-2 text-xs">
            <div className={`w-2 h-2 rounded-full ${milestone.completed ? 'bg-orange-400' : 'bg-slate-600'}`} />
            <span className={milestone.completed ? 'text-orange-400' : 'text-slate-500'}>
              {milestone.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
