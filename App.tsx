
import React, { useState, useEffect, useRef } from 'react';
import {
  PlayerState, EnemyState, CardData, GameState,
  CardCategory, IntentType, MAX_GEMINI_METER, MAX_HAND_SIZE,
  CardType, LogSeverity, LogSource, ClassDefinition, MapNode, MapNodeType, MapNodeStatus, EventDefinition, EventOption, Relic
} from './types';
import { LEGACY_CARDS, CLOUD_CARDS, ENEMIES, STATUS_CARDS, VERTEX_CARDS, RELICS, CLASSES, EVENTS } from './constants';
import { Card } from './components/Card';
import { GeminiMeter } from './components/GeminiMeter';
import { CombatLog } from './components/CombatLog';
import { CharacterSelect } from './components/CharacterSelect';
import { GameMap } from './components/GameMap';
import { EventModal } from './components/EventModal';
import { Shop } from './components/Shop';
import { RewardScreen } from './components/RewardScreen';
import { DamageEffect } from './components/DamageEffect';
import { generateMap } from './utils/mapGenerator';
import { generateNarrative } from './services/geminiService';
import { LanguageProvider, useLanguage } from './src/contexts/LanguageContext';

// --- Helper Functions ---
const shuffle = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

// --- Error Toast Component ---
const ErrorToast: React.FC<{ message: string, isVisible: boolean }> = ({ message, isVisible }) => {
  return (
    <div
      className={`absolute bottom-40 left-1/2 transform -translate-x-1/2 bg-red-900/90 text-white px-6 py-2 rounded-full border border-red-500 shadow-xl z-50 transition-all duration-300 pointer-events-none flex items-center gap-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
    >
      <span className="text-xl">⚠️</span>
      <span className="font-bold font-mono">{message}</span>
    </div>
  );
};

// --- Main Component ---
const GameContent: React.FC = () => {
  const { t, language, setLanguage } = useLanguage();
  // --- State ---
  const [screen, setScreen] = useState<'TITLE' | 'CHAR_SELECT' | 'MAP' | 'GAME' | 'REWARD' | 'VICTORY' | 'DEFEAT' | 'TRANSITION'>('TITLE');

  const [player, setPlayer] = useState<PlayerState>({
    hp: 50, maxHp: 50, gold: 99, energy: 3, maxEnergy: 3, block: 0,
    deck: [], hand: [], discardPile: [], exhaustPile: [], powers: [],
    classId: 'senior-engineer', relics: []
  });

  const [enemy, setEnemy] = useState<EnemyState>(ENEMIES[0]);
  const [currentEvent, setCurrentEvent] = useState<EventDefinition | null>(null);
  const [shopData, setShopData] = useState<{
    cards: { card: CardData; price: number }[];
    relics: { relic: Relic; price: number }[];
    removePrice: number;
  } | null>(null);
  const [rewardData, setRewardData] = useState<{ cards: CardData[], gold: number } | null>(null);

  const [gameState, setGameState] = useState<GameState>({
    turn: 1,
    geminiMeter: 0,
    act: 1,
    level: 1,
    isPlayerTurn: true,
    status: 'PLAYING',
    logs: [],
    cardsPlayedTurn: 0,
    relicCounters: {},
    map: [],
    currentLocation: null
  });

  const [geminiMessage, setGeminiMessage] = useState<string>("System online. Ready for migration.");

  // Modernization Animation State
  const [modernizingTarget, setModernizingTarget] = useState<{ location: 'HAND' | 'DISCARD' | 'DECK'; index: number } | null>(null);
  const [attackAnim, setAttackAnim] = useState<'PLAYER' | 'ENEMY' | null>(null);

  // Toast State
  const [errorToast, setErrorToast] = useState({ message: '', visible: false, id: 0 });

  // Intro Video State
  const [showIntroVideo, setShowIntroVideo] = useState(false);

  // Damage Effects State
  const [damageEffects, setDamageEffects] = useState<{ id: number; value: number; x: number; y: number; color: string }[]>([]);

  const showDamageEffect = (target: 'PLAYER' | 'ENEMY', amount: number, type: 'DAMAGE' | 'HEAL' | 'BLOCK' = 'DAMAGE') => {
    const id = Date.now() + Math.random();
    // Approximate positions based on UI layout
    // Player: Left 1/3 center (approx 16% width, 50% height)
    // Enemy: Right 1/3 center (approx 83% width, 50% height)
    const x = target === 'PLAYER' ? window.innerWidth * 0.16 : window.innerWidth * 0.83;
    const y = window.innerHeight * 0.4;

    const color = type === 'DAMAGE' ? 'text-red-500' : type === 'HEAL' ? 'text-green-500' : 'text-blue-500';

    setDamageEffects(prev => [...prev, { id, value: amount, x, y, color }]);
  };

  const showToast = (msg: string) => {
    setErrorToast(prev => ({ message: msg, visible: true, id: prev.id + 1 }));
    setTimeout(() => {
      setErrorToast(prev => ({ ...prev, visible: false }));
    }, 2000);
  };

  // --- Logging Helper ---
  const addLog = (severity: LogSeverity, source: LogSource, message: string) => {
    setGameState(prev => ({
      ...prev,
      logs: [
        ...prev.logs,
        {
          id: Date.now().toString() + Math.random(),
          turn: prev.turn,
          severity,
          source,
          message,
          timestamp: Date.now()
        }
      ]
    }));
  };

  // --- Logic: Playability Check ---
  const getCardPlayability = (card: CardData): { playable: boolean; reason?: string; canAfford: boolean } => {
    if (!gameState.isPlayerTurn) return { playable: false, reason: "Wait for turn", canAfford: true };

    if (card.unplayable) return { playable: false, reason: "Unplayable Card", canAfford: true };

    // Check if card is locked (Ransomware Knight)
    if (card.isLocked) return { playable: false, reason: "🔒 Card Locked", canAfford: true };

    const cost = card.tempCost !== undefined ? card.tempCost : card.cost;
    const canAfford = card.xValue ? true : player.energy >= cost;

    if (!canAfford) return { playable: false, reason: "Insufficient Compute", canAfford: false };

    if (card.requiresRetained && (card.turnsInHand || 0) < 1) return { playable: false, reason: "System warming up...", canAfford: true };

    // Boss Logic: Bottleneck
    if (enemy.id === 'bottleneck' && gameState.cardsPlayedTurn >= 3) return { playable: false, reason: "Bandwidth Throttled", canAfford: true };

    return { playable: true, canAfford: true };
  };

  // --- Draw Logic (Recycling & Hand Limit) ---
  const drawCards = (currentPlayer: PlayerState, amount: number): PlayerState => {
    // Infinite Loop - Redraw same hand
    if (gameState.relicCounters?.infiniteLoopActive && gameState.relicCounters?.loopedHand) {
      addLog('WARNING', 'SYSTEM', t.logs.infiniteLoopRedraw);
      setGameState(prev => ({
        ...prev,
        relicCounters: { ...prev.relicCounters, infiniteLoopActive: false, loopedHand: undefined }
      }));
      return {
        ...currentPlayer,
        hand: gameState.relicCounters.loopedHand
      };
    }

    const newPlayer = {
      ...currentPlayer,
      hand: [...currentPlayer.hand],
      deck: [...currentPlayer.deck],
      discardPile: [...currentPlayer.discardPile]
    };

    for (let i = 0; i < amount; i++) {
      // Check Hand Limit
      if (newPlayer.hand.length >= MAX_HAND_SIZE) {
        if (newPlayer.deck.length === 0 && newPlayer.discardPile.length > 0) {
          newPlayer.deck = shuffle(newPlayer.discardPile);
          newPlayer.discardPile = [];
          addLog('INFO', 'SYSTEM', t.logs.reshuffledDiscard);
        }
        if (newPlayer.deck.length > 0) {
          const burned = newPlayer.deck.pop();
          if (burned) {
            newPlayer.discardPile.push(burned);
            addLog('WARNING', 'SYSTEM', t.logs.handFullBurned.replace('{card}', burned.name));
          }
        }
        continue;
      }

      if (newPlayer.deck.length === 0) {
        if (newPlayer.discardPile.length === 0) {
          addLog('WARNING', 'SYSTEM', t.logs.noCardsToDraw);
          break;
        }
        newPlayer.deck = shuffle(newPlayer.discardPile);
        newPlayer.discardPile = [];
        addLog('INFO', 'SYSTEM', t.logs.reshuffledDiscard);
      }

      const card = newPlayer.deck.pop();
      if (card) {
        newPlayer.hand.push(card);
        // Legacy Code Curse
        if (card.onDrawEffect === 'discard_random') {
          addLog('ERROR', 'PLAYER', t.logs.drawnLegacyCode);
          if (newPlayer.hand.length > 1) {
            const otherCards = newPlayer.hand.filter(c => c !== card);
            if (otherCards.length > 0) {
              const target = otherCards[Math.floor(Math.random() * otherCards.length)];
              newPlayer.hand = newPlayer.hand.filter(c => c !== target);
              newPlayer.discardPile.push(target);
              addLog('WARNING', 'PLAYER', t.logs.discardedTarget.replace('{card}', target.name));
            }
          }
        }
      }
    }
    return newPlayer;
  };

  // --- Styles ---
  const getTheme = (act: number) => {
    switch (act) {
      case 2: return {
        bg: 'bg-yellow-900',
        name: 'Lift & Shift Limbo',
        overlay: 'bg-[url("/assets/backgrounds/bg_lift_shift.png")] bg-cover bg-center'
      };
      case 3: return {
        bg: 'bg-gray-100',
        name: 'The Vertex Vanguard',
        text: 'text-black',
        overlay: 'bg-[url("/assets/backgrounds/bg_vertex_utopia.png")] bg-cover bg-center'
      };
      default: return {
        bg: 'bg-[#2d2a26]',
        name: 'The Dusty Server Closet',
        overlay: 'bg-[url("/assets/backgrounds/bg_server_closet.png")] bg-cover bg-center'
      };
    }
  };
  const theme = getTheme(gameState.act);

  // --- Map & Encounter Logic ---
  const getEnemyForNode = (nodeType: MapNodeType, act: number): EnemyState => {
    const actEnemies = ENEMIES.filter(e => e.act === act);

    if (nodeType === 'BOSS') {
      const boss = actEnemies.find(e => e.isBoss);
      return boss ? { ...boss } : { ...actEnemies[0] };
    }

    let pool = actEnemies.filter(e => !e.isBoss);
    if (nodeType === 'ELITE') {
      pool = actEnemies.filter(e => e.isElite);
      if (pool.length === 0) pool = actEnemies.filter(e => !e.isBoss); // Fallback
    } else {
      pool = actEnemies.filter(e => !e.isBoss && !e.isElite);
    }

    const random = pool[Math.floor(Math.random() * pool.length)] || actEnemies[0];
    return { ...random, hp: random.maxHp, block: 0, minions: 0, strength: 0 };
  };

  const handleNodeSelect = (node: MapNode) => {
    setGameState(prev => {
      // Update Map: Mark current node as CURRENT, others unlocked later
      // We don't mark COMPLETED yet, that happens on victory
      return { ...prev, currentLocation: node.id };
    });

    if (node.type === 'BATTLE' || node.type === 'ELITE' || node.type === 'BOSS') {
      const nextEnemy = getEnemyForNode(node.type, gameState.act);
      setEnemy(nextEnemy);

      // Reset Player for Combat (Energy, Draw, Block)
      setPlayer(prev => {
        let p = { ...prev, block: 0, energy: prev.maxEnergy, hand: [], discardPile: [...prev.discardPile, ...prev.hand], powers: [] };
        // Relic: Packet Filter
        if (p.relics.some(r => r.id === 'packet-filter')) {
          p.block = 8;
          addLog('NOTICE', 'PLAYER', t.logs.packetFilterInit);
        }
        if (p.deck.length === 0) { p.deck = shuffle(p.discardPile); p.discardPile = []; }
        return drawCards(p, 5);
      });

      setGameState(prev => ({
        ...prev, turn: 1, isPlayerTurn: true, status: 'PLAYING', cardsPlayedTurn: 0
      }));

      addLog('INFO', 'SYSTEM', t.logs.encounterDetected.replace('{enemy}', nextEnemy.name));
      const narrativeContext = t.logs.encounterNarrative.replace('{enemy}', nextEnemy.name).replace('{theme}', theme.name);
      generateNarrative(narrativeContext, language).then(setGeminiMessage);
      setScreen('GAME');
    } else if (node.type === 'EVENT') {
      // Pick a random event suitable for the Act
      const actEvents = EVENTS.filter(e => !e.act || e.act === gameState.act);
      const randomEvent = actEvents[Math.floor(Math.random() * actEvents.length)];
      setCurrentEvent(randomEvent || EVENTS[0]); // Fallback
      addLog('INFO', 'SYSTEM', t.logs.eventTriggered.replace('{event}', randomEvent?.title || 'Unknown'));


      // Don't complete node yet, wait for option selection
    } else if (node.type === 'SHOP') {
      // Generate Shop Inventory
      const shopCards = [];
      for (let i = 0; i < 5; i++) {
        const pool = Math.random() > 0.7 ? VERTEX_CARDS : CLOUD_CARDS;
        const card = pool[Math.floor(Math.random() * pool.length)];
        const price = Math.floor(Math.random() * 50) + 50 + (card.category === CardCategory.VERTEX ? 50 : 0);
        shopCards.push({ card: { ...card, id: `shop-${Date.now()}-${i}` }, price });
      }

      const shopRelics = [];
      const availableRelics = Object.values(RELICS).filter(r => !player.relics.some(pr => pr.id === r.id));
      if (availableRelics.length > 0) {
        const relic = availableRelics[Math.floor(Math.random() * availableRelics.length)];
        shopRelics.push({ relic, price: 150 + Math.floor(Math.random() * 50) });
      }

      setShopData({
        cards: shopCards,
        relics: shopRelics,
        removePrice: 75
      });
      addLog('INFO', 'SYSTEM', "Connected to Vendor API.");
      // Don't complete node yet
    } else {
      // Placeholder for other node types
      addLog('INFO', 'SYSTEM', `Visited ${node.type}. (Placeholder Auto-Resolve)`);
      if (node.type === 'REST') {
        setPlayer(prev => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + 15) }));
        showToast("Repaired System (+15 HP)");
      }
      // Auto-complete non-combat/non-event/non-shop nodes for now and unlock next
      completeNode(node.id);
    }
  };

  const handleBuyCard = (card: CardData, price: number) => {
    if (player.gold >= price) {
      setPlayer(prev => ({
        ...prev,
        gold: prev.gold - price,
        deck: [...prev.deck, card]
      }));
      setShopData(prev => prev ? {
        ...prev,
        cards: prev.cards.filter(c => c.card.id !== card.id)
      } : null);
      showToast(`Purchased ${card.name}`);
      addLog('INFO', 'PLAYER', `Bought ${card.name} for ${price}G.`);
    }
  };

  const handleBuyRelic = (relic: Relic, price: number) => {
    if (player.gold >= price) {
      setPlayer(prev => ({
        ...prev,
        gold: prev.gold - price,
        relics: [...prev.relics, relic]
      }));
      setShopData(prev => prev ? {
        ...prev,
        relics: prev.relics.filter(r => r.relic.id !== relic.id)
      } : null);
      showToast(`Installed ${relic.name}`);
      addLog('INFO', 'PLAYER', `Bought ${relic.name} for ${price}G.`);
    }
  };

  const handleRemoveCard = (price: number) => {
    if (player.gold >= price) {
      // For now, just remove a random card (ideally open selection UI)
      // Simplification: Remove random Basic card if possible, else random
      setPlayer(prev => {
        const newDeck = [...prev.deck];
        const basicIdx = newDeck.findIndex(c => c.category === CardCategory.LEGACY);
        if (basicIdx !== -1) newDeck.splice(basicIdx, 1);
        else newDeck.pop();

        return { ...prev, gold: prev.gold - price, deck: newDeck };
      });
      setShopData(prev => prev ? { ...prev, removePrice: prev.removePrice + 25 } : null); // Price increase
      showToast("Card Removed");
      addLog('INFO', 'PLAYER', `Removed card for ${price}G.`);
    }
  };

  const handleLeaveShop = () => {
    setShopData(null);
    if (gameState.currentLocation) completeNode(gameState.currentLocation);
  };

  const handleEventOptionSelect = (option: EventOption) => {
    // Apply Effects
    let logMsg = `Selected: ${option.label}. `;

    // Risk Check
    if (option.risk && Math.random() < option.risk) {
      // Fail State (Hardcoded for now based on "Mysterious USB" logic or generic fail)
      // Ideally, events would have explicit success/fail outcomes in data, but for now we handle the specific risk case
      if (option.effectId === 'gamble_usb') {
        setPlayer(prev => ({ ...prev, hp: Math.max(1, prev.hp - 15) }));
        logMsg += "Risk Failed! Took 15 Damage.";
        addLog('ERROR', 'PLAYER', logMsg);
        showToast("Virus Detected! (-15 HP)");
        setCurrentEvent(null);
        if (gameState.currentLocation) completeNode(gameState.currentLocation);
        return;
      }
    }

    switch (option.effectId) {
      case 'add_curse_gain_gold':
        setPlayer(prev => ({ ...prev, hp: prev.hp, deck: [...prev.deck, { ...STATUS_CARDS['JITTERS'], id: `curse-${Date.now()}` }] })); // Placeholder curse
        // TODO: Add Gold support
        logMsg += "Gained Gold (Not Impl). Added Curse.";
        break;
      case 'lose_hp_remove_card':
        setPlayer(prev => {
          const newDeck = [...prev.deck];
          newDeck.pop(); // Simple remove last for now, ideally open removal UI
          return { ...prev, hp: Math.max(1, prev.hp - (option.value || 0)), deck: newDeck };
        });
        logMsg += `Lost ${option.value} HP. Removed card.`;
        break;
      case 'leave':
        logMsg += "Left safely.";
        break;
      case 'damage_upgrade':
        setPlayer(prev => {
          const newDeck = [...prev.deck];
          if (newDeck.length > 0) {
            const idx = Math.floor(Math.random() * newDeck.length);
            newDeck[idx].bonusDamage = (newDeck[idx].bonusDamage || 0) + 3;
            newDeck[idx].name += "+";
          }
          return { ...prev, hp: Math.max(1, prev.hp - (option.value || 0)), deck: newDeck };
        });
        logMsg += `Took ${option.value} dmg. Upgraded card.`;
        break;
      case 'remove_card':
        setPlayer(prev => {
          const newDeck = [...prev.deck];
          newDeck.pop();
          return { ...prev, deck: newDeck };
        });
        logMsg += "Removed card.";
        break;
      case 'heal':
        setPlayer(prev => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + (option.value || 0)) }));
        logMsg += `Healed ${option.value} HP.`;
        break;
      case 'lose_max_hp_gain_gold':
        setPlayer(prev => ({ ...prev, maxHp: prev.maxHp - 10, hp: Math.min(prev.hp, prev.maxHp - 10) }));
        logMsg += "Lost 10 Max HP. Gained Gold (Not Impl).";
        break;
      case 'start_elite_combat':
        // Trigger Elite Combat
        if (gameState.currentLocation) {
          const elite = getEnemyForNode('ELITE', gameState.act);
          setEnemy(elite);
          setPlayer(prev => {
            let p = { ...prev, block: 0, energy: prev.maxEnergy, hand: [], discardPile: [...prev.discardPile, ...prev.hand], powers: [] };
            if (p.deck.length === 0) { p.deck = shuffle(p.discardPile); p.discardPile = []; }
            return drawCards(p, 5);
          });
          setGameState(prev => ({ ...prev, turn: 1, isPlayerTurn: true, status: 'PLAYING', cardsPlayedTurn: 0 }));
          setScreen('GAME');
          setCurrentEvent(null);
          return; // Don't complete node yet
        }
        break;
      case 'caffeine_iv':
        setPlayer(prev => ({ ...prev, hp: Math.max(1, prev.hp - (option.value || 0)), maxEnergy: prev.maxEnergy + 1 }));
        logMsg += "Lost HP. Gained Energy (Relic Sim).";
        break;
      case 'full_heal_add_curse':
        setPlayer(prev => ({ ...prev, hp: prev.maxHp, deck: [...prev.deck, { ...STATUS_CARDS['LATENCY'], id: `curse-${Date.now()}` }] }));
        logMsg += "Full Heal. Added Latency.";
        break;
      case 'gamble_usb':
        // Success case (Risk handled above)
        const rare = CLOUD_CARDS.find(c => c.category === CardCategory.CLOUD && c.cost >= 2) || CLOUD_CARDS[0];
        setPlayer(prev => ({ ...prev, deck: [...prev.deck, { ...rare, id: `reward-${Date.now()}` }] }));
        logMsg += `Success! Got ${rare.name}.`;
        break;
      case 'remove_curse':
        setPlayer(prev => ({ ...prev, deck: prev.deck.filter(c => c.type !== CardType.CURSE && c.type !== CardType.STATUS) }));
        logMsg += "Cleaned deck.";
        break;
      case 'sacrifice_hp_cards':
        setPlayer(prev => {
          const dmg = Math.floor(prev.hp * 0.3);
          const rewards = [CLOUD_CARDS[1], CLOUD_CARDS[2]].map(c => ({ ...c, id: `reward-${Date.now()}-${Math.random()}` }));
          return { ...prev, hp: prev.hp - dmg, deck: [...prev.deck, ...rewards] };
        });
        logMsg += "Sacrificed HP for cards.";
        break;
      case 'sacrifice_gold_duplicate':
        // TODO: Gold
        setPlayer(prev => {
          const target = prev.deck[0]; // Random/First for now
          return { ...prev, deck: [...prev.deck, { ...target, id: `dupe-${Date.now()}` }] };
        });
        logMsg += "Sacrificed Gold. Duplicated card.";
        break;
      case 'heal_lose_gold':
        setPlayer(prev => ({ ...prev, hp: Math.min(prev.maxHp, prev.hp + (option.value || 0)) }));
        logMsg += "Healed. Lost Gold.";
        break;
      case 'upgrade_add_jitters':
        setPlayer(prev => {
          const newDeck = [...prev.deck];
          if (newDeck.length > 0) newDeck[0].bonusDamage = (newDeck[0].bonusDamage || 0) + 3;
          return { ...prev, deck: [...newDeck, { ...STATUS_CARDS['JITTERS'], id: `curse-${Date.now()}` }] };
        });
        logMsg += "Upgraded card. Added Jitters.";
        break;
    }

    addLog('NOTICE', 'PLAYER', logMsg);
    showToast(logMsg);
    setCurrentEvent(null);
    if (gameState.currentLocation) completeNode(gameState.currentLocation);
  };

  const completeNode = (nodeId: string) => {
    setGameState(prev => {
      // Find children of the completed node from previous state
      const currentNode = prev.map.flatMap(l => l.nodes).find(n => n.id === nodeId);
      const childrenIds = currentNode ? currentNode.next : [];

      const newMap = prev.map.map(layer => {
        // Check if this layer contains the completed node
        const layerHasTarget = layer.nodes.some(n => n.id === nodeId);

        return {
          ...layer,
          nodes: layer.nodes.map(n => {
            if (n.id === nodeId) {
              return { ...n, status: 'COMPLETED' as MapNodeStatus };
            }

            // Lock sibling nodes to enforce forward progression
            if (layerHasTarget && n.status === 'AVAILABLE') {
              return { ...n, status: 'LOCKED' as MapNodeStatus };
            }

            if (childrenIds.includes(n.id) && n.status === 'LOCKED') {
              return { ...n, status: 'AVAILABLE' as MapNodeStatus };
            }
            return n;
          })
        };
      });

      return { ...prev, map: newMap };
    });
  };

  // --- Intent System Logic ---
  const getNextIntent = (enemy: EnemyState, turn: number): { type: IntentType, value: number, desc?: string } => {
    if (enemy.id === 'dust-bunny') {
      if (turn % 2 === 0) return { type: IntentType.DEBUFF, value: 0, desc: 'Static Buildup' };
      return { type: IntentType.ATTACK, value: 6 };
    }
    if (enemy.id === 'monolith') {
      if ((enemy.minions || 0) === 0) {
        // No minions left, Monolith becomes vulnerable
        setEnemy(prev => ({ ...prev, invulnerable: false }));
        return { type: IntentType.ATTACK, value: 12 };
      } else {
        // Minions exist, maintain invulnerability
        setEnemy(prev => ({ ...prev, invulnerable: true }));
        return { type: IntentType.SUMMON, value: 0, desc: 'Compile Dependencies' };
      }
    }
    if (enemy.id === 'bottleneck') {
      if (turn % 3 === 0) return { type: IntentType.DEBUFF, value: 0, desc: 'Throttling connection...' };
      return { type: IntentType.ATTACK, value: 15 };
    }
    const roll = Math.random();
    if (roll < 0.6) return { type: IntentType.ATTACK, value: 5 + (enemy.act * 3) };
    if (roll < 0.8) return { type: IntentType.DEFEND, value: 8 + (enemy.act * 2) };
    return { type: IntentType.BUFF, value: 0, desc: 'Optimizing...' };
  };

  const goToCharSelect = () => {
    setScreen('CHAR_SELECT');
  };

  const finalizeSetup = (selectedClass: ClassDefinition) => {
    // Clone cards with unique IDs
    const starterDeck = [
      ...Array(4).fill(LEGACY_CARDS.find(c => c.id === 'percussive-maintenance')!),
      ...Array(4).fill(LEGACY_CARDS.find(c => c.id === 'duct-tape')!),
      LEGACY_CARDS.find(c => c.id === 'reboot')!,
      LEGACY_CARDS.find(c => c.id === 'coffee-break')!,
      LEGACY_CARDS.find(c => c.id === 'spaghetti-code')!,
      LEGACY_CARDS.find(c => c.id === 'hard-drive-spin')!,
    ].map((c, i) => ({ ...c, id: `${c.id}-${Date.now()}-${i}` }));

    const initialPlayer: PlayerState = {
      hp: 50, maxHp: 50, gold: 99, energy: 3, maxEnergy: 3, block: 0,
      deck: shuffle(starterDeck), hand: [], discardPile: [], exhaustPile: [], powers: [],
      classId: selectedClass.id,
      relics: [RELICS[selectedClass.relicId.replace(/-/g, '_').toUpperCase()]]
    };

    // Generate Map for Act 1
    const newMap = generateMap(1);

    setPlayer(initialPlayer);
    setGameState({
      turn: 1, geminiMeter: 0, act: 1, level: 1,
      isPlayerTurn: true, status: 'PLAYING',
      logs: [],
      cardsPlayedTurn: 0,
      relicCounters: { 'algorithm_attacks': 0 },
      map: newMap,
      currentLocation: null
    });

    addLog('INFO', 'SYSTEM', "System Initialized. Generating Network Map...");
    setScreen('MAP');
  };

  const nextEncounter = () => {
    setScreen('TRANSITION');

    setTimeout(() => {
      // Generate rewards based on enemy type
      const currentNode = gameState.map.flatMap(l => l.nodes).find(n => n.id === gameState.currentLocation);
      const isElite = currentNode?.type === 'ELITE';
      const isBoss = currentNode?.type === 'BOSS';

      // Gold reward
      const goldReward = isBoss ? 100 : isElite ? 50 : 25;
      setPlayer(prev => ({ ...prev, gold: prev.gold + goldReward }));

      // Rarity weights based on battle type
      const rarityWeights = isElite
        ? { common: 45, uncommon: 40, rare: 15 }  // Elite: 45/40/15
        : { common: 60, uncommon: 37, rare: 3 };  // Normal: 60/37/3

      // Get all valid cards (exclude Legacy and Curse categories)
      const allCards = [...LEGACY_CARDS, ...CLOUD_CARDS, ...VERTEX_CARDS]
        .filter(c => c.category !== CardCategory.LEGACY && c.type !== CardType.CURSE);

      // Helper function to select a card by rarity
      const selectCardByRarity = (excludeIds: string[]): CardData | null => {
        const roll = Math.floor(Math.random() * 100);
        let targetRarity: 'common' | 'uncommon' | 'rare';

        if (roll < rarityWeights.common) {
          targetRarity = 'common';
        } else if (roll < rarityWeights.common + rarityWeights.uncommon) {
          targetRarity = 'uncommon';
        } else {
          targetRarity = 'rare';
        }

        // Map rarity to card categories
        let pool: CardData[] = [];
        if (targetRarity === 'common') {
          pool = allCards.filter(c =>
            c.category === CardCategory.CLOUD && !excludeIds.includes(c.id)
          );
        } else if (targetRarity === 'uncommon') {
          pool = allCards.filter(c =>
            (c.category === CardCategory.CLOUD || c.category === CardCategory.VERTEX) &&
            !excludeIds.includes(c.id)
          );
        } else { // rare
          pool = allCards.filter(c =>
            c.category === CardCategory.VERTEX && !excludeIds.includes(c.id)
          );
        }

        if (pool.length === 0) {
          // Fallback to any available card if pool is empty
          pool = allCards.filter(c => !excludeIds.includes(c.id));
        }

        if (pool.length === 0) return null;
        return pool[Math.floor(Math.random() * pool.length)];
      };

      // Generate 3 unique cards
      const rewardCards: CardData[] = [];
      const usedIds: string[] = [];

      for (let i = 0; i < 3; i++) {
        const card = selectCardByRarity(usedIds);
        if (card) {
          const uniqueCard = { ...card, id: `reward-${Date.now()}-${Math.random()}` };
          rewardCards.push(uniqueCard);
          usedIds.push(card.id); // Track base card ID to prevent duplicates
        }
      }

      setRewardData({ cards: rewardCards, gold: goldReward });
      setScreen('REWARD');
    }, 1500);
  };

  const handleRewardCardSelect = (card: CardData) => {
    setPlayer(prev => ({ ...prev, deck: [...prev.deck, card] }));
    addLog('INFO', 'PLAYER', `Added ${card.name} to deck.`);
    proceedFromReward();
  };

  const handleRewardSkip = () => {
    addLog('INFO', 'PLAYER', 'Skipped card reward.');
    proceedFromReward();
  };

  const proceedFromReward = () => {
    setRewardData(null);

    // Mark current combat as complete
    if (gameState.currentLocation) {
      completeNode(gameState.currentLocation);
    }

    // Check if Act is done (Boss Defeated)
    const currentNode = gameState.map.flatMap(l => l.nodes).find(n => n.id === gameState.currentLocation);
    if (currentNode?.type === 'BOSS') {
      let nextAct = gameState.act + 1;
      if (nextAct > 3) {
        setScreen('VICTORY');
        return;
      }
      const nextMap = generateMap(nextAct);
      setGameState(prev => ({
        ...prev, act: nextAct, map: nextMap, currentLocation: null
      }));
      addLog('INFO', 'SYSTEM', `Act ${nextAct} Initiated. New Map Generated.`);
    }

    setScreen('MAP');
  };

  const playCard = async (card: CardData, index: number) => {
    if (gameState.status === 'MODERNIZING') return; // Prevent playing while animating

    const playCheck = getCardPlayability(card);
    if (!playCheck.playable) {
      showToast(playCheck.reason || "Unplayable");
      return;
    }

    // Calculate cost (handling X cost, temp cost, etc.)
    const costToPay = card.tempCost !== undefined ? card.tempCost : (card.xValue ? player.energy : card.cost);

    // DEEP COPY STATE to ensure mutation doesn't break React updates
    let newPlayer = {
      ...player,
      hand: [...player.hand],
      deck: [...player.deck],
      discardPile: [...player.discardPile],
      exhaustPile: [...player.exhaustPile],
      powers: [...player.powers]
    };

    // DEDUCT ENERGY (Ensuring it doesn't go below 0)
    newPlayer.energy = Math.max(0, newPlayer.energy - costToPay);
    newPlayer.hand.splice(index, 1);

    addLog('INFO', 'PLAYER', t.logs.nubusPlays.replace('{card}', card.name));

    let damageDealt = 0;
    let baseDmg = (card.damage || 0) + (card.bonusDamage || 0);
    let calcDmg = baseDmg;

    // Relic: The Algorithm (Double damage on 3rd attack)
    if (card.type === CardType.ATTACK && player.relics.some(r => r.id === 'the-algorithm')) {
      const currentCount = (gameState.relicCounters['algorithm_attacks'] || 0) + 1;
      if (currentCount % 3 === 0) {
        calcDmg *= 2;
        addLog('NOTICE', 'PLAYER', t.logs.algorithmOptimized);
      }
      setGameState(prev => ({ ...prev, relicCounters: { ...prev.relicCounters, 'algorithm_attacks': currentCount } }));
    }

    if (card.variableDamage) calcDmg = Math.floor(Math.random() * 5) + 4 + (card.bonusDamage || 0);
    if (card.id.startsWith('bigquery-blast')) calcDmg += (newPlayer.discardPile.length * 5);
    if (card.xValue) calcDmg = costToPay * 10;

    if (calcDmg > 0) {
      // Track last player damage (for Deep Fake mimicry)
      setGameState(prev => ({
        ...prev,
        relicCounters: { ...prev.relicCounters, lastPlayerDamage: calcDmg }
      }));

      // Check invulnerability (Monolith)
      if (enemy.invulnerable) {
        addLog('WARNING', 'ENEMY', t.logs.invulnerable.replace('{enemy}', enemy.name));
        // Still handle Monolith minion destruction
        if (enemy.id === 'monolith' && (enemy.minions || 0) > 0) {
          setEnemy(prev => ({ ...prev, minions: Math.max(0, (prev.minions || 0) - 1) }));
          addLog('NOTICE', 'SYSTEM', t.logs.dependencyRemoved);
        }
      } else if (enemy.id === 'monolith' && (enemy.minions || 0) > 0) {
        addLog('WARNING', 'ENEMY', t.logs.attackBlocked);
        setEnemy(prev => ({ ...prev, minions: Math.max(0, (prev.minions || 0) - 1) }));
        addLog('NOTICE', 'SYSTEM', t.logs.dependencyRemoved);
      } else {
        // Check dodge
        if (enemy.dodge && Math.random() < enemy.dodge && !card.unblockable) {
          addLog('WARNING', 'ENEMY', t.logs.missDodged.replace('{enemy}', enemy.name));
        } else {
          if (card.unblockable) damageDealt = calcDmg;
          else damageDealt = Math.max(0, calcDmg - enemy.block);

          setEnemy(prev => {
            const newBlock = card.unblockable ? prev.block : Math.max(0, prev.block - calcDmg);
            const newHp = Math.max(0, prev.hp - damageDealt);
            // Track if this was an exact kill (for Zombie Process revival)
            const wasExactKill = prev.hp === damageDealt;
            return { ...prev, hp: newHp, block: newBlock, statusEffects: { ...prev.statusEffects, wasExactKill } };
          });
          addLog('NOTICE', 'SYSTEM', t.logs.dealtDamage.replace('{amount}', calcDmg.toString()));
          if (calcDmg > 0) showDamageEffect('ENEMY', calcDmg, 'DAMAGE');

          // Trigger Player Attack Animation
          if (card.type === CardType.ATTACK) {
            setAttackAnim('PLAYER');
            setTimeout(() => setAttackAnim(null), 500);
          }

          // Thorns damage reflection
          if (enemy.thorns && damageDealt > 0) {
            newPlayer.hp = Math.max(0, newPlayer.hp - enemy.thorns);
            addLog('ERROR', 'ENEMY', t.logs.thornsDamage.replace('{amount}', enemy.thorns.toString()));
            showDamageEffect('PLAYER', enemy.thorns, 'DAMAGE');
          }
        }
      }
    }

    let calcBlock = (card.block || 0) + (card.bonusBlock || 0);
    if (card.xValue) calcBlock = costToPay * 5;
    if (calcBlock > 0) {
      newPlayer.block += calcBlock;
      addLog('NOTICE', 'PLAYER', t.logs.gainsBlock.replace('{amount}', calcBlock.toString()));
    }

    if (card.reflect) {
      newPlayer.powers.push({ id: 'reflect', name: 'Cloud Armor', description: 'Reflect damage', value: card.reflect });
      addLog('NOTICE', 'PLAYER', t.logs.reflectsDamage.replace('{amount}', card.reflect.toString()));
    }

    let drawCount = card.draw || 0;
    if (card.xValue) drawCount = Math.floor(costToPay / 2);
    if (drawCount > 0) {
      newPlayer = drawCards(newPlayer, drawCount);
      addLog('INFO', 'PLAYER', t.logs.drawsCards.replace('{count}', drawCount.toString()));
    }

    if (card.scry) {
      newPlayer = drawCards(newPlayer, card.scry);
      let discarded = 0;
      while (newPlayer.hand.length > 0 && discarded < 2) {
        const rndIdx = Math.floor(Math.random() * newPlayer.hand.length);
        newPlayer.discardPile.push(newPlayer.hand[rndIdx]);
        newPlayer.hand.splice(rndIdx, 1);
        discarded++;
      }
      addLog('INFO', 'PLAYER', t.logs.analyzedData);
    }

    if (card.heal) {
      // Check for fake healing cards (Hallucination)
      if (card.isFake) {
        const fakeDamage = card.heal;
        newPlayer.hp = Math.max(0, newPlayer.hp - fakeDamage);
        addLog('ERROR', 'ENEMY', t.logs.fakeCard.replace('{damage}', fakeDamage.toString()));
      } else {
        newPlayer.hp = Math.min(newPlayer.maxHp, newPlayer.hp + card.heal);
        addLog('NOTICE', 'PLAYER', t.logs.heals.replace('{amount}', card.heal.toString()));
      }
    }

    if (card.cleanse) {
      const initialCount = newPlayer.hand.length;
      newPlayer.exhaustPile.push(...newPlayer.hand.filter(c => c.type === CardType.STATUS));
      newPlayer.hand = newPlayer.hand.filter(c => c.type !== CardType.STATUS);
      if (newPlayer.hand.length < initialCount) addLog('NOTICE', 'PLAYER', t.logs.revokedStatus);
    }

    if (card.upgradeHand) {
      newPlayer.hand = newPlayer.hand.map(c => ({
        ...c, name: `${c.name}+`, bonusDamage: (c.bonusDamage || 0) + 3, bonusBlock: (c.bonusBlock || 0) + 3
      }));
      addLog('NOTICE', 'PLAYER', t.logs.handOptimized);
    }

    if (card.playFromDiscard && newPlayer.discardPile.length > 0) {
      const rndIdx = Math.floor(Math.random() * newPlayer.discardPile.length);
      const rndCard = { ...newPlayer.discardPile[rndIdx], tempCost: 0 };
      newPlayer.discardPile.splice(rndIdx, 1);
      newPlayer.hand.push(rndCard);
      addLog('INFO', 'PLAYER', t.logs.deployedFromArchives.replace('{card}', rndCard.name));
    }

    if (card.discardHand) {
      newPlayer.discardPile.push(...newPlayer.hand);
      newPlayer.hand = [];
      addLog('WARNING', 'PLAYER', t.logs.discardedHand);
    }

    if (card.addStatus) {
      const statusCard = { ...STATUS_CARDS[card.addStatus], id: `status-${Date.now()}` };
      if (statusCard) {
        newPlayer.discardPile.push(statusCard);
        addLog('WARNING', 'SYSTEM', t.logs.addedToDiscard.replace('{card}', statusCard.name));
      }
    }

    if (card.isPower && card.powerId) {
      newPlayer.powers.push({ id: card.powerId, name: card.name, description: card.effectDescription });
      addLog('NOTICE', 'PLAYER', t.logs.powerActive);
      const opsSuite = newPlayer.powers.find(p => p.id === 'ops_suite');
      if (opsSuite) {
        newPlayer.hp = Math.min(newPlayer.maxHp, newPlayer.hp + 2);
        addLog('NOTICE', 'PLAYER', t.logs.opsSuite);
      }
    }

    if (card.id.startsWith('the-prompt')) {
      const randomCloud = CLOUD_CARDS[Math.floor(Math.random() * CLOUD_CARDS.length)];
      const freeCard = { ...randomCloud, cost: 0, tempCost: 0, id: `prompt-${Date.now()}` };
      newPlayer.hand.push(freeCard);
      addLog('INFO', 'GEMINI', t.logs.generatedCard.replace('{card}', freeCard.name));
    }

    if (card.cancelIntent) {
      setEnemy(prev => ({ ...prev, intent: IntentType.DEBUFF, intentValue: 0, description: 'Stunned (Rate Limited)' }));
      addLog('NOTICE', 'PLAYER', t.logs.intentCancelled);
    }

    if (card.exhaust) {
      newPlayer.exhaustPile.push(card);
    } else {
      newPlayer.discardPile.push(card);
    }

    setPlayer(newPlayer);

    setGameState(prev => ({
      ...prev,
      cardsPlayedTurn: prev.cardsPlayedTurn + 1,
      geminiMeter: prev.geminiMeter < MAX_GEMINI_METER ? prev.geminiMeter + 1 : prev.geminiMeter,
      // Track card types for Overfit
      relicCounters: {
        ...prev.relicCounters,
        cardsPlayedThisTurn: [...(prev.relicCounters?.cardsPlayedThisTurn || []), card.type]
      }
    }));

    if (gameState.geminiMeter + 1 >= MAX_GEMINI_METER) {
      triggerModernization(newPlayer);
    }

    if (card.id.startsWith('reboot')) {
      endTurnLogic(newPlayer);
    }
  };

  const triggerModernization = (currentPlayerState: PlayerState) => {
    setGameState(prev => ({ ...prev, status: 'MODERNIZING' }));
    addLog('NOTICE', 'GEMINI', t.logs.modernizationProtocol);
    setGeminiMessage(t.ui.refactoring);

    // 1. Identify Target
    let targetIndex = -1;
    let location: 'HAND' | 'DECK' | 'DISCARD' = 'HAND';
    const legacyInHand = currentPlayerState.hand.map((c, i) => c.category === CardCategory.LEGACY ? i : -1).filter(i => i !== -1);

    if (legacyInHand.length > 0) {
      targetIndex = legacyInHand[Math.floor(Math.random() * legacyInHand.length)];
      location = 'HAND';
    } else {
      location = 'DECK';
    }

    // 2. Start Animation (Target Acquired)
    if (location === 'HAND') {
      setModernizingTarget({ index: targetIndex, location: 'HAND' });
    } else {
      setModernizingTarget({ index: -1, location: 'DECK' });
    }

    // 3. Delay for Animation, then Swap
    setTimeout(() => {
      let newPlayer = { ...currentPlayerState };

      // Fallback re-check logic
      const handIndices = newPlayer.hand.map((c, i) => c.category === CardCategory.LEGACY ? i : -1).filter(i => i !== -1);
      const deckIndex = newPlayer.deck.findIndex(c => c.category === CardCategory.LEGACY);
      const discardIndex = newPlayer.discardPile.findIndex(c => c.category === CardCategory.LEGACY);

      if (handIndices.length > 0 || deckIndex !== -1 || discardIndex !== -1) {
        const pool = Math.random() > 0.9 ? VERTEX_CARDS : CLOUD_CARDS;
        const randomNewCard = pool[Math.floor(Math.random() * pool.length)];
        const newCard = { ...randomNewCard, id: `${randomNewCard.id}-${Date.now()}`, tempCost: 0 };

        if (handIndices.length > 0) {
          // Use the target we picked if valid, otherwise pick random
          const actualTarget = handIndices.includes(targetIndex) ? targetIndex : handIndices[0];
          const oldCard = newPlayer.hand[actualTarget];
          newPlayer.hand[actualTarget] = newCard;
          addLog('INFO', 'GEMINI', t.logs.refactoredHand.replace('{old}', oldCard.name).replace('{new}', newCard.name));
        } else if (deckIndex !== -1) {
          const oldCard = newPlayer.deck[deckIndex];
          newPlayer.deck.splice(deckIndex, 1);
          newPlayer.hand.push(newCard);
          addLog('INFO', 'GEMINI', t.logs.refactoredDeck.replace('{old}', oldCard.name).replace('{new}', newCard.name));
        } else if (discardIndex !== -1) {
          const oldCard = newPlayer.discardPile[discardIndex];
          newPlayer.discardPile.splice(discardIndex, 1);
          newPlayer.hand.push(newCard);
          addLog('INFO', 'GEMINI', t.logs.refactoredDiscard.replace('{old}', oldCard.name).replace('{new}', newCard.name));
        }
      } else {
        newPlayer.hp = Math.min(newPlayer.maxHp, newPlayer.hp + 5);
        addLog('NOTICE', 'GEMINI', t.logs.systemOverclock);
      }

      setPlayer(newPlayer);
      setGameState(prev => ({ ...prev, geminiMeter: 0, status: 'PLAYING' }));
      setModernizingTarget(null);
      setGeminiMessage(t.ui.migrationComplete);

    }, 800); // Animation duration
  };

  const endTurn = () => {
    if (!gameState.isPlayerTurn) return;
    endTurnLogic(player);
  };

  const endTurnLogic = (currentPlayer: PlayerState) => {
    setGameState(prev => ({ ...prev, isPlayerTurn: false }));
    addLog('INFO', 'SYSTEM', t.logs.endOfTurn);
    let damageTaken = 0;
    const retainCards: CardData[] = [];
    const discardCards: CardData[] = [];
    const exhaustCards: CardData[] = [];

    currentPlayer.hand.forEach(c => {
      if (c.ethereal) { exhaustCards.push(c); return; }
      if (c.id.startsWith('jitters')) damageTaken += 1;
      // Unlock cards at end of turn!
      const cardWithAge = { ...c, turnsInHand: (c.turnsInHand || 0) + 1, tempCost: undefined, isLocked: false };
      if (c.retain || (c.requiresRetained && (c.turnsInHand || 0) >= 0)) {
        if (c.retain || c.requiresRetained) retainCards.push(cardWithAge);
        else discardCards.push(cardWithAge);
      } else {
        discardCards.push(cardWithAge);
      }
    });

    // Power: GKE Swarm
    let turretDmg = 0;
    currentPlayer.powers.filter(p => p.id === 'gke_turret').forEach(() => turretDmg += 5);
    if (turretDmg > 0) {
      setEnemy(prev => ({ ...prev, hp: Math.max(0, prev.hp - turretDmg) }));
      addLog('NOTICE', 'PLAYER', `GKE Swarm deals ${turretDmg} damage.`);
      showDamageEffect('ENEMY', turretDmg, 'DAMAGE');
    }

    // Relic: Hotfix Script (Senior Engineer)
    if (currentPlayer.relics.some(r => r.id === 'hotfix-script')) {
      setEnemy(prev => ({ ...prev, hp: Math.max(0, prev.hp - 2) }));
      addLog('NOTICE', 'PLAYER', t.logs.hotfixApplied);
      showDamageEffect('ENEMY', 2, 'DAMAGE');
    }

    if (damageTaken > 0) {
      addLog('ERROR', 'PLAYER', `Jitters dealt ${damageTaken} damage.`);
      showDamageEffect('PLAYER', damageTaken, 'DAMAGE');
    }

    let nextPlayer = {
      ...currentPlayer, hand: retainCards, discardPile: [...currentPlayer.discardPile, ...discardCards],
      exhaustPile: [...currentPlayer.exhaustPile, ...exhaustCards], block: 0, hp: Math.max(0, currentPlayer.hp - damageTaken)
    };

    setPlayer(nextPlayer);
    setTimeout(resolveEnemyTurn, 1000);
  };

  const resolveEnemyTurn = () => {
    // Check for zombie revival BEFORE early return
    if (enemy.hp <= 0 && enemy.reviveHp && enemy.statusEffects?.wasExactKill) {
      setEnemy(prev => ({ ...prev, hp: enemy.reviveHp, statusEffects: { ...prev.statusEffects, wasExactKill: false } }));
      addLog('CRITICAL', 'ENEMY', `🧟 ${enemy.name} revived with ${enemy.reviveHp} HP!`);
      // Continue with turn as normal
    } else if (enemy.hp <= 0) {
      return;
    }

    if (enemy.id === 'singularity' && gameState.turn >= 10) {
      setEnemy(prev => ({ ...prev, hp: 0 }));
      addLog('CRITICAL', 'SYSTEM', t.logs.launchDeadline);
      return;
    }

    // Singularity - Strip Cloud cards on turns 4 and 7
    if (enemy.id === 'singularity' && (gameState.turn === 4 || gameState.turn === 7)) {
      setPlayer(prev => {
        const cloudCards = prev.deck.filter(c => c.category === CardCategory.CLOUD);
        if (cloudCards.length > 0) {
          const toRemove = cloudCards[Math.floor(Math.random() * cloudCards.length)];
          addLog('CRITICAL', 'ENEMY', t.logs.singularityConsumed.replace('{card}', toRemove.name));
          return { ...prev, deck: prev.deck.filter(c => c.id !== toRemove.id) };
        }
        return prev;
      });
    }
    let logMsg = `${enemy.name} acts! `;
    switch (enemy.intent) {
      case IntentType.ATTACK: {
        // Trigger Enemy Attack Animation
        setAttackAnim('ENEMY');
        setTimeout(() => setAttackAnim(null), 500);

        let dmg = enemy.intentValue + (enemy.strength || 0);

        // Race Condition - Punish fast play (4+ cards)
        if (enemy.id === 'race-condition' && gameState.cardsPlayedTurn >= 4) {
          dmg += 10;
          addLog('ERROR', 'ENEMY', t.logs.raceCondition);
        }

        // Deep Fake - Mimic last player damage
        if (enemy.mimicDamage && gameState.relicCounters?.lastPlayerDamage) {
          dmg = gameState.relicCounters.lastPlayerDamage;
          addLog('ERROR', 'ENEMY', t.logs.deepFakeMimic.replace('{amount}', dmg.toString()));
        }

        let actualDmg = Math.max(0, dmg - player.block);
        const reflectors = player.powers.filter(p => p.id === 'reflect');
        let reflected = 0;
        reflectors.forEach(p => reflected += (p.value || 0));
        if (reflected > 0) {
          setEnemy(prev => ({ ...prev, hp: Math.max(0, prev.hp - reflected) }));
          logMsg += `(Reflected ${reflected}) `;
          showDamageEffect('ENEMY', reflected, 'DAMAGE');
        }
        let finalHp = Math.max(0, player.hp - actualDmg);
        if (finalHp === 0 && player.powers.some(p => p.id === 'spanner_shield')) {
          finalHp = 10;
          setPlayer(prev => ({ ...prev, powers: prev.powers.filter(p => p.id !== 'spanner_shield') }));
          addLog('CRITICAL', 'PLAYER', t.logs.spannerShield);
          showDamageEffect('PLAYER', 0, 'BLOCK'); // Visual cue for save
        }
        setPlayer(prev => ({ ...prev, hp: finalHp, powers: prev.powers.filter(p => p.id !== 'reflect') }));
        logMsg += `Attacks for ${dmg}.`;
        addLog('WARNING', 'ENEMY', logMsg);
        if (actualDmg > 0) {
          addLog('ERROR', 'PLAYER', t.logs.integrityBreach.replace('{amount}', actualDmg.toString()));
          showDamageEffect('PLAYER', actualDmg, 'DAMAGE');
        }
        else {
          addLog('INFO', 'PLAYER', t.logs.damageBlocked);
          showDamageEffect('PLAYER', 0, 'BLOCK');
        }
        break;
      }
      case IntentType.DEFEND: {
        setEnemy(prev => ({ ...prev, block: prev.block + enemy.intentValue }));
        addLog('WARNING', 'ENEMY', t.logs.enemyGainsBlock.replace('{amount}', enemy.intentValue.toString()));
        break;
      }
      case IntentType.SUMMON: {
        setEnemy(prev => ({ ...prev, minions: (prev.minions || 0) + 2 }));
        addLog('WARNING', 'ENEMY', t.logs.enemySummons);
        break;
      }
      case IntentType.DEBUFF: {
        // Spaghetti Monster - Deck Clogging
        if (enemy.id === 'spaghetti-monster') {
          const junkCount = Math.floor(Math.random() * 2) + 2; // 2-3 junk cards
          setPlayer(prev => {
            const junkCards = Array(junkCount).fill(null).map(() => ({
              ...STATUS_CARDS.LEGACY_CODE,
              id: `legacy-code-${Date.now()}-${Math.random()}`
            }));
            return { ...prev, deck: [...prev.deck, ...junkCards] };
          });
          addLog('WARNING', 'ENEMY', t.logs.spaghettiTangled.replace('{count}', junkCount.toString()));
        }
        // Packet Loss - Force Discard
        else if (enemy.id === 'packet-loss') {
          const discardCount = 2;
          setPlayer(prev => {
            const newHand = [...prev.hand];
            const newDiscard = [...prev.discardPile];
            const toDiscard = Math.min(discardCount, newHand.length);
            for (let i = 0; i < toDiscard; i++) {
              const rndIdx = Math.floor(Math.random() * newHand.length);
              newDiscard.push(newHand[rndIdx]);
              newHand.splice(rndIdx, 1);
            }
            return { ...prev, hand: newHand, discardPile: newDiscard };
          });
          addLog('WARNING', 'ENEMY', t.logs.packetLoss.replace('{count}', Math.min(discardCount, player.hand.length).toString()));
        }
        // SQL Injector - Status Corruption
        else if (enemy.id === 'sql-injector') {
          const statusCount = Math.floor(Math.random() * 2) + 1; // 1-2 status cards
          setPlayer(prev => {
            const corruptCards = Array(statusCount).fill(null).map(() => ({
              ...STATUS_CARDS.MEMORY_LEAK,
              id: `corrupt-${Date.now()}-${Math.random()}`
            }));
            return { ...prev, deck: [...prev.deck, ...corruptCards] };
          });
          addLog('WARNING', 'ENEMY', t.logs.sqlInjection.replace('{count}', statusCount.toString()));
        }
        // Ransomware Knight - Card Locking  
        else if (enemy.id === 'ransomware-knight' && enemy.cardLockCount) {
          setPlayer(prev => {
            const newHand = prev.hand.map((card, idx) => {
              if (idx < Math.min(enemy.cardLockCount!, prev.hand.length)) {
                return { ...card, isLocked: true };
              }
              return card;
            });
            return { ...prev, hand: newHand };
          });
          addLog('WARNING', 'ENEMY', t.logs.ransomware.replace('{count}', Math.min(enemy.cardLockCount, player.hand.length).toString()));
        }
        // Hallucination - Shuffle Fake Healing Cards
        else if (enemy.id === 'hallucination') {
          const fakeCount = Math.floor(Math.random() * 2) + 1; // 1-2 fake cards
          setPlayer(prev => {
            const fakeCards = Array(fakeCount).fill(null).map(() => ({
              id: `fake-heal-${Date.now()}-${Math.random()}`,
              name: '✨ Cloud Healing',
              category: CardCategory.CLOUD,
              cost: 1,
              type: CardType.SKILL,
              description: 'Heal 10 HP',
              heal: 10,
              isFake: true // This will damage instead!
            }));
            return { ...prev, deck: [...prev.deck, ...fakeCards] };
          });
          addLog('WARNING', 'ENEMY', t.logs.hallucinationShuffled.replace('{count}', fakeCount.toString()));
        }
        // Infinite Loop - Force Redraw Same Hand
        else if (enemy.id === 'infinite-loop') {
          // Store current hand for next turn
          setGameState(prev => ({
            ...prev,
            relicCounters: { ...prev.relicCounters, infiniteLoopActive: true, loopedHand: [...player.hand] }
          }));
          addLog('WARNING', 'ENEMY', t.logs.infiniteLoop);
        }
        else {
          addLog('WARNING', 'ENEMY', t.logs.usesDescription.replace('{description}', enemy.description));
        }
        break;
      }
      case IntentType.UNKNOWN: { addLog('WARNING', 'ENEMY', t.logs.blackBoxHums); break; }
    }

    const burn = enemy.burnEnergy || 0;
    if (burn > 0) addLog('WARNING', 'SYSTEM', t.logs.heatBuildsUp.replace('{amount}', burn.toString()));

    // Overfit - Track card types played and gain strength if repetition detected
    if (enemy.id === 'overfit') {
      const cardTypesPlayed: Partial<Record<CardType, number>> = {};
      gameState.relicCounters?.cardsPlayedThisTurn?.forEach((type: CardType) => {
        cardTypesPlayed[type] = (cardTypesPlayed[type] || 0) + 1;
      });

      const maxRepeats = Math.max(...Object.values(cardTypesPlayed), 0);
      if (maxRepeats >= 3) {
        setEnemy(prev => ({ ...prev, strength: (prev.strength || 0) + 2 }));
        addLog('WARNING', 'ENEMY', t.logs.overfitDetected);
      }

      // Clear tracking for next turn
      setGameState(prev => ({
        ...prev,
        relicCounters: { ...prev.relicCounters, cardsPlayedThisTurn: [] }
      }));
    }

    const nextIntentData = getNextIntent(enemy, gameState.turn + 1);
    setEnemy(prev => ({ ...prev, intent: nextIntentData.type, intentValue: nextIntentData.value, block: 0 }));

    setTimeout(() => {
      setGameState(prev => ({ ...prev, turn: prev.turn + 1, isPlayerTurn: true, cardsPlayedTurn: 0 }));
      setPlayer(prev => {
        const drawBonus = prev.powers.filter(p => p.id === 'dataflow').length;
        const activeMaxEnergy = prev.maxEnergy - prev.hand.filter(c => c.passiveEffect === 'reduce_max_energy').length;
        const startEnergy = Math.max(1, activeMaxEnergy - burn);
        let p = { ...prev, energy: startEnergy, block: 0 };
        return drawCards(p, 5 + drawBonus);
      });
      addLog('INFO', 'SYSTEM', t.logs.turnStart.replace('{turn}', (gameState.turn + 1).toString()));
    }, 1000);
  };

  useEffect(() => {
    const energyCurseCount = player.hand.filter(c => c.passiveEffect === 'reduce_max_energy').length;
    const effectiveMax = Math.max(0, player.maxEnergy - energyCurseCount);
    if (player.energy > effectiveMax && gameState.isPlayerTurn) {
      setPlayer(prev => ({ ...prev, energy: effectiveMax }));
    }
  }, [player.hand.length, player.maxEnergy]);


  useEffect(() => {
    if (screen === 'TITLE' || screen === 'VICTORY' || screen === 'DEFEAT' || screen === 'TRANSITION' || screen === 'CHAR_SELECT' || screen === 'MAP' || screen === 'REWARD') return;
    if (player.hp <= 0) setScreen('DEFEAT');
    if (enemy.hp <= 0) nextEncounter();
  }, [player.hp, enemy.hp, screen]);

  if (screen === 'TITLE') {
    return (
      <div className="h-screen w-full bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden text-white font-sans">
        <div className="absolute inset-0 bg-[url('/assets/backgrounds/title_screen_background.png')] bg-cover bg-center"></div>
        {/* Overlay to ensure text readability if needed, or just rely on the image */}
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Language Selector */}
        <div className="absolute top-4 right-4 z-20">
          <div className="relative group">
            <button className="flex items-center space-x-2 bg-black/50 hover:bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm transition-all border border-white/10">
              <span>🌐</span>
              <span className="uppercase font-bold text-sm">{language === 'en' ? 'English' : language === 'es' ? 'Español' : '日本語'}</span>
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-gray-700 rounded-lg shadow-xl overflow-hidden hidden group-hover:block">
              <button onClick={() => setLanguage('en')} className="w-full text-left px-4 py-3 hover:bg-gray-800 text-sm font-bold text-gray-300 hover:text-white transition-colors border-b border-gray-800">English</button>
              <button onClick={() => setLanguage('es')} className="w-full text-left px-4 py-3 hover:bg-gray-800 text-sm font-bold text-gray-300 hover:text-white transition-colors border-b border-gray-800">Español</button>
              <button onClick={() => setLanguage('ja')} className="w-full text-left px-4 py-3 hover:bg-gray-800 text-sm font-bold text-gray-300 hover:text-white transition-colors">日本語</button>
            </div>
          </div>
        </div>

        <h1 className="text-8xl font-black tracking-tighter mb-6 z-10 drop-shadow-2xl">
          <span>
            <span className="text-[#4285F4]">S</span>
            <span className="text-[#EA4335]">Y</span>
            <span className="text-[#FBBC04]">S</span>
            <span className="text-[#34A853]">T</span>
            <span className="text-[#4285F4]">E</span>
            <span className="text-[#EA4335]">M</span>
          </span>: <span className="text-white">ASCENSION</span>
        </h1>
        <p className="text-3xl text-gray-200 mb-12 z-10 font-light drop-shadow-md">{t.ui.subtitle}</p>
        <button
          onClick={goToCharSelect}
          className="group relative px-8 py-4 bg-google-blue text-white text-xl font-bold rounded-full shadow-[0_0_20px_rgba(66,133,244,0.5)] hover:shadow-[0_0_40px_rgba(66,133,244,0.8)] transition-all hover:-translate-y-1 z-10"
        >
          <span className="relative z-10">{t.ui.startButton}</span>
        </button>

        <button
          onClick={() => setShowIntroVideo(true)}
          className="group relative mt-4 px-6 py-3 bg-red-600 text-white text-lg font-bold rounded-full shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:shadow-[0_0_40px_rgba(220,38,38,0.8)] transition-all hover:-translate-y-1 z-10"
        >
          <span className="relative z-10">{t.ui.introVideo}</span>
        </button>

        {/* Video Overlay */}
        {showIntroVideo && (
          <div className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center">
            <video
              src="/assets/introvideo_cloud_deckbuilder.mp4"
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
            <button
              onClick={() => setShowIntroVideo(false)}
              className="absolute top-8 right-8 bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-red-700 transition-colors z-50"
            >
              {t.ui.closeVideo}
            </button>
          </div>
        )}

        <img
          src="/assets/cloudlogo.png"
          alt="Google Cloud"
          className="absolute bottom-8 left-8 w-48 z-10 opacity-90 hover:opacity-100 transition-opacity"
        />
      </div>
    );
  }

  if (screen === 'CHAR_SELECT') {
    return <CharacterSelect onSelect={finalizeSetup} />;
  }

  if (screen === 'MAP') {
    return (
      <>
        <GameMap
          map={gameState.map}
          onNodeSelect={handleNodeSelect}
          act={gameState.act}
          currentLocation={gameState.currentLocation}
        />
        {currentEvent && (
          <EventModal
            event={currentEvent}
            onOptionSelect={handleEventOptionSelect}
          />
        )}
        {shopData && (
          <Shop
            gold={player.gold}
            cardsForSale={shopData.cards}
            relicsForSale={shopData.relics}
            onBuyCard={handleBuyCard}
            onBuyRelic={handleBuyRelic}
            onRemoveCard={handleRemoveCard}
            onLeave={handleLeaveShop}
            removeCardPrice={shopData.removePrice}
          />
        )}
      </>
    );
  }

  if (screen === 'REWARD' && rewardData) {
    return (
      <RewardScreen
        rewardCards={rewardData.cards}
        goldReward={rewardData.gold}
        onCardSelect={handleRewardCardSelect}
        onSkip={handleRewardSkip}
      />
    );
  }

  if (screen === 'TRANSITION') {
    return (
      <div className="h-screen w-full bg-gray-900 flex flex-col items-center justify-center text-white animate-pulse">
        <h2 className="text-4xl font-mono text-google-yellow mb-4">{t.ui.migrating}</h2>
        <div className="w-64 h-2 bg-gray-700 rounded">
          <div className="h-full bg-google-blue animate-[width_2s_ease-in-out]"></div>
        </div>
      </div>
    );
  }

  if (screen === 'VICTORY' || screen === 'DEFEAT') {
    return (
      <div className="h-screen w-full bg-gray-900 flex flex-col items-center justify-center text-white">
        <h1 className={`text-6xl font-bold mb-4 ${screen === 'VICTORY' ? 'text-google-green' : 'text-google-red'}`}>
          {screen === 'VICTORY' ? t.ui.migrationSuccess : t.ui.systemCrash}
        </h1>
        <p className="mb-8 text-xl text-gray-300">
          {screen === 'VICTORY' ? t.ui.victoryMessage : `${t.ui.defeatMessage} ${gameState.act}`}
        </p>
        <button onClick={() => setScreen('TITLE')} className="px-6 py-3 border border-white rounded hover:bg-white hover:text-black transition">
          {t.ui.returnToRoot}
        </button>
      </div>
    );
  }

  return (
    <div className={`h-screen w-full ${theme.bg} flex flex-col relative overflow-hidden transition-colors duration-1000`}>
      <div className="h-16 bg-black/80 border-b border-gray-700 flex items-center px-4 justify-between z-20 shadow-lg backdrop-blur-md text-white">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-bold tracking-widest uppercase">{t.ui.map}</span>
            <span className={`font-bold text-lg ${theme.text || 'text-white'}`}>{theme.name}</span>
          </div>
          {/* Updated Header Display */}
          <div className="px-2 py-1 bg-gray-800 rounded text-xs">
            Act {gameState.act} <span className="text-gray-500 mx-1">|</span> Level {gameState.currentLocation ? gameState.currentLocation.split('-')[0].replace('L', '') : 1}
          </div>
        </div>

        <div className="flex items-center space-x-2 text-xs text-gray-500 uppercase tracking-widest">
          <span>{t.ui.turn} {gameState.turn}</span>
        </div>
      </div>

      <div className="flex-1 flex relative">
        <div className={`absolute inset-0 opacity-10 pointer-events-none ${theme.overlay}`}></div>
        <div className="w-1/3 flex flex-col items-center justify-end pb-12 relative z-10">
          <div className="flex flex-col items-center"> {/* Wrapper for alignment */}
            <div className={`relative w-96 h-80 transition-transform duration-500 ${player.hp < 15 ? 'animate-shake' : 'animate-float'} ${attackAnim === 'PLAYER' ? 'animate-lunge-right' : ''}`}>
              <div className="absolute inset-0 bg-white rounded-full filter blur-md opacity-50"></div>
              <div className="absolute inset-2 bg-white rounded-[40%] shadow-[0_0_30px_rgba(66,133,244,0.6)] flex items-center justify-center">
                {/* NUBUS VISUAL - Updates based on class */}
                {(() => {
                  const classDef = CLASSES.find(c => c.id === player.classId);
                  return classDef?.imageUrl ? (
                    <img
                      src={classDef.imageUrl}
                      alt="Player Character"
                      className="w-full h-full object-cover rounded-full opacity-90"
                    />
                  ) : (
                    // Fallback CSS Avatar
                    <div className={`flex space-x-4 transition-colors duration-300`}>
                      <div className={`w-3 h-3 rounded-full ${player.classId === 'data-scientist' ? 'bg-purple-500' : 'bg-black'}`}></div>
                      <div className={`w-3 h-3 rounded-full ${player.classId === 'data-scientist' ? 'bg-purple-500' : 'bg-black'}`}></div>

                      {/* Glasses for Senior Engineer */}
                      {player.classId === 'senior-engineer' && (
                        <div className="absolute top-12 flex space-x-2">
                          <div className="w-10 h-8 border-4 border-black rounded-lg"></div>
                          <div className="w-10 h-8 border-4 border-black rounded-lg"></div>
                        </div>
                      )}

                      {/* Headphones for all (Combat Mode) */}
                      <div className="absolute -left-4 top-6 w-8 h-20 bg-black rounded-xl border-l-4 border-google-red"></div>
                      <div className="absolute -right-4 top-6 w-8 h-20 bg-black rounded-xl border-r-4 border-google-red"></div>
                      <div className="absolute -top-6 left-4 right-4 h-8 border-t-8 border-black rounded-t-3xl"></div>
                    </div>
                  );
                })()}
              </div>
            </div>

            <div className="mt-8 w-56 bg-gray-900/90 rounded-lg p-3 border border-gray-600 shadow-xl relative">
              <div className="flex justify-between text-white text-sm font-bold mb-1">
                <span>NUBUS ({player.classId.split('-').map(s => s[0].toUpperCase()).join('')})</span>
                <span>{player.hp}/{player.maxHp}</span>
              </div>
              <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-google-green transition-all duration-500" style={{ width: `${(player.hp / player.maxHp) * 100}%` }}></div>
              </div>
              {player.block > 0 && (
                <div className="absolute -right-3 -top-3 w-8 h-8 bg-blue-600 rounded-full border border-white flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  {player.block}
                </div>
              )}

              {/* RELIC DISPLAY */}
              <div className="flex flex-wrap gap-1 mt-2 pt-2 border-t border-gray-700">
                {player.relics.map((r, i) => (
                  <div key={i} className="w-6 h-6 rounded bg-gray-700 flex items-center justify-center text-[14px] cursor-help" title={r.name + ": " + r.description}>
                    {r.icon}
                  </div>
                ))}
                {player.powers.map((p, i) => (
                  <div key={`p-${i}`} className="w-6 h-6 rounded bg-google-yellow flex items-center justify-center text-[10px] font-bold text-black cursor-help" title={p.description}>
                    {p.name[0]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/3 flex flex-col items-center pt-10 z-10 relative">
          <GeminiMeter value={gameState.geminiMeter} message={geminiMessage} isFiring={modernizingTarget !== null} />

          {/* The BEAM overlay */}
          {modernizingTarget?.location === 'HAND' && (
            <div className="absolute top-16 left-1/2 transform -translate-x-1/2 w-full h-[600px] pointer-events-none z-40">
              <svg className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="beamGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#4285F4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#FBBC04" stopOpacity="0.2" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Beam Line calculated roughly to point towards the hand center */}
                <line
                  x1="50%" y1="60"
                  x2={`${50 + (modernizingTarget.index - (player.hand.length / 2)) * 10}%`}
                  y2="90%"
                  stroke="url(#beamGradient)"
                  strokeWidth="4"
                  filter="url(#glow)"
                  className="animate-beam-grow"
                />
              </svg>
            </div>
          )}
        </div>

        <div className="w-1/3 flex flex-col items-center justify-end pb-12 relative z-10">
          <div className="flex flex-col items-center"> {/* Wrapper for alignment */}
            <div className="mb-6 animate-bounce h-10">
              {enemy.intent === IntentType.ATTACK && <div className="text-4xl drop-shadow-lg">⚔️ <span className="text-google-red font-bold text-2xl">{enemy.intentValue}</span></div>}
              {enemy.intent === IntentType.DEFEND && <div className="text-4xl drop-shadow-lg">🛡️ <span className="text-blue-400 font-bold text-2xl">{enemy.intentValue}</span></div>}
              {enemy.intent === IntentType.DEBUFF && <div className="text-4xl drop-shadow-lg">⚠️</div>}
              {enemy.intent === IntentType.SUMMON && <div className="text-4xl drop-shadow-lg">👾 <span className="text-purple-400 font-bold text-2xl">+2</span></div>}
              {enemy.intent === IntentType.UNKNOWN && <div className="text-4xl drop-shadow-lg">❓</div>}
            </div>

            <div className={`w-[32rem] h-[32rem] relative group transition-all duration-500 ${gameState.act === 2 ? 'animate-pulse' : ''} ${attackAnim === 'ENEMY' ? 'animate-lunge-left' : ''}`}>
              <img
                src={enemy.imageUrl}
                alt={enemy.name}
                className={`w-full h-full object-contain drop-shadow-2xl filter ${gameState.act === 1 ? 'sepia contrast-125' : gameState.act === 2 ? 'hue-rotate-90 contrast-150' : 'grayscale brightness-150'} ${enemy.dodge ? 'opacity-70 animate-pulse' : ''}`}
              />
              {enemy.isBoss && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded uppercase font-bold tracking-widest shadow-lg">{t.ui.boss}</div>}
              {enemy.isElite && <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-600 text-black text-xs px-2 py-1 rounded uppercase font-bold tracking-widest shadow-lg">{t.ui.elite}</div>}
            </div>

            <div className="mt-4 w-56 bg-gray-900/90 rounded-lg p-3 border border-gray-600 shadow-xl relative">
              <div className="flex justify-between text-white text-sm font-bold mb-1">
                <span className="truncate pr-2">{t.enemies[enemy.id]?.name || enemy.name}</span>
                <span>{enemy.hp}/{enemy.maxHp}</span>
              </div>
              <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                <div className="h-full bg-google-red transition-all duration-500" style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}></div>
              </div>
              {enemy.block > 0 && (
                <div className="absolute -left-3 -top-3 w-8 h-8 bg-gray-500 rounded-full border border-white flex items-center justify-center text-white text-xs font-bold shadow-lg">
                  {enemy.block}
                </div>
              )}
              {/* UPDATED MINION DISPLAY */}
              {enemy.minions !== undefined && enemy.minions > 0 && (
                <div className="mt-2 bg-gray-800/50 rounded p-1 border border-purple-500/30">
                  <div className="text-[9px] text-center text-purple-300 font-bold uppercase tracking-widest mb-1">Linked Dependencies</div>
                  <div className="flex justify-center gap-1">
                    {Array.from({ length: enemy.minions }).map((_, i) => (
                      <div key={i} className="w-5 h-5 bg-purple-900/80 border border-purple-400 rounded flex items-center justify-center text-xs shadow-sm" title="Dependency (Blocks Damage)">
                        🔗
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hand Area */}
      <div className="h-[28rem] bg-gradient-to-t from-black via-black/80 to-transparent pt-12 pb-12 px-4 flex items-end justify-center relative z-30">
        <div className="absolute left-10 bottom-10 w-20 h-20 bg-gray-900 rounded-full border-4 border-google-blue shadow-[0_0_20px_#4285F4] flex flex-col items-center justify-center z-40 hover:scale-110 transition-transform">
          <div className="text-4xl font-black text-white">{player.energy}</div>
          <div className="text-[0.6rem] text-blue-300 uppercase tracking-widest">{t.ui.energy}</div>
        </div>

        <div className="absolute left-36 bottom-10 flex flex-col items-center z-40 opacity-80 hover:opacity-100 transition-opacity">
          <div className="w-12 h-16 bg-blue-900 border-2 border-blue-500 rounded shadow-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">{player.deck.length}</span>
          </div>
          <span className="text-[0.6rem] text-blue-200 mt-1 uppercase tracking-wider">{t.ui.drawPile}</span>
        </div>

        <div className="absolute right-48 bottom-10 flex flex-col items-center z-40 opacity-80 hover:opacity-100 transition-opacity">
          <div className="w-12 h-16 bg-gray-800 border-2 border-gray-500 rounded shadow-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">{player.discardPile.length}</span>
          </div>
          <span className="text-[0.6rem] text-gray-300 mt-1 uppercase tracking-wider">{t.ui.discardPile}</span>
        </div>

        <div className="flex space-x-[-3rem] hover:space-x-0 transition-all duration-300 pb-4 px-12 items-end h-full">
          {player.hand.map((card, index) => {
            const { playable, reason, canAfford } = getCardPlayability(card);
            return (
              <div key={card.id} className="transform hover:-translate-y-12 hover:scale-110 transition-all duration-200 origin-bottom">
                <Card
                  card={card}
                  onClick={() => playCard(card, index)}
                  disabled={!playable}
                  canAfford={canAfford}
                  onInvalidClick={() => showToast(reason || "Unplayable")}
                  isHighlight={gameState.status === 'MODERNIZING' && card.category === CardCategory.LEGACY}
                  isTransforming={modernizingTarget?.location === 'HAND' && modernizingTarget.index === index}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={endTurn}
          disabled={!gameState.isPlayerTurn}
          className={`absolute right-10 bottom-10 px-8 py-4 rounded-xl font-bold text-white shadow-lg transition-all transform hover:scale-105 active:scale-95 ${gameState.isPlayerTurn ? 'bg-gradient-to-r from-google-red to-red-600 hover:shadow-red-500/50' : 'bg-gray-600 cursor-not-allowed opacity-50'}`}
        >
          {t.ui.endTurn}
        </button>

        {/* Error Toast */}
        <ErrorToast message={errorToast.message} isVisible={errorToast.visible} />
      </div>

      {
        enemy.id === 'bottleneck' && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-orange-500 text-black font-bold px-4 py-1 rounded-full shadow-xl z-20 animate-pulse">
            {t.ui.bandwidthCap}: {gameState.cardsPlayedTurn}/3 Cards
          </div>
        )
      }
      {
        enemy.id === 'singularity' && (
          <div className="absolute top-20 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white font-bold px-4 py-1 rounded-full shadow-xl z-20 animate-pulse">
            {t.ui.launchDeadline}: {10 - gameState.turn} {t.ui.turnsRemaining}
          </div>
        )
      }

      {/* Cloud Operations Log */}
      <CombatLog logs={gameState.logs} />

      {/* Damage Effects Overlay */}
      {damageEffects.map(effect => (
        <DamageEffect
          key={effect.id}
          value={effect.value}
          x={effect.x}
          y={effect.y}
          color={effect.color}
          onComplete={() => setDamageEffects(prev => prev.filter(e => e.id !== effect.id))}
        />
      ))}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <GameContent />
    </LanguageProvider>
  );
};

export default App;
