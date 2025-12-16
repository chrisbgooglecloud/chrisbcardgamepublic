import React, { useState } from 'react';
import { CardData, CardCategory, CardType } from '../types';
import { useLanguage } from '../src/contexts/LanguageContext';

interface CardProps {
  card: CardData;
  onClick?: (card: CardData) => void;
  disabled?: boolean;
  canAfford?: boolean; // New prop to distinguish energy cost vs general unplayable
  onInvalidClick?: () => void;
  isHighlight?: boolean;
  isTransforming?: boolean; // Trigger modernization visuals
}

export const Card: React.FC<CardProps> = ({
  card,
  onClick,
  disabled,
  canAfford = true,
  onInvalidClick,
  isHighlight,
  isTransforming
}) => {
  const { t } = useLanguage();
  const [isShaking, setIsShaking] = useState(false);
  const isLegacy = card.category === CardCategory.LEGACY;

  // Resolve localized card data
  // Strip timestamp suffix (e.g. "card-id-123456" -> "card-id")
  const baseId = card.id.split(/-\d+/)[0];
  const localizedCard = t.cards[baseId];

  // Styles based on category
  const bgClass = isLegacy ? 'bg-legacy-card border-legacy-border' : 'bg-white border-google-blue';
  const textClass = isLegacy ? 'text-gray-800 font-serif' : 'text-gray-900 font-sans';

  // Type icon/color
  const typeColor =
    card.type === CardType.ATTACK ? (isLegacy ? 'text-[#8b0000]' : 'text-google-red') :
      card.type === CardType.SKILL ? (isLegacy ? 'text-[#2f4f4f]' : 'text-google-blue') :
        'text-google-yellow';

  // Cost Badge Color
  const costBadgeClass = !canAfford
    ? 'bg-google-red text-white'
    : (isLegacy ? 'bg-[#5c554b] text-[#dcdcdc]' : 'bg-google-blue text-white');

  const handleInteraction = () => {
    if (disabled) {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 400);
      if (onInvalidClick) onInvalidClick();
    } else if (onClick) {
      onClick(card);
    }
  };

  return (
    <div
      onClick={handleInteraction}
      className={`
        relative w-[16rem] h-[22rem] rounded-xl border-4 shadow-lg flex flex-col overflow-hidden transition-all duration-200 select-none
        ${bgClass}
        ${disabled ? 'opacity-50 grayscale cursor-not-allowed' : 'cursor-pointer hover:-translate-y-4 hover:shadow-2xl hover:z-10'}
        ${isHighlight ? 'ring-4 ring-google-yellow animate-pulse' : ''}
        ${isShaking ? 'animate-shake' : ''}
        ${isTransforming ? 'ring-4 ring-google-yellow shadow-[0_0_30px_#FBBC04] animate-dissolve z-50 scale-110' : ''}
      `}
    >
      {/* Cost Badge */}
      <div className={`absolute -top-3 -left-3 w-14 h-14 rounded-full flex items-center justify-center font-bold text-2xl z-10 shadow-md transition-colors duration-300 ${costBadgeClass}`}>
        {card.xValue ? 'X' : (card.tempCost !== undefined ? card.tempCost : card.cost)}
      </div>

      {/* Card Name */}
      <div className={`h-14 flex items-center justify-center px-3 text-center text-sm font-bold uppercase tracking-tight mt-6 ${isLegacy ? 'text-[#4a453d]' : 'text-gray-700'}`}>
        {localizedCard?.name || card.name}
      </div>

      {/* Image Placeholder or Art */}
      <div className={`h-40 mx-3 my-1 rounded border ${isLegacy ? 'bg-[#a39e93] border-[#756e63]' : 'bg-blue-50 border-blue-100'} flex items-center justify-center overflow-hidden relative`}>
        {card.imageUrl ? (
          <img src={card.imageUrl} alt={card.name} className="w-full h-full object-cover" />
        ) : (
          <>
            <div className={`absolute inset-0 opacity-20 ${typeColor}`}>
              <svg viewBox="0 0 100 100" fill="currentColor">
                {card.type === CardType.ATTACK && <path d="M10,10 L90,90 M90,10 L10,90" stroke="currentColor" strokeWidth="10" />}
                {card.type === CardType.SKILL && <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" fill="none" />}
                {card.type === CardType.POWER && <rect x="20" y="20" width="60" height="60" stroke="currentColor" strokeWidth="10" fill="none" />}
                {card.type === CardType.STATUS && <path d="M50,10 L90,90 L10,90 Z" stroke="currentColor" strokeWidth="10" fill="none" />}
                {card.type === CardType.CURSE && <path d="M20,20 Q50,50 80,20 T80,80 Q50,50 20,80 T20,20" stroke="currentColor" strokeWidth="5" fill="none" />}
              </svg>
            </div>
            <span className={`text-xs font-bold opacity-60 ${textClass}`}>{card.type}</span>
          </>
        )}
      </div>

      {/* Description */}
      <div className={`flex-1 px-3 py-2 flex flex-col items-center text-center`}>
        <p className={`text-sm leading-tight mb-2 ${textClass} font-semibold`}>
          {(() => {
            // Calculate actual values with bonuses
            const actualDamage = (card.damage || 0) + (card.bonusDamage || 0);
            const actualBlock = (card.block || 0) + (card.bonusBlock || 0);

            let description = localizedCard?.description || card.effectDescription;

            // Replace damage values if card deals damage
            if (card.damage !== undefined && actualDamage > 0) {
              // Simple heuristic: replace the base damage number with calculated damage
              // This assumes the number appears in the description
              const baseDamage = card.damage.toString();
              if (description.includes(baseDamage)) {
                description = description.replace(baseDamage, actualDamage.toString());
              }
            }

            // Replace block values if card gives block
            if (card.block !== undefined && actualBlock > 0) {
              const baseBlock = card.block.toString();
              if (description.includes(baseBlock)) {
                description = description.replace(baseBlock, actualBlock.toString());
              }
            }

            return description;
          })()}
        </p>
        <p className={`mt-auto text-sm italic opacity-70 leading-tight ${isLegacy ? 'font-serif text-[#5c554b]' : 'font-sans text-gray-500'}`}>
          {localizedCard?.flavorText || card.flavorText}
        </p>
      </div>

      {/* Footer Bar */}
      <div className={`h-3 w-full ${isLegacy ? 'bg-[#5c554b]' : 'bg-google-green'}`}></div>
    </div>
  );
};