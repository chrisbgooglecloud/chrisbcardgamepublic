import React from 'react';
import { CardData } from '../types';
import { Card } from './Card';
import { useLanguage } from '../src/contexts/LanguageContext';

interface RewardScreenProps {
    rewardCards: CardData[];
    goldReward: number;
    onCardSelect: (card: CardData) => void;
    onSkip: () => void;
}

export const RewardScreen: React.FC<RewardScreenProps> = ({
    rewardCards,
    goldReward,
    onCardSelect,
    onSkip
}) => {
    const { t } = useLanguage();
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-gray-900/95 border-4 border-google-yellow rounded-lg p-8 max-w-4xl w-full mx-4 shadow-2xl">
                {/* Header */}
                <div className="text-center mb-6">
                    <h2 className="text-5xl font-bold text-google-green mb-3 animate-pulse">🎉 {t.ui.victory || 'VICTORY!'} 🎉</h2>
                    <p className="text-2xl text-google-yellow font-bold">+{goldReward} {t.ui.gold}</p>
                    <p className="text-white mt-3 text-lg">{t.ui.chooseCard}</p>
                </div>

                {/* Card Selection */}
                <div className="flex justify-center gap-6 mb-6">
                    {rewardCards.map((card, idx) => (
                        <div
                            key={idx}
                            onClick={() => onCardSelect(card)}
                            className="transform transition-all hover:scale-110 cursor-pointer hover:drop-shadow-2xl"
                        >
                            <Card card={card} onClick={() => onCardSelect(card)} />
                        </div>
                    ))}
                </div>

                {/* Skip Button */}
                <div className="text-center">
                    <button
                        onClick={onSkip}
                        className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold rounded-lg border-2 border-gray-600 hover:border-gray-500 transition-all shadow-lg"
                    >
                        {t.ui.skip}
                    </button>
                </div>
            </div>
        </div>
    );
};
