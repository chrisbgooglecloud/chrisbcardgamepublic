
import React, { useState } from 'react';
import { CLASSES, RELICS } from '../constants';
import { ClassDefinition } from '../types';
import { useLanguage } from '../src/contexts/LanguageContext';

interface CharacterSelectProps {
  onSelect: (classDef: ClassDefinition) => void;
}

export const CharacterSelect: React.FC<CharacterSelectProps> = ({ onSelect }) => {
  const { t } = useLanguage();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleClassClick = (classDef: ClassDefinition) => {
    setSelectedId(classDef.id);
    // In a real implementation, you'd play a sound here based on classDef.id
  };

  const handleLaunch = () => {
    if (selectedId) {
      const selectedClass = CLASSES.find(c => c.id === selectedId);
      if (selectedClass) {
        onSelect(selectedClass);
      }
    }
  };

  return (
    <div className="h-screen w-full bg-legacy-bg flex flex-col items-center justify-center text-white relative font-sans overflow-hidden">
      <div className="absolute inset-0 opacity-40 bg-[url('/assets/backgrounds/map_cable_ascension.png')] bg-cover bg-center"></div>

      <h1 className="text-4xl md:text-5xl font-black mb-8 z-10 tracking-tight drop-shadow-lg">
        SELECT YOUR ROLE
      </h1>

      <div className="flex flex-col md:flex-row gap-6 z-10 max-w-6xl w-full px-4 justify-center items-center md:items-stretch">
        {CLASSES.map((cls) => {
          const isSelected = selectedId === cls.id;
          const relic = RELICS[cls.relicId.replace(/-/g, '_').toUpperCase()];
          const localizedClass = t.classes[cls.id];
          const localizedRelic = relic ? t.relics[relic.id] : null;

          return (
            <div
              key={cls.id}
              onClick={() => handleClassClick(cls)}
              className={`
                 relative group w-full md:w-1/3 bg-white rounded-xl border-4 shadow-2xl cursor-pointer transition-all duration-300 overflow-hidden
                 flex flex-col
                 ${isSelected ? 'border-opacity-100 scale-105 shadow-[0_0_30px_rgba(255,255,255,0.3)]' : 'border-gray-600 opacity-90 hover:opacity-100 hover:scale-[1.02]'}
               `}
              style={{ borderColor: isSelected ? cls.color : '#4b5563' }}
            >
              {/* Selection Badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-lg z-20">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                </div>
              )}

              {/* Header Background (Tinted) */}
              <div className="h-32 relative flex items-center justify-center overflow-hidden" style={{ backgroundColor: cls.color + '20' }}>
                {/* Portrait */}
                {cls.imageUrl ? (
                  <img src={cls.imageUrl} alt={cls.name} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-500" />
                ) : (
                  <div className="relative w-24 h-24 animate-float">
                    <div className="absolute inset-0 bg-white rounded-full filter blur-md opacity-50"></div>
                    <div className="relative z-10 text-6xl drop-shadow-lg">
                      {cls.visualIcon}
                    </div>
                  </div>
                )}
              </div>

              <div className="p-6 flex-1 flex flex-col text-gray-800">
                <h2 className="text-2xl font-black uppercase tracking-tight mb-1" style={{ color: cls.color }}>{localizedClass?.name || cls.name}</h2>
                <p className="text-sm italic text-gray-500 mb-4 font-serif">{cls.archetype}</p>

                <p className="text-sm mb-6 leading-relaxed font-medium">
                  {localizedClass?.description || cls.description}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-200">
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Starting Relic</div>
                  <div className="flex items-center bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <span className="text-2xl mr-3">{relic?.icon || '📦'}</span>
                    <div>
                      <div className="font-bold text-sm">{localizedRelic?.name || relic?.name || 'Unknown Relic'}</div>
                      <div className="text-xs text-gray-500 leading-tight">{localizedRelic?.description || relic?.description}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleLaunch}
        disabled={!selectedId}
        className={`
            mt-12 px-12 py-5 rounded-full text-xl font-bold shadow-xl transition-all duration-300 z-10 flex items-center gap-3
            ${selectedId
            ? 'bg-google-blue text-white hover:shadow-[0_0_30px_rgba(66,133,244,0.6)] hover:-translate-y-1'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'}
          `}
      >
        <span>{t.ui.startButton}</span>
        {selectedId && <span className="animate-bounce">🚀</span>}
      </button>
    </div>
  );
};
