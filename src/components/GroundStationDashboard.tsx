
import React, { useState, useEffect } from 'react';
import { LiveOrientationDisplay } from './dashboard/LiveOrientationDisplay';
import { AltitudeOverview } from './dashboard/AltitudeOverview';
import { GPSTracking } from './dashboard/GPSTracking';
import { TelemetryPanel } from './dashboard/TelemetryPanel';
import { SystemLog } from './dashboard/SystemLog';
import { GraphPanel } from './dashboard/GraphPanel';
import { FlightTimeline } from './dashboard/FlightTimeline';
import { StatusBar } from './dashboard/StatusBar';
import { AlertSystem } from './dashboard/AlertSystem';
import { useTelemetryData } from '@/hooks/useTelemetryData';

export const GroundStationDashboard = () => {
  const { telemetryData, connectionStatus, logs } = useTelemetryData();
  const [graphExpanded, setGraphExpanded] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white overflow-hidden">
      {/* Header */}
      <header className="border-b border-cyan-500/30 bg-black/50 backdrop-blur-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <span className="text-white font-bold text-sm">🚀</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  MISSION CONTROL
                </h1>
                <p className="text-sm text-gray-400">Latin American Space Cup 2024 • Team India</p>
              </div>
            </div>
            <StatusBar connectionStatus={connectionStatus} />
          </div>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <div className="p-6 grid grid-cols-12 gap-6 h-[calc(100vh-100px)]">
        {/* Left Column - 3D Orientation & Telemetry */}
        <div className="col-span-3 space-y-6">
          <LiveOrientationDisplay orientation={telemetryData.orientation} />
          <TelemetryPanel data={telemetryData} />
        </div>

        {/* Center Column - Altitude & GPS */}
        <div className="col-span-6 space-y-6">
          <div className="grid grid-cols-2 gap-6 h-1/2">
            <AltitudeOverview 
              altitude={telemetryData.altitude}
              velocity={telemetryData.velocity}
              flightPhase={telemetryData.flight_phase}
            />
            <GPSTracking gps={telemetryData.gps} trajectory={telemetryData.trajectory} />
          </div>
          
          {/* Expandable Graph Panel */}
          <div className={`transition-all duration-300 ${graphExpanded ? 'h-1/2' : 'h-16'}`}>
            <GraphPanel 
              expanded={graphExpanded}
              onToggle={() => setGraphExpanded(!graphExpanded)}
              telemetryData={telemetryData}
            />
          </div>
        </div>

        {/* Right Column - Timeline & Logs */}
        <div className="col-span-3 space-y-6">
          <FlightTimeline phase={telemetryData.flight_phase} timestamp={telemetryData.timestamp} />
          <SystemLog logs={logs} />
        </div>
      </div>

      {/* Alert System Overlay */}
      <AlertSystem telemetryData={telemetryData} />
    </div>
  );
};
