
import React, { useEffect, useRef, useState } from 'react';
import { LogEntry, LogSeverity } from '../types';
import { useLanguage } from '../src/contexts/LanguageContext';

interface CombatLogProps {
  logs: LogEntry[];
}

export const CombatLog: React.FC<CombatLogProps> = ({ logs }) => {
  const { t } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isExpanded]);

  const getSeverityColor = (severity: LogSeverity) => {
    switch (severity) {
      case 'INFO': return 'text-blue-400';
      case 'NOTICE': return 'text-green-400';
      case 'WARNING': return 'text-yellow-400';
      case 'ERROR': return 'text-red-400';
      case 'CRITICAL': return 'text-purple-500 font-bold';
      default: return 'text-gray-300';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'PLAYER': return '👤';
      case 'ENEMY': return '👾';
      case 'GEMINI': return '✨';
      case 'SYSTEM': return '⚙️';
      default: return '•';
    }
  };

  return (
    <div
      className={`fixed bottom-0 left-0 z-40 transition-all duration-300 ease-in-out bg-black/90 border-t-2 border-gray-700 font-mono text-xs md:text-sm shadow-2xl ${isExpanded ? 'h-64 w-full md:w-1/3' : 'h-10 w-full md:w-auto'}`}
    >
      {/* Header / Toggle */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="h-10 bg-gray-800 hover:bg-gray-700 cursor-pointer flex items-center px-4 justify-between select-none"
      >
        <div className="flex items-center space-x-2 text-gray-300">
          <span className="text-green-500">●</span>
          <span className="font-bold">{t.combatLog.title}</span>
        </div>
        <div className="text-gray-500">{isExpanded ? `▼ ${t.combatLog.minimize}` : `▲ ${t.combatLog.expand}`}</div>
      </div>

      {/* Log Content */}
      {isExpanded && (
        <div className="h-[calc(100%-2.5rem)] overflow-y-auto p-2 space-y-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-black">
          {logs.length === 0 && <div className="text-gray-600 italic p-2">{t.combatLog.waiting}</div>}

          {logs.map((log) => (
            <div key={log.id} className="flex space-x-2 hover:bg-gray-800/50 p-0.5 rounded">
              <span className="text-gray-500 min-w-[3rem]">[T:{log.turn.toString().padStart(2, '0')}]</span>
              <span className={`font-bold min-w-[4rem] ${getSeverityColor(log.severity)}`}>
                {log.severity}
              </span>
              <span className="text-gray-400" title={log.source}>{getSourceIcon(log.source)}</span>
              <span className="text-gray-200 flex-1 break-words">{log.message}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};
