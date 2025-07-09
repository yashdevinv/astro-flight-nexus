
import React from 'react';
import { Wifi, WifiOff, Signal } from 'lucide-react';

interface StatusBarProps {
  connectionStatus: 'connected' | 'disconnected' | 'poor';
}

export const StatusBar: React.FC<StatusBarProps> = ({ connectionStatus }) => {
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-400';
      case 'poor': return 'text-orange-400';
      case 'disconnected': return 'text-red-400';
    }
  };

  const getStatusIcon = () => {
    switch (connectionStatus) {
      case 'connected': return <Signal className="w-5 h-5" />;
      case 'poor': return <Wifi className="w-5 h-5" />;
      case 'disconnected': return <WifiOff className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex items-center space-x-6">
      <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-600/50 ${getStatusColor()}`}>
        {getStatusIcon()}
        <span className="text-sm font-medium">
          LoRa {connectionStatus.toUpperCase()}
        </span>
      </div>
      <div className="text-sm text-slate-300 bg-slate-800/40 px-3 py-2 rounded-lg border border-slate-600/30">
        {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};
