
import React from 'react';
import { ChevronUp, ChevronDown, LineChart } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TelemetryData } from '@/hooks/useTelemetryData';

interface GraphPanelProps {
  expanded: boolean;
  onToggle: () => void;
  telemetryData: TelemetryData;
}

export const GraphPanel: React.FC<GraphPanelProps> = ({ expanded, onToggle, telemetryData }) => {
  // Generate realistic flight data
  const generateFlightData = () => {
    const data = [];
    const currentTime = (Date.now() - telemetryData.timestamp + 30000) / 1000;
    
    for (let t = 0; t <= Math.min(currentTime, 120); t += 1) {
      let altitude = 0;
      let velocity = 0;
      let acceleration = 0;
      let temperature = 15;
      let pressure = 1013.25;
      
      if (t <= 15) {
        // Powered ascent
        altitude = Math.pow(t, 2) * 3.5;
        velocity = t * 7;
        acceleration = 15 + Math.sin(t) * 3;
        temperature = 15 - (altitude * 0.0065);
        pressure = 1013.25 * Math.pow(1 - (0.0065 * altitude) / 288.15, 5.255);
      } else if (t <= 30) {
        // Coasting
        const coastTime = t - 15;
        altitude = 787.5 + (105 * coastTime) - (3.5 * Math.pow(coastTime, 2));
        velocity = 105 - (7 * coastTime);
        acceleration = -7;
        temperature = 15 - (altitude * 0.0065);
        pressure = 1013.25 * Math.pow(1 - (0.0065 * altitude) / 288.15, 5.255);
      } else {
        // Descent
        const descentTime = t - 30;
        altitude = Math.max(0, 900 - (descentTime * 6));
        velocity = -6;
        acceleration = -1;
        temperature = 15 - (altitude * 0.0065);
        pressure = 1013.25 * Math.pow(1 - (0.0065 * altitude) / 288.15, 5.255);
      }
      
      data.push({
        time: t,
        altitude: Math.max(0, altitude),
        velocity: velocity,
        acceleration: acceleration,
        accelX: Math.sin(t * 0.1) * 2 + acceleration * 0.1,
        accelY: Math.cos(t * 0.15) * 1.5 + acceleration * 0.1,
        accelZ: acceleration + Math.sin(t * 0.2) * 1,
        temperature: temperature,
        pressure: pressure
      });
    }
    
    return data.slice(-60); // Show last 60 seconds
  };

  const flightData = generateFlightData();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 p-3 rounded border border-cyan-500/30 backdrop-blur-sm">
          <p className="text-cyan-400 font-semibold">{`Time: ${label}s`}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value.toFixed(2)}${entry.name.includes('Accel') ? ' m/s²' : 
                entry.name === 'Altitude' ? ' m' : 
                entry.name === 'Velocity' ? ' m/s' :
                entry.name === 'Temperature' ? ' °C' :
                entry.name === 'Pressure' ? ' hPa' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg overflow-hidden">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-white/5 transition-colors"
        onClick={onToggle}
      >
        <h3 className="text-lg font-bold text-cyan-400 flex items-center">
          <LineChart className="w-5 h-5 mr-2" />
          FLIGHT DATA ANALYSIS
        </h3>
        {expanded ? (
          <ChevronUp className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronDown className="w-5 h-5 text-gray-400" />
        )}
      </div>
      
      {expanded && (
        <div className="p-4 pt-0">
          <div className="grid grid-cols-2 gap-4 h-48 mb-4">
            {/* Altitude vs Time */}
            <div className="bg-slate-900/50 rounded border border-slate-700 p-3">
              <div className="text-sm text-gray-400 mb-2">Altitude vs Time (m)</div>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={flightData}>
                  <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af"
                    fontSize={10}
                    label={{ value: 'Time (s)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9ca3af' } }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={10}
                    label={{ value: 'Alt (m)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9ca3af' } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area 
                    type="monotone" 
                    dataKey="altitude" 
                    stroke="#06b6d4" 
                    fill="#06b6d4"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            {/* Velocity vs Time */}
            <div className="bg-slate-900/50 rounded border border-slate-700 p-3">
              <div className="text-sm text-gray-400 mb-2">Velocity vs Time (m/s)</div>
              <ResponsiveContainer width="100%" height="85%">
                <RechartsLineChart data={flightData}>
                  <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af"
                    fontSize={10}
                    label={{ value: 'Time (s)', position: 'insideBottom', offset: -5, style: { textAnchor: 'middle', fill: '#9ca3af' } }}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={10}
                    label={{ value: 'Vel (m/s)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#9ca3af' } }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="velocity" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    dot={false}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 h-48">
            {/* 3-Axis Acceleration */}
            <div className="bg-slate-900/50 rounded border border-slate-700 p-3">
              <div className="text-sm text-gray-400 mb-2">Acceleration XYZ (m/s²)</div>
              <ResponsiveContainer width="100%" height="85%">
                <RechartsLineChart data={flightData}>
                  <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af"
                    fontSize={8}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={8}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="accelX" stroke="#ef4444" strokeWidth={1.5} dot={false} name="Accel X" />
                  <Line type="monotone" dataKey="accelY" stroke="#eab308" strokeWidth={1.5} dot={false} name="Accel Y" />
                  <Line type="monotone" dataKey="accelZ" stroke="#3b82f6" strokeWidth={1.5} dot={false} name="Accel Z" />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            
            {/* Temperature */}
            <div className="bg-slate-900/50 rounded border border-slate-700 p-3">
              <div className="text-sm text-gray-400 mb-2">Temperature (°C)</div>
              <ResponsiveContainer width="100%" height="85%">
                <RechartsLineChart data={flightData}>
                  <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af"
                    fontSize={8}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={8}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="temperature" 
                    stroke="#f97316" 
                    strokeWidth={2}
                    dot={false}
                    name="Temperature"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>

            {/* Atmospheric Pressure */}
            <div className="bg-slate-900/50 rounded border border-slate-700 p-3">
              <div className="text-sm text-gray-400 mb-2">Pressure (hPa)</div>
              <ResponsiveContainer width="100%" height="85%">
                <RechartsLineChart data={flightData}>
                  <CartesianGrid strokeDasharray="3,3" stroke="#374151" />
                  <XAxis 
                    dataKey="time" 
                    stroke="#9ca3af"
                    fontSize={8}
                  />
                  <YAxis 
                    stroke="#9ca3af"
                    fontSize={8}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="pressure" 
                    stroke="#8b5cf6" 
                    strokeWidth={2}
                    dot={false}
                    name="Pressure"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
