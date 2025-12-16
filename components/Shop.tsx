import React from 'react';
import { CardData, Relic, CardType } from '../types';
import { Card } from './Card';
import { useLanguage } from '../src/contexts/LanguageContext';

interface ShopProps {
    gold: number;
    cardsForSale: { card: CardData; price: number }[];
    relicsForSale: { relic: Relic; price: number }[];
    onBuyCard: (card: CardData, price: number) => void;
    onBuyRelic: (relic: Relic, price: number) => void;
    onRemoveCard: (price: number) => void;
    onLeave: () => void;
    removeCardPrice: number;
}

export const Shop: React.FC<ShopProps> = ({
    gold,
    cardsForSale,
    relicsForSale,
    onBuyCard,
    onBuyRelic,
    onRemoveCard,
    onLeave,
    removeCardPrice
}) => {
    const { t } = useLanguage();
    return (
        <div className="absolute inset-0 z-50 bg-gray-900 flex flex-col items-center overflow-hidden font-sans">
            {/* Background */}
            <div className="absolute inset-0 bg-[url('/assets/backgrounds/bg_server_closet.png')] bg-cover bg-center opacity-20 pointer-events-none"></div>

            {/* Header */}
            <div className="w-full bg-black/80 p-6 border-b border-yellow-600 flex justify-between items-center z-10">
                <div className="flex items-center gap-4">
                    <h1 className="text-4xl font-black text-yellow-500 uppercase tracking-widest drop-shadow-lg">
                        {t.ui.shop}
                    </h1>
                    <span className="px-3 py-1 bg-yellow-900/30 border border-yellow-600 rounded text-yellow-400 text-sm font-mono">
                        v4.0.4
                    </span>
                </div>

                <div className="flex items-center gap-8">
                    <div className="flex items-center gap-2 bg-gray-800 px-6 py-3 rounded-full border border-yellow-500/50 shadow-[0_0_15px_rgba(234,179,8,0.2)]">
                        <span className="text-3xl">💰</span>
                        <span className="text-2xl font-bold text-white font-mono">{gold}</span>
                    </div>

                    <button
                        onClick={onLeave}
                        className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-lg border border-gray-500 transition-all hover:scale-105"
                    >
                        {t.ui.leave}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 w-full max-w-7xl p-8 overflow-y-auto z-10 flex flex-col gap-12">

                {/* Cards Section */}
                <section>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-gray-700 pb-2">
                        <span className="text-blue-400">///</span> {t.ui.deck}
                    </h2>
                    <div className="flex flex-wrap gap-8 justify-center">
                        {cardsForSale.map((item, idx) => (
                            <div key={`shop-card-${idx}`} className="flex flex-col items-center gap-3 group">
                                <div className="transform group-hover:-translate-y-2 transition-transform duration-300">
                                    <Card card={item.card} isPlayable={false} onClick={() => { }} />
                                </div>
                                <button
                                    onClick={() => onBuyCard(item.card, item.price)}
                                    disabled={gold < item.price}
                                    className={`
                    px-6 py-2 rounded-full font-bold font-mono text-lg flex items-center gap-2 border transition-all
                    ${gold >= item.price
                                            ? 'bg-gray-800 text-yellow-400 border-yellow-600 hover:bg-yellow-900/50 hover:shadow-[0_0_15px_rgba(234,179,8,0.4)] cursor-pointer'
                                            : 'bg-gray-900 text-gray-500 border-gray-700 cursor-not-allowed'}
                  `}
                                >
                                    <span>{item.price}</span>
                                    <span className="text-xs">G</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Relics & Services Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

                    {/* Relics */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-gray-700 pb-2">
                            <span className="text-purple-400">///</span> {t.ui.relics}
                        </h2>
                        <div className="flex flex-wrap gap-6">
                            {relicsForSale.map((item, idx) => (
                                <div key={`shop-relic-${idx}`} className="flex flex-col items-center gap-3 bg-gray-800/50 p-4 rounded-xl border border-gray-700 hover:border-purple-500 transition-colors">
                                    <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center text-4xl border-2 border-purple-500/30 shadow-inner">
                                        {item.relic.icon}
                                    </div>
                                    <div className="text-center">
                                        <div className="font-bold text-white">{t.relics[item.relic.id]?.name || item.relic.name}</div>
                                        <div className="text-xs text-gray-400 max-w-[150px]">{t.relics[item.relic.id]?.description || item.relic.description}</div>
                                    </div>
                                    <button
                                        onClick={() => onBuyRelic(item.relic, item.price)}
                                        disabled={gold < item.price}
                                        className={`
                      mt-2 px-4 py-1 rounded font-bold font-mono text-sm flex items-center gap-1 border transition-all
                      ${gold >= item.price
                                                ? 'bg-gray-800 text-yellow-400 border-yellow-600 hover:bg-yellow-900/50'
                                                : 'bg-gray-900 text-gray-500 border-gray-700 cursor-not-allowed'}
                    `}
                                    >
                                        <span>{item.price}</span>
                                        <span className="text-[10px]">G</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Services */}
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 border-b border-gray-700 pb-2">
                            <span className="text-red-400">///</span> SERVICES
                        </h2>
                        <div className="flex gap-6">
                            <div className="flex flex-col items-center gap-3 bg-gray-800/50 p-6 rounded-xl border border-gray-700 hover:border-red-500 transition-colors w-full max-w-xs">
                                <div className="w-20 h-20 bg-black rounded flex items-center justify-center text-4xl border-2 border-red-500/30 text-red-500">
                                    🗑️
                                </div>
                                <div className="text-center">
                                    <div className="font-bold text-white text-xl">{t.ui.removeCard}</div>
                                    <div className="text-sm text-gray-400">Remove a card from your deck.</div>
                                </div>
                                <button
                                    onClick={() => onRemoveCard(removeCardPrice)}
                                    disabled={gold < removeCardPrice}
                                    className={`
                    mt-4 w-full py-3 rounded font-bold font-mono text-lg flex items-center justify-center gap-2 border transition-all
                    ${gold >= removeCardPrice
                                            ? 'bg-gray-800 text-yellow-400 border-yellow-600 hover:bg-yellow-900/50'
                                            : 'bg-gray-900 text-gray-500 border-gray-700 cursor-not-allowed'}
                  `}
                                >
                                    <span>{removeCardPrice}</span>
                                    <span className="text-xs">G</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
};
