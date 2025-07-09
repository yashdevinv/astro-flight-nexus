
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-950/20 to-green-900/30 text-white overflow-auto">
      {/* Header - Fixed positioning */}
      <header className="sticky top-0 z-50 border-b border-orange-400/40 bg-slate-900/95 backdrop-blur-md shadow-lg">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🚀</span>
              </div>
              <div className="flex items-center space-x-3">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 via-white to-green-400 bg-clip-text text-transparent">
                    MISSION CONTROL
                  </h1>
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-slate-300">Latin American Space Cup 2025 •</span>
                    <span className="text-lg font-bold text-orange-400" style={{fontFamily: 'Samarkan, serif'}}>
                      STES Rocketry
                    </span>
                    <div className="w-8 h-5 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm flex items-center justify-center relative shadow-md border border-slate-600">
                      <div className="absolute inset-0 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-4 h-4 rounded-full bg-blue-800 flex items-center justify-center">
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

      {/* Main Dashboard Grid - Proper spacing from header */}
      <div className="p-6 pt-8 grid grid-cols-12 gap-6 min-h-[calc(100vh-120px)]">
        {/* Left Column - 3D Orientation & Environmental */}
        <div className="col-span-3 space-y-6">
          <LiveOrientationDisplay orientation={telemetryData.orientation} />
          <EnvironmentalData telemetryData={telemetryData} />
        </div>

        {/* Center Column - Altitude, GPS & Trajectory */}
        <div className="col-span-6 space-y-6">
          <div className="grid grid-cols-2 gap-6 h-80">
            <AltitudeOverview 
              altitude={telemetryData.altitude}
              velocity={telemetryData.velocity}
              flightPhase={telemetryData.flight_phase}
            />
            <GPSTracking gps={telemetryData.gps} trajectory={telemetryData.trajectory} />
          </div>
          
          {/* Trajectory Visualization */}
          <div className="h-64">
            <TrajectoryVisualization telemetryData={telemetryData} />
          </div>
          
          {/* Expandable Graph Panel */}
          <div className={`transition-all duration-300 ${graphExpanded ? 'h-80' : 'h-16'}`}>
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
      
      {/* Subtle Indian Pattern Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, orange 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, green 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>
    </div>
  );
};
