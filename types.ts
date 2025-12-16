
export enum CardType {
  ATTACK = 'Attack',
  SKILL = 'Skill',
  POWER = 'Power',
  STATUS = 'Status',
  CURSE = 'Curse',
}

export enum CardCategory {
  LEGACY = 'Legacy Hardware', // Junk
  CLOUD = 'Cloud Native', // Upgraded
  VERTEX = 'Vertex AI', // Special
}

export interface CardData {
  id: string;
  name: string;
  cost: number;
  type: CardType;
  category: CardCategory;
  effectDescription: string;
  flavorText: string;

  // Values
  damage?: number;
  block?: number;
  heal?: number;
  draw?: number; // Coffee Break, Cloud Functions

  // Mechanics
  unplayable?: boolean; // Jitters, Memory Leak
  exhaust?: boolean; // Preemptible VM
  ethereal?: boolean; // Exhausts if in hand at end of turn
  isPower?: boolean; // Operations Suite, GKE
  variableDamage?: boolean; // Spaghetti Code (4-8)
  aoe?: boolean; // Pub/Sub Scream
  retain?: boolean; // Cloud Storage
  discardHand?: boolean; // Load Balancer
  addStatus?: string; // Coffee Break -> Jitters
  reflect?: number; // Cloud Armor
  xValue?: boolean; // Multimodal Input
  unblockable?: boolean; // Grounding
  powerId?: string; // ID for active power tracking
  cancelIntent?: boolean; // Apigee

  // New Mechanics
  requiresRetained?: boolean; // Hard Drive Spin-Up
  playFromDiscard?: boolean; // Anthos Hybrid
  upgradeHand?: boolean; // Model Fine-Tuning
  onDrawEffect?: 'discard_random'; // Legacy Code
  passiveEffect?: 'reduce_max_energy'; // Memory Leak
  scry?: number; // Looker Dashboard
  cleanse?: boolean; // IAM Policy
  revive?: boolean; // Spanner Shield

  // Runtime State
  bonusDamage?: number;
  bonusBlock?: number;
  turnsInHand?: number; // Track how long card has been held
  tempCost?: number; // For 0-cost effects
  imageUrl?: string; // Path to card art

  // Enemy Mechanic States
  isFake?: boolean; // Hallucination fake cards that damage instead of heal
  isLocked?: boolean; // Ransomware locked cards that can't be played
}

export interface ActivePower {
  id: string;
  name: string;
  description: string;
  value?: number;
}

export interface Relic {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface ClassDefinition {
  id: string;
  name: string;
  archetype: string;
  description: string;
  color: string; // Hex
  relicId: string;
  visualIcon: string; // Emoji or placeholder char for now
  imageUrl?: string; // Path to character art
}

export interface PlayerState {
  hp: number;
  maxHp: number;
  gold: number;
  energy: number;
  maxEnergy: number;
  block: number;
  deck: CardData[];
  hand: CardData[];
  discardPile: CardData[];
  exhaustPile: CardData[];
  powers: ActivePower[];
  classId: string;
  relics: Relic[];
}

export enum IntentType {
  ATTACK = 'ATTACK',
  DEFEND = 'DEFEND',
  DEBUFF = 'DEBUFF',
  BUFF = 'BUFF',
  WAIT = 'WAIT',
  UNKNOWN = 'UNKNOWN',
  SUMMON = 'SUMMON',
}

export interface EnemyState {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  block: number;
  intent: IntentType;
  intentValue: number;
  description: string;
  imageUrl?: string;
  act: number;
  isBoss: boolean;
  isElite?: boolean;

  // Mechanics
  dodge?: number; // 0-1 chance to avoid attacks (404 Phantom)
  burnEnergy?: number; // Reduces player energy next turn (Spicy Fan)
  minions?: number; // For Monolith
  strength?: number; // Damage scaling
  statusEffects?: Record<string, number>;

  // New Enemy Mechanics
  thorns?: number; // Dust Bunny - damage reflected when hit
  reviveHp?: number; // Zombie Process - HP to revive with if not overkilled
  invulnerable?: boolean; // Monolith - cannot be damaged while true
  cardLockCount?: number; // Ransomware Knight - number of cards to lock
  mimicDamage?: boolean; // Deep Fake - mirrors player's last attack
}

// --- EVENT SYSTEM TYPES ---
export interface EventOption {
  id: string;
  label: string;
  description?: string; // e.g., "Lose 8 HP"
  effectId: string; // 'gain_gold', 'lose_hp', 'remove_card', etc.
  value?: number; // Amount for the effect
  risk?: number; // 0-1 chance of failure (if applicable)
  reqCardType?: string; // Requirement (e.g., "Must have Curse")
}

export interface EventDefinition {
  id: string;
  title: string;
  narrative: string;
  imageUrl?: string;
  act?: number; // If specific to an act
  options: EventOption[];
}

export type LogSeverity = 'INFO' | 'NOTICE' | 'WARNING' | 'ERROR' | 'CRITICAL';
export type LogSource = 'PLAYER' | 'ENEMY' | 'SYSTEM' | 'GEMINI';

export interface LogEntry {
  id: string;
  turn: number;
  severity: LogSeverity;
  source: LogSource;
  message: string;
  timestamp: number;
}

// --- MAP TYPES ---
export type MapNodeType = 'BATTLE' | 'ELITE' | 'EVENT' | 'SHOP' | 'REST' | 'BOSS';
export type MapNodeStatus = 'LOCKED' | 'AVAILABLE' | 'COMPLETED' | 'CURRENT';

export interface MapNode {
  id: string;
  layerIndex: number;
  type: MapNodeType;
  status: MapNodeStatus;
  next: string[]; // IDs of children
  parents: string[]; // IDs of parents
  x: number; // 0-100 percentage for positioning
}

export interface MapLayer {
  nodes: MapNode[];
}

export interface GameState {
  turn: number;
  geminiMeter: number; // 0-6
  act: number; // 1, 2, 3
  level: number; // Progress within act (Visual mostly, now driven by map)
  isPlayerTurn: boolean;
  status: 'PLAYING' | 'VICTORY' | 'DEFEAT' | 'MODERNIZING' | 'TRANSITION' | 'CHAR_SELECT' | 'MAP';
  logs: LogEntry[];
  cardsPlayedTurn: number; // Track for Bottleneck boss
  relicCounters: Record<string, number>; // Track progress for relics

  // Map State
  map: MapLayer[];
  currentLocation: string | null; // Node ID
}

export const MAX_GEMINI_METER = 6;
export const MAX_HAND_SIZE = 10;
