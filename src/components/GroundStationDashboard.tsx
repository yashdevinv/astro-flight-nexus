
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header - Redesigned */}
      <header className="sticky top-0 z-50 bg-slate-900/98 backdrop-blur-xl border-b border-orange-500/30 shadow-2xl">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-orange-500 via-red-500 to-orange-600 p-0.5 shadow-2xl">
                  <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">
                    <span className="text-2xl">🚀</span>
                  </div>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-4xl font-black bg-gradient-to-r from-orange-400 via-orange-300 to-green-400 bg-clip-text text-transparent tracking-wide">
                  MISSION CONTROL
                </h1>
                <div className="flex items-center space-x-4 mt-1">
                  <span className="text-sm text-slate-400 font-medium">Latin American Space Cup 2025</span>
                  <div className="w-1 h-1 bg-orange-400 rounded-full"></div>
                  <span className="text-lg font-bold text-orange-400 tracking-wider">
                    STES ROCKETRY
                  </span>
                  <div className="ml-2 w-6 h-4 bg-gradient-to-b from-orange-500 via-white to-green-500 rounded-sm border border-slate-700 shadow-lg"></div>
                </div>
              </div>
            </div>
            <StatusBar connectionStatus={connectionStatus} />
          </div>
        </div>
      </header>

      {/* Main Dashboard - Fixed Layout */}
      <div className="p-8 overflow-hidden">
        <div className="max-w-full">
          {/* Top Row - Altitude and GPS */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-3">
              <div className="h-[380px] overflow-hidden">
                <LiveOrientationDisplay orientation={telemetryData.orientation} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="grid grid-cols-2 gap-6 h-[380px]">
                <div className="overflow-hidden">
                  <AltitudeOverview 
                    altitude={telemetryData.altitude}
                    velocity={telemetryData.velocity}
                    flightPhase={telemetryData.flight_phase}
                  />
                </div>
                <div className="overflow-hidden">
                  <GPSTracking gps={telemetryData.gps} trajectory={telemetryData.trajectory} />
                </div>
              </div>
            </div>
            <div className="col-span-3">
              <div className="h-[380px] overflow-hidden">
                <FlightTimeline phase={telemetryData.flight_phase} timestamp={telemetryData.timestamp} />
              </div>
            </div>
          </div>

          {/* Middle Row - Environmental and Trajectory */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            <div className="col-span-3">
              <div className="h-[340px] overflow-hidden">
                <EnvironmentalData telemetryData={telemetryData} />
              </div>
            </div>
            <div className="col-span-6">
              <div className="h-[340px] overflow-hidden">
                <TrajectoryVisualization telemetryData={telemetryData} />
              </div>
            </div>
            <div className="col-span-3">
              <div className="h-[340px] overflow-hidden">
                <TelemetryPanel data={telemetryData} />
              </div>
            </div>
          </div>

          {/* Bottom Row - Graph and System Log */}
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-9">
              <div className={`transition-all duration-300 overflow-hidden ${graphExpanded ? 'h-[400px]' : 'h-16'}`}>
                <GraphPanel 
                  expanded={graphExpanded}
                  onToggle={() => setGraphExpanded(!graphExpanded)}
                  telemetryData={telemetryData}
                />
              </div>
            </div>
            <div className="col-span-3">
              <div className="h-[400px] overflow-hidden">
                <SystemLog logs={logs} />
              </div>
            </div>
          </div>
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
