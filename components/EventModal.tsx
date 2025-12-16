import React from 'react';
import { EventDefinition, EventOption } from '../types';
import { useLanguage } from '../src/contexts/LanguageContext';

interface EventModalProps {
    event: EventDefinition;
    onOptionSelect: (option: EventOption) => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onOptionSelect }) => {
    const { t } = useLanguage();
    const localizedEvent = t.events[event.id];
    return (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-4xl bg-gray-900 border-2 border-gray-600 rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row">

                {/* Image Section */}
                <div className="w-full md:w-1/3 bg-black relative min-h-[300px]">
                    {event.imageUrl ? (
                        <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="w-full h-full object-cover opacity-80"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-6xl">
                            ❓
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent"></div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-2/3 p-8 flex flex-col">
                    <h2 className="text-4xl font-bold text-white mb-4 tracking-tight text-google-blue">
                        {localizedEvent?.title || event.title}
                    </h2>

                    <div className="flex-1 overflow-y-auto mb-8 pr-2">
                        <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-wrap">
                            {localizedEvent?.narrative || event.narrative}
                        </p>
                    </div>

                    {/* Options */}
                    <div className="space-y-3">
                        {event.options.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => onOptionSelect(option)}
                                className="w-full group relative overflow-hidden rounded-lg border border-gray-600 bg-gray-800 hover:bg-gray-700 transition-all duration-200 text-left p-4 flex items-center justify-between"
                            >
                                <div className="absolute inset-0 bg-google-blue/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>

                                <div className="relative z-10">
                                    <div className="font-bold text-white text-lg group-hover:text-google-blue transition-colors">
                                        {localizedEvent?.options[option.id]?.label || option.label}
                                    </div>
                                    {option.description && (
                                        <div className="text-sm text-gray-400 mt-1">
                                            {localizedEvent?.options[option.id]?.description || option.description}
                                        </div>
                                    )}
                                </div>

                                {option.risk && (
                                    <div className="relative z-10 text-xs font-bold uppercase tracking-widest text-red-400 bg-red-900/30 px-2 py-1 rounded border border-red-500/30">
                                        Risk: {option.risk * 100}%
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
