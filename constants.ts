
import { CardCategory, CardData, CardType, EnemyState, IntentType, ClassDefinition, Relic, EventDefinition } from './types';

// --- RELICS ---
export const RELICS: Record<string, Relic> = {
  HOTFIX_SCRIPT: {
    id: 'hotfix-script',
    name: 'Hotfix Script',
    description: 'At the end of your turn, deal 2 damage to a random enemy.',
    icon: '📜'
  },
  PACKET_FILTER: {
    id: 'packet-filter',
    name: 'Packet Filter',
    description: 'Start every combat with 8 Block.',
    icon: '🛡️'
  },
  THE_ALGORITHM: {
    id: 'the-algorithm',
    name: 'The Algorithm',
    description: 'Every 3rd Attack card you play deals DOUBLE damage.',
    icon: '⚗️'
  }
};

// --- CLASSES ---
export const CLASSES: ClassDefinition[] = [
  {
    id: 'senior-engineer',
    name: 'Senior Engineer',
    archetype: 'Automation & Turrets',
    description: 'Overworked but efficient. Deploys automated services to do the work for him.',
    color: '#4285F4', // Google Blue
    relicId: 'hotfix-script',
    visualIcon: '☕',
    imageUrl: '/assets/characters/nubus_base.png'
  },
  {
    id: 'security-guardian',
    name: 'Security Guardian',
    archetype: 'Tank & Defense',
    description: 'Zero Trust architecture. Builds massive Block and reflects damage back at attackers.',
    color: '#34A853', // Google Green
    relicId: 'packet-filter',
    visualIcon: '🛡️',
    imageUrl: '/assets/characters/nubus_combat.png'
  },
  {
    id: 'data-scientist',
    name: 'Data Scientist',
    archetype: 'Scaling & Ramp-up',
    description: 'Trains models mid-fight. Cards start weak but gain permanent power the more you play them.',
    color: '#EA4335', // Google Red
    relicId: 'the-algorithm',
    visualIcon: '🥽',
    imageUrl: '/assets/characters/gemini_companion.png'
  }
];

// --- STATUS & CURSE CARDS ---
export const STATUS_CARDS: Record<string, CardData> = {
  JITTERS: {
    id: 'jitters',
    name: 'Jitters',
    cost: 0,
    type: CardType.STATUS,
    category: CardCategory.LEGACY,
    effectDescription: 'At end of turn, take 1 damage.',
    flavorText: '"Too much Caffeine..."',
    unplayable: true,
    imageUrl: '/assets/cards/Jitters.png'
  },
  LATENCY: {
    id: 'latency',
    name: 'Latency',
    cost: 2,
    type: CardType.CURSE,
    category: CardCategory.LEGACY,
    effectDescription: 'Do nothing. Costs 2 Energy to remove.',
    flavorText: '"Buffering..."'
  },
  LEGACY_CODE: {
    id: 'legacy-code',
    name: 'Legacy Code',
    cost: 1,
    type: CardType.CURSE,
    category: CardCategory.LEGACY,
    effectDescription: 'When drawn, discard a random card.',
    flavorText: '"It broke something else."',
    onDrawEffect: 'discard_random',
    imageUrl: '/assets/cards/Legacy_Code.png'
  },
  MEMORY_LEAK: {
    id: 'memory-leak',
    name: 'Memory Leak',
    cost: 0,
    type: CardType.STATUS,
    category: CardCategory.LEGACY,
    effectDescription: 'Unplayable. While in hand, Max Energy -1.',
    flavorText: '"Where did the RAM go?"',
    unplayable: true,
    passiveEffect: 'reduce_max_energy'
  }
};

// --- LEGACY DECK ---
export const LEGACY_CARDS: CardData[] = [
  {
    id: 'percussive-maintenance',
    name: 'Percussive Maint.',
    cost: 1,
    type: CardType.ATTACK,
    category: CardCategory.LEGACY,
    effectDescription: 'Deal 6 Damage.',
    damage: 6,
    flavorText: '"If it doesn\'t work, hit it harder."',
    imageUrl: '/assets/cards/Percussive_Maintenance.png'
  },
  {
    id: 'duct-tape',
    name: 'Duct Tape Patch',
    cost: 1,
    type: CardType.SKILL,
    category: CardCategory.LEGACY,
    effectDescription: 'Gain 5 Block.',
    block: 5,
    flavorText: '"It\'s not pretty, but it holds. Mostly."',
    imageUrl: '/assets/cards/Duct_Tape_Patch.png'
  },
  {
    id: 'reboot',
    name: 'Reboot',
    cost: 0,
    type: CardType.SKILL,
    category: CardCategory.LEGACY,
    effectDescription: 'Heal 3 HP. End your turn immediately.',
    heal: 3,
    flavorText: '"Have you tried turning it off and on again?"',
    imageUrl: '/assets/cards/reboot.png'
  },
  {
    id: 'coffee-break',
    name: 'Coffee Break',
    cost: 1,
    type: CardType.SKILL,
    category: CardCategory.LEGACY,
    effectDescription: 'Draw 2 Cards. Add a "Jitters" to discard.',
    draw: 2,
    addStatus: 'JITTERS',
    flavorText: '"I just need 5 minutes..."',
    imageUrl: '/assets/cards/Coffee_Break.png'
  },
  {
    id: 'spaghetti-code',
    name: 'Spaghetti Code',
    cost: 1,
    type: CardType.ATTACK,
    category: CardCategory.LEGACY,
    effectDescription: 'Deal 4-8 Damage (Random).',
    damage: 4,
    variableDamage: true,
    flavorText: '"I don\'t know how it works, so don\'t touch it."',
    imageUrl: '/assets/cards/Spaghetti_Code.png'
  },
  {
    id: 'hard-drive-spin',
    name: 'Hard Drive Spin-Up',
    cost: 2,
    type: CardType.ATTACK,
    category: CardCategory.LEGACY,
    effectDescription: 'Deal 12 Damage. Requires 1 turn warm-up (Retain).',
    damage: 12,
    retain: true,
    requiresRetained: true,
    flavorText: '"Click... whirrr... click..."',
    imageUrl: '/assets/cards/Hard_Drive_Spin_Up.png'
  }
];

// --- CLOUD NATIVE CARDS (Common, Uncommon, Rare) ---
export const CLOUD_CARDS: CardData[] = [
  // Common
  {
    id: 'compute-engine',
    name: 'Compute Engine',
    cost: 1,
    type: CardType.ATTACK,
    category: CardCategory.CLOUD,
    effectDescription: 'Deal 9 Damage.',
    damage: 9,
    flavorText: '"Raw horsepower. Nothing fancy."',
    imageUrl: '/assets/cards/Compute_Engine.png'
  },
  {
    id: 'cloud-storage',
    name: 'Storage Bucket',
    cost: 1,
    type: CardType.SKILL,
    category: CardCategory.CLOUD,
    effectDescription: 'Gain 6 Block. Retain 1 Card.',
    block: 6,
    retain: true,
    flavorText: '"Infinite retention policy."',
    imageUrl: '/assets/cards/Cloud_Storage.png'
  },
  {
    id: 'vpc-firewall',
    name: 'VPC Firewall',
    cost: 1,
    type: CardType.SKILL,
    category: CardCategory.CLOUD,
    effectDescription: 'Gain 8 Block.',
    block: 8,
    flavorText: '"Deny All Ingress. Except me."',
    imageUrl: '/assets/cards/VPC_Firewall.png'
  },
  {
    id: 'cloud-functions',
    name: 'Cloud Functions',
    cost: 0,
    type: CardType.ATTACK,
    category: CardCategory.CLOUD,
    effectDescription: 'Deal 3 Damage. Draw 1 card.',
    damage: 3,
    draw: 1,
    flavorText: '"Tiny, fast, and cheap."',
    imageUrl: '/assets/cards/Cloud_Functions.png'
  },
  {
    id: 'load-balancer',
    name: 'Load Balancer',
    cost: 1,
    type: CardType.SKILL,
    category: CardCategory.CLOUD,
    effectDescription: 'Discard hand. Draw 4 new cards.',
    discardHand: true,
    draw: 4,
    flavorText: '"Redistributing the traffic."',
    imageUrl: '/assets/cards/Load_Balancer.png'
  },
  {
    id: 'operations-suite',
    name: 'Operations Suite',
    cost: 1,
    type: CardType.POWER,
    category: CardCategory.CLOUD,
    effectDescription: 'Whenever you play a Power, Heal 2 HP.',
    isPower: true,
    powerId: 'ops_suite',
    flavorText: '"Observability prevents downtime."',
    imageUrl: '/assets/cards/Operations_Suite.png'
  },

  // Uncommon
  {
    id: 'pub-sub',
    name: 'Pub/Sub Scream',
    cost: 2,
    type: CardType.ATTACK,
    category: CardCategory.CLOUD,
    effectDescription: 'Deal 8 Damage to ALL enemies.',
    damage: 8,
    aoe: true,
    flavorText: '"One message, many subscribers."',
    imageUrl: '/assets/cards/Pub_Sub_Scream.png'
  },
  {
    id: 'preemptible-vm',
    name: 'Preemptible VM',
    cost: 0,
    type: CardType.ATTACK,
    category: CardCategory.CLOUD,
    effectDescription: 'Deal 14 Damage. Exhaust. Ethereal.',
    damage: 14,
    exhaust: true,
    ethereal: true,
    flavorText: '"Cheap power, but it might vanish."',
    imageUrl: '/assets/cards/Preemptible_VM.png'
  },
  {
    id: 'cloud-armor',
    name: 'Cloud Armor',
    cost: 2,
    type: CardType.SKILL,
    category: CardCategory.CLOUD,
    effectDescription: 'Gain 12 Block. Reflect 3 damage this turn.',
    block: 12,
    reflect: 3,
    flavorText: '"DDOS protection enabled."',
    imageUrl: '/assets/cards/Cloud_Armor.png'
  },
  {
    id: 'dataflow',
    name: 'Dataflow Pipeline',
    cost: 1,
    type: CardType.POWER,
    category: CardCategory.CLOUD,
    effectDescription: 'Start of turn: Draw +1 Card.',
    isPower: true,
    powerId: 'dataflow',
    flavorText: '"Streaming analytics in real-time."',
    imageUrl: '/assets/cards/Dataflow_Pipeline.png'
  },
  {
    id: 'looker-dashboard',
    name: 'Looker Dashboard',
    cost: 1,
    type: CardType.SKILL,
    category: CardCategory.CLOUD,
    effectDescription: 'Draw 3 cards, then discard 2 random cards.',
    scry: 3,
    flavorText: '"Visualize the outcome."',
    imageUrl: '/assets/cards/Looker_Dashboard.png'
  },
  {
    id: 'iam-policy',
    name: 'IAM Policy',
    cost: 1,
    type: CardType.SKILL,
    category: CardCategory.CLOUD,
    effectDescription: 'Remove all Debuffs/Status cards from hand.',
    cleanse: true,
    flavorText: '"Revoking your access privileges."',
    imageUrl: '/assets/cards/IAM_Policy.png'
  },

  // Rare
  {
    id: 'bigquery-blast',
    name: 'BigQuery Blast',
    cost: 2,
    type: CardType.ATTACK,
    category: CardCategory.CLOUD,
    effectDescription: 'Deal 15 Damage + 5 per card in discard.',
    damage: 15,
    flavorText: '"Petabyte-scale destruction."',
    imageUrl: '/assets/cards/BigQuery_Blast.png'
  },
  {
    id: 'gke-swarm',
    name: 'GKE Swarm',
    cost: 3,
    type: CardType.POWER,
    category: CardCategory.CLOUD,
    effectDescription: 'End of turn: Deal 5 Damage to enemy.',
    isPower: true,
    powerId: 'gke_turret',
    flavorText: '"Orchestration automated."',
    imageUrl: '/assets/cards/GKE_Swarm.png'
  },
  {
    id: 'apigee',
    name: 'Apigee Gateway',
    cost: 2,
    type: CardType.SKILL,
    category: CardCategory.CLOUD,
    effectDescription: 'Cancel Enemy Intent. Exhaust.',
    cancelIntent: true,
    exhaust: true,
    flavorText: '"Rate limit exceeded. Please try again."',
    imageUrl: '/assets/cards/Apigee_Gateway.png'
  },
  {
    id: 'spanner-shield',
    name: 'Spanner Shield',
    cost: 3,
    type: CardType.POWER,
    category: CardCategory.CLOUD,
    effectDescription: 'If HP drops to 0, survive with 10 HP (Once).',
    isPower: true,
    revive: true,
    powerId: 'spanner_shield',
    flavorText: '"Global consistency means I don\'t die."',
    imageUrl: '/assets/cards/Spanner_Shield.png'
  },
  {
    id: 'anthos-hybrid',
    name: 'Anthos Hybrid',
    cost: 1,
    type: CardType.SKILL,
    category: CardCategory.CLOUD,
    effectDescription: 'Play a random card from Discard Pile (Cost 0).',
    playFromDiscard: true,
    flavorText: '"Run anywhere. Deploy everywhere."',
    imageUrl: '/assets/cards/Anthos_Hybrid.png'
  }
];

// --- VERTEX AI CARDS ---
export const VERTEX_CARDS: CardData[] = [
  {
    id: 'the-prompt',
    name: 'The Prompt',
    cost: 1,
    type: CardType.SKILL,
    category: CardCategory.VERTEX,
    effectDescription: 'Add a random Cloud card to hand. It costs 0.',
    flavorText: '"I can dream up whatever you need."',
    imageUrl: '/assets/cards/The_Prompt.png'
  },
  {
    id: 'model-fine-tuning',
    name: 'Model Fine-Tuning',
    cost: 1,
    type: CardType.SKILL,
    category: CardCategory.VERTEX,
    effectDescription: 'Upgrade ALL cards in hand (+3 Dmg/Block).',
    upgradeHand: true,
    flavorText: '"Adjusting weights for better performance."',
    imageUrl: '/assets/cards/Model_Fine_Tuning.png'
  },
  {
    id: 'grounding',
    name: 'Grounding',
    cost: 2,
    type: CardType.ATTACK,
    category: CardCategory.VERTEX,
    effectDescription: 'Deal 20 Damage. Unblockable.',
    damage: 20,
    unblockable: true,
    flavorText: '"Fact-checked and verified."',
    imageUrl: '/assets/cards/Grounding.png'
  },
  {
    id: 'multimodal',
    name: 'Multimodal Input',
    cost: 0, // Handled as X in logic
    type: CardType.ATTACK,
    category: CardCategory.VERTEX,
    effectDescription: 'Spend all Energy. Deal X Dmg, Gain X Block, Draw X.',
    xValue: true,
    flavorText: '"Text, Images, Video—I can handle it all."',
    imageUrl: '/assets/cards/Multimodal_Input.png'
  }
];

export const ENEMIES: EnemyState[] = [
  // --- ACT 1: The Dusty Server Closet (Legacy) ---
  {
    id: 'dust-bunny',
    name: 'Dust Bunny',
    hp: 20,
    maxHp: 20,
    block: 0,
    intent: IntentType.ATTACK,
    intentValue: 6,
    description: 'A floating sphere of dust and static. (Common)',
    imageUrl: '/assets/enemies/dust_bunny.png',
    act: 1,
    isBoss: false,
    minions: 0,
    strength: 0,
    thorns: 3 // Static Shock - reflects damage when hit
  },
  {
    id: 'spaghetti-monster',
    name: 'Spaghetti Monster',
    hp: 35,
    maxHp: 35,
    block: 0,
    intent: IntentType.DEBUFF,
    intentValue: 0,
    description: 'A chaotic knot of cables. Fills deck with junk.',
    imageUrl: '/assets/enemies/spaghetti_monster.png',
    act: 1,
    isBoss: false,
    minions: 0,
    strength: 0
  },
  {
    id: 'zombie-process',
    name: 'Zombie Process',
    hp: 28,
    maxHp: 28,
    block: 0,
    intent: IntentType.ATTACK,
    intentValue: 8,
    description: 'A rotting terminal window leaking goo. (Common)',
    imageUrl: '/assets/enemies/zombie_process.png',
    act: 1,
    isBoss: false,
    minions: 0,
    strength: 0,
    reviveHp: 10 // Revives with 10 HP if not overkilled
  },
  {
    id: 'spicy-fan',
    name: 'The Spicy Fan',
    hp: 22,
    maxHp: 22,
    block: 0,
    intent: IntentType.ATTACK,
    intentValue: 5,
    description: 'Overheating CPU fan. Burns 1 Energy on attack.',
    imageUrl: '/assets/enemies/spicy_fan.png',
    act: 1,
    isBoss: false,
    burnEnergy: 1,
    minions: 0,
    strength: 0
  },
  {
    id: 'crt-golem',
    name: 'CRT Golem',
    hp: 55,
    maxHp: 55,
    block: 10,
    intent: IntentType.ATTACK,
    intentValue: 10,
    description: 'Hulking brute made of old monitors. (Elite)',
    imageUrl: '/assets/enemies/crt_golem.png',
    act: 1,
    isBoss: false,
    isElite: true,
    minions: 0,
    strength: 0
  },
  {
    id: 'monolith',
    name: 'The Monolith',
    hp: 80,
    maxHp: 80,
    block: 10,
    intent: IntentType.SUMMON,
    intentValue: 0,
    description: 'Rusty mainframe tower. (BOSS)',
    imageUrl: '/assets/enemies/monolith_boss.png',
    act: 1,
    isBoss: true,
    minions: 0,
    strength: 0,
    invulnerable: true // Starts invulnerable until minions destroyed
  },

  // --- ACT 2: Lift & Shift Limbo (Migration) ---
  {
    id: 'packet-loss',
    name: 'Packet Loss',
    hp: 40,
    maxHp: 40,
    block: 0,
    intent: IntentType.ATTACK,
    intentValue: 8,
    description: 'Frantic pixelated mailman. Forces discards.',
    imageUrl: '/assets/enemies/packet_loss.png',
    act: 2,
    isBoss: false,
    minions: 0,
    strength: 0
  },
  {
    id: 'race-condition',
    name: 'Race Condition',
    hp: 45,
    maxHp: 45,
    block: 5,
    intent: IntentType.ATTACK,
    intentValue: 9,
    description: 'Two neon runners crashing into each other.',
    imageUrl: '/assets/enemies/race_condition.png',
    act: 2,
    isBoss: false,
    minions: 0,
    strength: 0
  },
  {
    id: '404-phantom',
    name: '404 Phantom',
    hp: 30,
    maxHp: 30,
    block: 0,
    intent: IntentType.DEBUFF,
    intentValue: 0,
    description: 'A ghost in a sheet. High dodge chance.',
    imageUrl: '/assets/enemies/404_phantom.png',
    act: 2,
    isBoss: false,
    dodge: 0.5,
    minions: 0,
    strength: 0
  },
  {
    id: 'sql-injector',
    name: 'SQL Injector',
    hp: 38,
    maxHp: 38,
    block: 0,
    intent: IntentType.ATTACK,
    intentValue: 10,
    description: 'A cyber-worm of glowing green brackets.',
    imageUrl: '/assets/enemies/sql_injector.png',
    act: 2,
    isBoss: false,
    minions: 0,
    strength: 0
  },
  {
    id: 'ransomware-knight',
    name: 'Ransomware Knight',
    hp: 70,
    maxHp: 70,
    block: 20,
    intent: IntentType.ATTACK,
    intentValue: 14,
    description: 'Black knight with padlock armor. (Elite)',
    imageUrl: '/assets/enemies/ransomware_knight.png',
    act: 2,
    isBoss: false,
    isElite: true,
    minions: 0,
    strength: 0,
    cardLockCount: 2 // Locks 2 cards in player's hand
  },
  {
    id: 'bottleneck',
    name: 'The Bottleneck',
    hp: 120,
    maxHp: 120,
    block: 20,
    intent: IntentType.DEBUFF,
    intentValue: 0,
    description: 'Giant traffic cone. Caps cards played to 3. (BOSS)',
    imageUrl: '/assets/enemies/bottleneck_boss.png',
    act: 2,
    isBoss: true,
    minions: 0,
    strength: 0
  },

  // --- ACT 3: Vertex Vanguard (Future) ---
  {
    id: 'hallucination',
    name: 'The Hallucination',
    hp: 60,
    maxHp: 60,
    block: 0,
    intent: IntentType.ATTACK,
    intentValue: 15,
    description: 'Shimmering Nubus clone. Shuffles fake cards.',
    imageUrl: '/assets/enemies/deep_fake_shifter.png',
    act: 3,
    isBoss: false,
    minions: 0,
    strength: 0
  },
  {
    id: 'overfit',
    name: 'The Overfit',
    hp: 65,
    maxHp: 65,
    block: 10,
    intent: IntentType.ATTACK,
    intentValue: 12,
    description: 'Robot with laser calipers. Precise damage.',
    imageUrl: '/assets/enemies/overfit.png',
    act: 3,
    isBoss: false,
    minions: 0,
    strength: 0
  },
  {
    id: 'infinite-loop',
    name: 'The Infinite Loop',
    hp: 70,
    maxHp: 70,
    block: 15,
    intent: IntentType.DEBUFF,
    intentValue: 0,
    description: 'Snake eating its own tail. Redraws same hand.',
    imageUrl: '/assets/enemies/infinite_loop.png',
    act: 3,
    isBoss: false,
    minions: 0,
    strength: 0
  },
  {
    id: 'black-box',
    name: 'The Black Box',
    hp: 80,
    maxHp: 80,
    block: 20,
    intent: IntentType.UNKNOWN,
    intentValue: 0,
    description: 'Ominous floating cube. Unknown intent.',
    imageUrl: '/assets/enemies/black_box.png',
    act: 3,
    isBoss: false,
    minions: 0,
    strength: 0
  },
  {
    id: 'deep-fake',
    name: 'The Deep Fake',
    hp: 100,
    maxHp: 100,
    block: 10,
    intent: IntentType.ATTACK,
    intentValue: 20,
    description: 'Glitched shapeshifter. (Elite)',
    imageUrl: '/assets/enemies/deep_fake_shifter.png',
    act: 3,
    isBoss: false,
    isElite: true,
    minions: 0,
    strength: 0,
    mimicDamage: true // Mirrors player's last attack
  },
  {
    id: 'singularity',
    name: 'The Singularity',
    hp: 200,
    maxHp: 200,
    block: 50,
    intent: IntentType.ATTACK,
    intentValue: 25,
    description: 'Dark storm-cloud Nubus. (BOSS)',
    imageUrl: '/assets/characters/dark_nubus_boss.png',
    act: 3,
    isBoss: true,
    minions: 0,
    strength: 0
  }
];

// --- EVENTS ---
export const EVENTS: EventDefinition[] = [
  {
    id: 'the-pivot',
    title: 'The Pivot',
    narrative: 'A frantic Slack notification pierces the silence. It\'s the CEO. "Team, I just read an article about Web3. We need to be a Web3 company by EOD. I don\'t care that we make toaster software. Pivot!"',
    imageUrl: '/assets/events/the_pivot.png',
    options: [
      {
        id: 'just-build-it',
        label: 'Just Build It',
        description: 'Gain 75 Gold. Add "NFT Integration" Curse.',
        effectId: 'add_curse_gain_gold',
        value: 75,
        reqCardType: 'nft_integration'
      },
      {
        id: 'push-back',
        label: 'Push Back',
        description: 'Lose 8 HP. Remove a Card.',
        effectId: 'lose_hp_remove_card',
        value: 8
      },
      {
        id: 'ignore',
        label: 'Ignore Notification',
        description: 'Leave with no changes.',
        effectId: 'leave'
      }
    ]
  },
  {
    id: 'legacy-server',
    title: 'The Legacy Server',
    narrative: 'You stumble upon a server that hasn\'t been rebooted in 12 years. It\'s covered in dust bunnies, but it\'s running a critical script that keeps the lights on. It\'s making a terrifying grinding noise.',
    imageUrl: '/assets/events/legacy_server.png',
    act: 1,
    options: [
      {
        id: 'percussive',
        label: 'Percussive Maintenance',
        description: 'Take 4 Damage. Upgrade a random card.',
        effectId: 'damage_upgrade',
        value: 4
      },
      {
        id: 'decommission',
        label: 'Decommission It',
        description: 'Remove a card from your deck.',
        effectId: 'remove_card'
      },
      {
        id: 'back-away',
        label: 'Back Away Slowly',
        description: 'Heal 5 HP.',
        effectId: 'heal',
        value: 5
      }
    ]
  },
  {
    id: 'headhunter',
    title: 'The Headhunter',
    narrative: 'A recruiter slides into your DMs. "Hey Rockstar! 🚀 We\'re disrupting the disruption space. Stealth mode. 10x engineers only. Want to sell us some of your company\'s data?"',
    imageUrl: '/assets/events/headhunter.png',
    act: 2,
    options: [
      {
        id: 'sell-data',
        label: 'Sell Data',
        description: 'Lose 10 Max HP. Gain 100 Gold.',
        effectId: 'lose_max_hp_gain_gold',
        value: 100
      },
      {
        id: 'reject',
        label: 'Reject Offer',
        description: 'Fight an Elite Enemy.',
        effectId: 'start_elite_combat'
      }
    ]
  },
  {
    id: 'hackathon',
    title: 'The Hackathon',
    narrative: 'Balloons fall from the ceiling. It\'s "Mandatory Fun Week". You are locked in a conference room for 48 hours to "innovate". The smell of energy drinks is overpowering.',
    imageUrl: '/assets/events/hackathon.png',
    options: [
      {
        id: 'hook-up-the-iv',
        label: 'Hook up the IV',
        description: 'Lose 6 HP. Get "Caffeine IV" Relic. Add 2 Jitters.',
        effectId: 'caffeine_iv',
        value: 6
      },
      {
        id: 'hide-in-server-room',
        label: 'Hide in Server Room',
        description: 'Full Heal. Add "Latency" Curse.',
        effectId: 'full_heal_add_curse',
        reqCardType: 'latency'
      }
    ]
  },
  {
    id: 'mysterious-usb',
    title: 'The Mysterious USB',
    narrative: 'You find a USB drive taped to the bottom of a desk labeled "DO NOT OPEN." It might contain Bitcoin keys. It might contain the ILOVEYOU virus.',
    imageUrl: '/assets/events/usb.png',
    act: 1,
    options: [
      {
        id: 'plug-it-in',
        label: 'Plug it in',
        description: '50% Chance: Rare Card. 50% Chance: Take 15 Dmg.',
        effectId: 'gamble_usb',
        risk: 0.5
      },
      {
        id: 'snap-it-in-half',
        label: 'Snap it in half',
        description: 'Remove a Curse card.',
        effectId: 'remove_curse'
      }
    ]
  },
  {
    id: 'deprecated-api',
    title: 'The Deprecated API',
    narrative: 'You encounter an ancient API endpoint. It speaks in XML. "I require a sacrifice to remain backward compatible."',
    imageUrl: '/assets/events/api.png',
    options: [
      {
        id: 'sacrifice-health',
        label: 'Sacrifice Health',
        description: 'Lose 30% HP. Gain 2 Uncommon Cards.',
        effectId: 'sacrifice_hp_cards',
        value: 0.3
      },
      {
        id: 'sacrifice-gold',
        label: 'Sacrifice Gold',
        description: 'Lose all Gold. Duplicate a card.',
        effectId: 'sacrifice_gold_duplicate'
      }
    ]
  },
  {
    id: 'standup-meeting',
    title: 'The Standup Meeting',
    narrative: 'You are pulled into a Daily Standup. Nobody is sitting. The Scrum Master is asking why ticket #404 isn\'t done yet. It has been 45 minutes.',
    imageUrl: '/assets/events/standup.png',
    act: 2,
    options: [
      {
        id: 'admit-you-are-blocked',
        label: 'Admit you are blocked',
        description: 'Heal 10 HP. Lose 15 Gold.',
        effectId: 'heal_lose_gold',
        value: 10
      },
      {
        id: 'lie-and-say-almost-done',
        label: 'Lie and say "Almost Done"',
        description: 'Upgrade a card. Add "Jitters".',
        effectId: 'upgrade_add_jitters'
      }
    ]
  }
];
