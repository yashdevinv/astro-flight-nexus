
import React, { useState } from 'react';
import { LiveOrientationDisplay } from './dashboard/LiveOrientationDisplay';
import { AltitudeOverview } from './dashboard/AltitudeOverview';
import { GPSTracking } from './dashboard/GPSTracking';
import { TelemetryPanel } from './dashboard/TelemetryPanel';
import { SystemLog } from './dashboard/SystemLog';
import { GraphPanel } from './dashboard/GraphPanel';
import { FlightTimeline } from './dashboard/FlightTimeline';
import { StatusBar } from './dashboard/StatusBar';
import { AlertSystem } from './dashboard/AlertSystem';
import { TrajectoryVisualization } from './dashboard/TrajectoryVisualization';
import { EnvironmentalData } from './dashboard/EnvironmentalData';
import { useTelemetryData } from '@/hooks/useTelemetryData';

export const GroundStationDashboard = () => {
  const { telemetryData, connectionStatus, logs } = useTelemetryData();
  const [graphExpanded, setGraphExpanded] = useState(true);

  console.log('Dashboard rendering with telemetry:', telemetryData);

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
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    MISSION CONTROL
                  </h1>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-400">Latin American Space Cup 2025 •</span>
                    <span className="text-sm font-bold text-orange-400" style={{fontFamily: 'Samarkan, serif'}}>
                      STES Rocketry
                    </span>
                    <div className="w-6 h-4 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm flex items-center justify-center relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-blue-800 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <StatusBar connectionStatus={connectionStatus} />
          </div>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <div className="p-6 grid grid-cols-12 gap-6 h-[calc(100vh-100px)]">
        {/* Left Column - 3D Orientation & Environmental */}
        <div className="col-span-3 space-y-6">
          <LiveOrientationDisplay orientation={telemetryData.orientation} />
          <EnvironmentalData telemetryData={telemetryData} />
        </div>

        {/* Center Column - Altitude, GPS & Trajectory */}
        <div className="col-span-6 space-y-6">
          <div className="grid grid-cols-2 gap-6 h-2/5">
            <AltitudeOverview 
              altitude={telemetryData.altitude}
              velocity={telemetryData.velocity}
              flightPhase={telemetryData.flight_phase}
            />
            <GPSTracking gps={telemetryData.gps} trajectory={telemetryData.trajectory} />
          </div>
          
          {/* Trajectory Visualization */}
          <div className="h-1/5">
            <TrajectoryVisualization telemetryData={telemetryData} />
          </div>
          
          {/* Expandable Graph Panel */}
          <div className={`transition-all duration-300 ${graphExpanded ? 'h-2/5' : 'h-16'}`}>
            <GraphPanel 
              expanded={graphExpanded}
              onToggle={() => setGraphExpanded(!graphExpanded)}
              telemetryData={telemetryData}
            />
          </div>
        </div>

        {/* Right Column - Timeline, Telemetry & Logs */}
        <div className="col-span-3 space-y-6">
          <FlightTimeline phase={telemetryData.flight_phase} timestamp={telemetryData.timestamp} />
          <TelemetryPanel data={telemetryData} />
          <SystemLog logs={logs} />
        </div>
      </div>

      {/* Alert System Overlay */}
      <AlertSystem telemetryData={telemetryData} />
    </div>
  );
};
