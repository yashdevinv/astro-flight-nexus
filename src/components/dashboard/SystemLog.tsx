
import React, { useRef, useEffect } from 'react';
import { Terminal } from 'lucide-react';
import { LogEntry } from '@/hooks/useTelemetryData';

interface SystemLogProps {
  logs: LogEntry[];
}

export const SystemLog: React.FC<SystemLogProps> = ({ logs }) => {
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogColor = (level: string) => {
    switch (level) {
      case 'error': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      case 'info': return 'text-cyan-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-4 h-64">
      <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center">
        <Terminal className="w-5 h-5 mr-2" />
        SYSTEM LOG
      </h3>
      
      <div className="h-44 overflow-y-auto bg-slate-900/50 rounded border border-slate-700 p-3 font-mono text-xs">
        {logs.map((log, index) => (
          <div key={index} className="mb-1 flex">
            <span className="text-gray-500 mr-2">
              {new Date(log.timestamp).toLocaleTimeString()}
            </span>
            <span className={`mr-2 ${getLogColor(log.level)}`}>
              [{log.level.toUpperCase()}]
            </span>
            <span className="text-gray-300">{log.message}</span>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>
    </div>
  );
};
