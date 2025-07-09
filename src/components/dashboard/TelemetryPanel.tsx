
import React from 'react';
import { Battery, Wifi, HardDrive, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { TelemetryData } from '@/hooks/useTelemetryData';

interface TelemetryPanelProps {
  data: TelemetryData;
}

export const TelemetryPanel: React.FC<TelemetryPanelProps> = ({ data }) => {
  const getBatteryColor = (voltage: number) => {
    if (voltage > 11.0) return 'text-green-400';
    if (voltage > 10.0) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getRSSIColor = (rssi: number) => {
    if (rssi > -70) return 'text-green-400';
    if (rssi > -85) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getStatusIcon = (status: boolean) => {
    return status ? (
      <CheckCircle className="w-4 h-4 text-green-400" />
    ) : (
      <AlertTriangle className="w-4 h-4 text-red-400" />
    );
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4">
      <h3 className="text-lg font-bold text-cyan-400 mb-4">TELEMETRY</h3>
      
      <div className="space-y-4">
        {/* Battery */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Battery className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Battery</span>
          </div>
          <span className={`text-sm font-bold ${getBatteryColor(data.battery)}`}>
            {data.battery.toFixed(1)}V
          </span>
        </div>

        {/* LoRa RSSI */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wifi className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">LoRa RSSI</span>
          </div>
          <span className={`text-sm font-bold ${getRSSIColor(data.rssi)}`}>
            {data.rssi} dBm
          </span>
        </div>

        {/* Storage Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <HardDrive className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-400">Storage</span>
          </div>
          {getStatusIcon(true)}
        </div>

        {/* Pyro Channels */}
        <div className="border-t border-slate-700 pt-4">
          <div className="text-sm text-gray-400 mb-2">Pyro Channels</div>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">Drogue</span>
            </div>
            <span className={`text-xs font-bold ${
              data.pyro.drogue === 'armed' ? 'text-yellow-400' : 
              data.pyro.drogue === 'fired' ? 'text-red-400' : 'text-gray-400'
            }`}>
              {data.pyro.drogue.toUpperCase()}
            </span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-gray-400" />
              <span className="text-xs text-gray-400">Main</span>
            </div>
            <span className={`text-xs font-bold ${
              data.pyro.main === 'armed' ? 'text-yellow-400' : 
              data.pyro.main === 'fired' ? 'text-red-400' : 'text-gray-400'
            }`}>
              {data.pyro.main.toUpperCase()}
            </span>
          </div>
        </div>

        {/* System Status */}
        <div className="border-t border-slate-700 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-400">System Status</span>
            <div className="flex items-center space-x-2">
              {getStatusIcon(data.status === 'ok')}
              <span className={`text-sm font-bold ${
                data.status === 'ok' ? 'text-green-400' : 'text-red-400'
              }`}>
                {data.status.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
