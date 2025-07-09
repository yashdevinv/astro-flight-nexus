
import { useState, useEffect } from 'react';

export interface TelemetryData {
  timestamp: number;
  altitude: number;
  velocity: number;
  orientation: {
    pitch: number;
    yaw: number;
    roll: number;
  };
  battery: number;
  gps: {
    lat: number;
    lon: number;
    alt: number;
  };
  flight_phase: string;
  pyro: {
    drogue: string;
    main: string;
  };
  rssi: number;
  status: string;
  trajectory?: Array<{lat: number, lon: number}>;
}

export interface LogEntry {
  timestamp: number;
  level: 'info' | 'warning' | 'error';
  message: string;
}

export const useTelemetryData = () => {
  const [telemetryData, setTelemetryData] = useState<TelemetryData>({
    timestamp: Date.now(),
    altitude: 0,
    velocity: 0,
    orientation: { pitch: 0, yaw: 0, roll: 0 },
    battery: 12.1,
    gps: { lat: 18.5204, lon: 73.8567, alt: 560 },
    flight_phase: 'Pre-Launch',
    pyro: { drogue: 'armed', main: 'armed' },
    rssi: -75,
    status: 'ok',
    trajectory: []
  });

  const [logs, setLogs] = useState<LogEntry[]>([
    { timestamp: Date.now() - 5000, level: 'info', message: 'System initialized successfully' },
    { timestamp: Date.now() - 3000, level: 'info', message: 'LoRa connection established' },
    { timestamp: Date.now() - 1000, level: 'info', message: 'All sensors operational' }
  ]);

  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'poor'>('connected');

  // Simulate real-time telemetry data
  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetryData(prev => {
        const time = (Date.now() - prev.timestamp) / 1000;
        let newAltitude = prev.altitude;
        let newVelocity = prev.velocity;
        let newPhase = prev.flight_phase;

        // Simulate flight phases
        if (prev.flight_phase === 'Pre-Launch' && Math.random() > 0.99) {
          newPhase = 'Ascent';
          setLogs(prevLogs => [...prevLogs, {
            timestamp: Date.now(),
            level: 'info',
            message: 'LIFTOFF! Rocket ascending'
          }]);
        } else if (prev.flight_phase === 'Ascent') {
          newAltitude = Math.max(0, prev.altitude + Math.random() * 50);
          newVelocity = 15 + Math.random() * 20;
          
          if (newAltitude > 800) {
            newPhase = 'Apogee';
            newVelocity = 0;
          }
        } else if (prev.flight_phase === 'Apogee') {
          newPhase = 'Drogue Deployed';
          newVelocity = -5;
        } else if (prev.flight_phase === 'Drogue Deployed') {
          newAltitude = Math.max(0, prev.altitude - 5);
          newVelocity = -8 + Math.random() * 2;
          
          if (newAltitude < 200) {
            newPhase = 'Main Deployed';
          }
        } else if (prev.flight_phase === 'Main Deployed') {
          newAltitude = Math.max(0, prev.altitude - 2);
          newVelocity = -3 + Math.random();
          
          if (newAltitude < 10) {
            newPhase = 'Landed';
            newVelocity = 0;
          }
        }

        return {
          ...prev,
          altitude: newAltitude,
          velocity: newVelocity,
          flight_phase: newPhase,
          orientation: {
            pitch: prev.orientation.pitch + (Math.random() - 0.5) * 5,
            yaw: prev.orientation.yaw + (Math.random() - 0.5) * 3,
            roll: prev.orientation.roll + (Math.random() - 0.5) * 4
          },
          battery: Math.max(9.0, prev.battery - 0.001),
          rssi: -70 + Math.random() * 20,
          timestamp: Date.now()
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return { telemetryData, connectionStatus, logs };
};
