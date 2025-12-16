import React from 'react';
import { MAX_GEMINI_METER } from '../types';
import { useLanguage } from '../src/contexts/LanguageContext';

interface GeminiMeterProps {
  value: number;
  message?: string;
  isFiring?: boolean; // Trigger attack animation
}

export const GeminiMeter: React.FC<GeminiMeterProps> = ({ value, message, isFiring }) => {
  const { t } = useLanguage();
  // Specific Google Brand Color Sequence: Blue, Red, Yellow, Blue, Green, Red
  const colors = ['#4285F4', '#EA4335', '#FBBC04', '#4285F4', '#34A853', '#EA4335'];

  // Calculate segments
  const radius = 40;
  const center = 50;
  const circumference = 2 * Math.PI * radius;
  const gap = 3; // visual gap

  // Each charge is a segment of the circle
  const totalSegments = MAX_GEMINI_METER;
  const segmentLength = (circumference / totalSegments) - gap;

  return (
    <div className="relative w-32 h-32 flex items-center justify-center group z-20">
      {/* Outer Glow if full */}
      {value >= MAX_GEMINI_METER && !isFiring && (
        <div className="absolute inset-0 rounded-full bg-white blur-xl opacity-50 animate-pulse"></div>
      )}

      {/* Firing Shockwave */}
      {isFiring && (
        <div className="absolute inset-0 rounded-full bg-google-blue blur-xl opacity-80 animate-ping"></div>
      )}

      <svg className={`w-full h-full transform -rotate-90 drop-shadow-lg ${isFiring ? 'scale-90' : ''}`} viewBox="0 0 100 100">
        {Array.from({ length: MAX_GEMINI_METER }).map((_, i) => {
          const isActive = i < value;
          const color = colors[i % colors.length];
          const dashArray = `${segmentLength} ${circumference - segmentLength}`;
          const offset = -i * (circumference / totalSegments);

          return (
            <circle
              key={i}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={isActive ? color : '#333'}
              strokeWidth="8"
              strokeDasharray={dashArray}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className={`transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-30'}`}
            />
          );
        })}
      </svg>

      {/* Center Icon (The Companion) */}
      <div className="absolute flex flex-col items-center justify-center">
        <div className={`w-12 h-12 transition-transform duration-500 ${isFiring ? 'scale-125 rotate-[360deg] duration-1000' : (value >= MAX_GEMINI_METER ? 'scale-110 animate-float' : 'scale-100')}`}>
          {/* Simple CSS Octahedron representation */}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white overflow-visible">
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <path d="M12 2L2 12L12 22L22 12L12 2Z" fill="#e8eaed" stroke="#4285F4" strokeWidth="1.5" filter="url(#glow)" />
            <path d="M12 2L12 22" stroke="#4285F4" strokeWidth="0.5" />
            <path d="M2 12L22 12" stroke="#4285F4" strokeWidth="0.5" />
            <circle cx="12" cy="12" r="2" fill={isFiring ? '#FBBC04' : '#4285F4'} className={isFiring ? "animate-ping" : "animate-pulse"} />
          </svg>
        </div>
        <span className="text-[10px] font-bold tracking-widest text-gray-300 mt-1 uppercase">{t.gemini.name}</span>
      </div>

      {/* Tooltip/Message Bubble */}
      {message && (
        <div className="absolute -top-16 bg-white text-gray-800 text-xs p-2 rounded-lg shadow-xl border border-gray-200 w-40 text-center opacity-0 group-hover:opacity-100 transition-opacity z-50 pointer-events-none">
          "{message}"
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
        </div>
      )}
    </div>
  );
};