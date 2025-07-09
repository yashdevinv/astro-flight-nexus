
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, Wind } from 'lucide-react';
import { TelemetryData } from '@/hooks/useTelemetryData';

interface TrajectoryVisualizationProps {
  telemetryData: TelemetryData;
}

export const TrajectoryVisualization: React.FC<TrajectoryVisualizationProps> = ({ telemetryData }) => {
  // Generate trajectory data based on flight phase
  const generateTrajectoryData = () => {
    const data = [];
    const currentTime = (Date.now() - telemetryData.timestamp + 30000) / 1000;
    
    for (let t = 0; t <= Math.min(currentTime, 120); t += 2) {
      let altitude = 0;
      let velocity = 0;
      
      if (t <= 15) {
        // Ascent phase
        altitude = Math.pow(t, 2) * 3.5;
        velocity = t * 7;
      } else if (t <= 30) {
        // Coasting to apogee
        const coastTime = t - 15;
        altitude = 787.5 + (105 * coastTime) - (3.5 * Math.pow(coastTime, 2));
        velocity = 105 - (7 * coastTime);
      } else if (t <= 90) {
        // Drogue descent
        const descentTime = t - 30;
        altitude = Math.max(0, 900 - (descentTime * 8));
        velocity = -8;
      } else {
        // Main parachute descent
        const mainTime = t - 90;
        altitude = Math.max(0, 420 - (mainTime * 4));
        velocity = -4;
      }
      
      data.push({
        time: t,
        altitude: Math.max(0, altitude),
        velocity: velocity,
        downrange: t * 2.5 + Math.sin(t * 0.1) * 10
      });
    }
    
    return data;
  };

  const trajectoryData = generateTrajectoryData();

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 h-full">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
        <TrendingUp className="w-5 h-5 mr-2" />
        TRAJECTORY ANALYSIS
      </h3>
      
      <div className="grid grid-cols-3 gap-4 h-32">
        {/* 3D Trajectory View */}
        <div className="bg-slate-900/50 rounded border border-slate-700 p-2">
          <div className="text-xs text-gray-400 mb-1">3D Flight Path</div>
          <div className="h-full relative">
            <svg className="w-full h-full">
              {/* Ground reference */}
              <line x1="10" y1="90%" x2="90%" y2="90%" stroke="#4ade80" strokeWidth="2" strokeDasharray="3,3" />
              
              {/* Trajectory curve */}
              <path 
                d="M 10,90 Q 30,30 50,20 Q 70,25 90,85" 
                stroke="cyan" 
                strokeWidth="2" 
                fill="none"
              />
              
              {/* Current position */}
              <circle cx="40" cy="35" r="3" fill="red" className="animate-pulse" />
              
              {/* Wind vector */}
              <g transform="translate(80,20)">
                <Wind className="w-3 h-3 text-yellow-400" />
                <text x="5" y="3" className="text-[8px] fill-yellow-400">5m/s</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Altitude vs Time */}
        <div className="bg-slate-900/50 rounded border border-slate-700 p-2">
          <div className="text-xs text-gray-400 mb-1">Altitude Profile</div>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={trajectoryData.slice(-20)}>
              <XAxis 
                dataKey="time" 
                fontSize={8}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis 
                fontSize={8}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af' }}
              />
              <Line 
                type="monotone" 
                dataKey="altitude" 
                stroke="#06b6d4" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Downrange Distance */}
        <div className="bg-slate-900/50 rounded border border-slate-700 p-2">
          <div className="text-xs text-gray-400 mb-1">Downrange vs Alt</div>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={trajectoryData.slice(-20)}>
              <XAxis 
                dataKey="downrange" 
                fontSize={8}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis 
                dataKey="altitude"
                fontSize={8}
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#9ca3af' }}
              />
              <Line 
                type="monotone" 
                dataKey="altitude" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
