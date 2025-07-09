
import React from 'react';
import { AlertTriangle, Wifi, Battery } from 'lucide-react';
import { TelemetryData } from '@/hooks/useTelemetryData';

interface AlertSystemProps {
  telemetryData: TelemetryData;
}

export const AlertSystem: React.FC<AlertSystemProps> = ({ telemetryData }) => {
  const alerts = [];

  // Check for low battery
  if (telemetryData.battery < 10.5) {
    alerts.push({
      type: 'warning' as const,
      message: 'Low Battery Voltage',
      icon: Battery
    });
  }

  // Check for poor signal
  if (telemetryData.rssi < -90) {
    alerts.push({
      type: 'warning' as const,
      message: 'Weak LoRa Signal',
      icon: Wifi
    });
  }

  // Check for system errors
  if (telemetryData.status !== 'ok') {
    alerts.push({
      type: 'error' as const,
      message: 'System Error Detected',
      icon: AlertTriangle
    });
  }

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {alerts.map((alert, index) => {
        const IconComponent = alert.icon;
        return (
          <div
            key={index}
            className={`p-4 rounded-lg border backdrop-blur-sm animate-pulse ${
              alert.type === 'error'
                ? 'bg-red-900/80 border-red-500 text-red-100'
                : 'bg-yellow-900/80 border-yellow-500 text-yellow-100'
            }`}
          >
            <div className="flex items-center space-x-3">
              <IconComponent className="w-5 h-5" />
              <span className="font-medium">{alert.message}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
