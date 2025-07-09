
import React from 'react';
import { ChevronUp, ChevronDown, LineChart } from 'lucide-react';
import { TelemetryData } from '@/hooks/useTelemetryData';

interface GraphPanelProps {
  expanded: boolean;
  onToggle: () => void;
  telemetryData: TelemetryData;
}

export const GraphPanel: React.FC<GraphPanelProps> = ({ expanded, onToggle, telemetryData }) => {
  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg overflow-hidden">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
        onClick={onToggle}
      >
        <h3 className="text-lg font-bold text-cyan-400 flex items-center">
          <LineChart className="w-5 h-5 mr-2" />
          FLIGHT DATA GRAPHS
        </h3>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>
      
      {expanded && (
        <div className="p-4 pt-0">
          <div className="grid grid-cols-3 gap-4 h-48">
            {/* Altitude Graph */}
            <div className="bg-slate-900/50 rounded border border-slate-700 p-3">
              <div className="text-sm text-gray-400 mb-2">Altitude vs Time</div>
              <div className="h-32 flex items-end justify-center">
                <svg className="w-full h-full">
                  <path 
                    d="M 10,120 Q 50,80 80,40 Q 120,20 150,30 T 200,100" 
                    stroke="cyan" 
                    strokeWidth="2" 
                    fill="none"
                  />
                </svg>
              </div>
            </div>
            
            {/* Velocity Graph */}
            <div className="bg-slate-900/50 rounded border border-slate-700 p-3">
              <div className="text-sm text-gray-400 mb-2">Velocity vs Time</div>
              <div className="h-32 flex items-end justify-center">
                <svg className="w-full h-full">
                  <path 
                    d="M 10,120 L 40,60 L 80,40 L 120,80 L 150,100 L 200,110" 
                    stroke="green" 
                    strokeWidth="2" 
                    fill="none"
                  />
                </svg>
              </div>
            </div>
            
            {/* Acceleration Graph */}
            <div className="bg-slate-900/50 rounded border border-slate-700 p-3">
              <div className="text-sm text-gray-400 mb-2">Acceleration (XYZ)</div>
              <div className="h-32 flex items-end justify-center">
                <svg className="w-full h-full">
                  <path d="M 10,120 L 200,80" stroke="red" strokeWidth="1" fill="none" />
                  <path d="M 10,100 L 200,60" stroke="yellow" strokeWidth="1" fill="none" />
                  <path d="M 10,80 L 200,100" stroke="blue" strokeWidth="1" fill="none" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
