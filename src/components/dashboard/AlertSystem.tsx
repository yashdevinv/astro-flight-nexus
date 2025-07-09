
import React, { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { TelemetryData } from '@/hooks/useTelemetryData';

interface AlertSystemProps {
  telemetryData: TelemetryData;
}

interface Alert {
  id: string;
  level: 'warning' | 'error';
  message: string;
  timestamp: number;
}

export const AlertSystem: React.FC<AlertSystemProps> = ({ telemetryData }) => {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const newAlerts: Alert[] = [];

    // Check for low battery
    if (telemetryData.battery < 10.5) {
      newAlerts.push({
        id: 'low-battery',
        level: 'warning',
        message: `Low battery voltage: ${telemetryData.battery.toFixed(1)}V`,
        timestamp: Date.now()
      });
    }

    // Check for poor signal
    if (telemetryData.rssi < -90) {
      newAlerts.push({
        id: 'poor-signal',
        level: 'warning',
        message: `Weak LoRa signal: ${telemetryData.rssi} dBm`,
        timestamp: Date.now()
      });
    }

    // Check for system errors
    if (telemetryData.status !== 'ok') {
      newAlerts.push({
        id: 'system-error',
        level: 'error',
        message: `System error detected: ${telemetryData.status}`,
        timestamp: Date.now()
      });
    }

    setAlerts(newAlerts);
  }, [telemetryData]);

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-20 right-6 z-50 space-y-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`p-4 rounded-lg border backdrop-blur-sm animate-fade-in ${
            alert.level === 'error'
              ? 'bg-red-900/80 border-red-500/50 text-red-100'
              : 'bg-yellow-900/80 border-yellow-500/50 text-yellow-100'
          }`}
        >
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="font-semibold text-sm">
                {alert.level === 'error' ? 'SYSTEM ERROR' : 'WARNING'}
              </div>
              <div className="text-sm">{alert.message}</div>
            </div>
            <button
              onClick={() => dismissAlert(alert.id)}
              className="text-gray-300 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
