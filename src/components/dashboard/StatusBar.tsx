
import React from 'react';
import { Wifi, WifiOff, Signal } from 'lucide-react';

interface StatusBarProps {
  connectionStatus: 'connected' | 'disconnected' | 'poor';
}

export const StatusBar: React.FC<StatusBarProps> = ({ connectionStatus }) => {
  const getStatusColor = () => {
    switch (connectionStatus) {
      case 'connected': return 'text-green-400';
      case 'poor': return 'text-yellow-400';
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
    <div className="flex items-center space-x-4">
      <div className={`flex items-center space-x-2 ${getStatusColor()}`}>
        {getStatusIcon()}
        <span className="text-sm font-medium">
          LoRa {connectionStatus.toUpperCase()}
        </span>
      </div>
      <div className="text-sm text-gray-400">
        {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};
