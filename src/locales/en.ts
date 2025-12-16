import { Translation } from './types';

export const en: Translation = {
    ui: {
        title: "System: Ascension",
        subtitle: "A Cloud Migration Roguelite",
        startButton: "Start Migration",
        language: "Language",
        turn: "Turn",
        energy: "Energy",
        block: "Block",
        drawPile: "Draw Pile",
        discardPile: "Discard Pile",
        exhaustPile: "Exhaust Pile",
        endTurn: "End Turn",
        handFull: "Hand Full!",
        insufficientCompute: "Insufficient Compute",
        victory: "Migration Complete!",
        defeat: "System Crash",
        rewards: "Rewards",
        chooseCard: "Choose a Card",
        skip: "Skip",
        gold: "Gold",
        shop: "Vendor API",
        buy: "Buy",
        removeCard: "Remove Card",
        leave: "Leave",
        event: "Event",
        rest: "System Repair",
        unknown: "Unknown Node",
        battle: "Battle",
        elite: "Elite Threat",
        boss: "Boss",
        map: "Network Map",
        deck: "Deck",
        relics: "Relics",
        loading: "Loading...",
        modernizing: "Modernizing...",
        navigating: "Navigating...",
        act: "ACT",
        navigation: "NAVIGATION",
        floor: "FLOOR",
        choosePath: "CHOOSE YOUR NEXT PATH",
        initiateTravel: "INITIATE TRAVEL",
        returnToRoot: "Return to Root",
        migrating: "MIGRATING TO NEXT NODE...",
        migrationSuccess: "MIGRATION SUCCESS",
        victoryMessage: "The infrastructure is now fully cloud-native.",
        defeatMessage: "Crash Report: Failed at Act",
        bandwidthCap: "Bandwidth Cap",
        launchDeadline: "Launch Deadline",
        turnsRemaining: "Turns Remaining",
        refactoring: "Refactoring legacy code...",
        migrationComplete: "Migration Complete. System Ascended.",
        introVideo: "Intro Video",
        closeVideo: "Close Video"
    },
    logs: {
        modernizationProtocol: "Modernization Protocol Initiated...",
        refactoredHand: "Refactored {old} (Hand) -> {new}",
        refactoredDeck: "Refactored {old} (Deck) -> {new}",
        refactoredDiscard: "Refactored {old} (Discard) -> {new}",
        systemOverclock: "System Fully Modernized! Overclock Triggered (+5 HP).",
        vendorConnected: "Connected to Vendor API.",
        visitedNode: "Visited {node}. (Placeholder Auto-Resolve)",
        repairedSystem: "Repaired System (+15 HP)",
        actInitiated: "Act {act} Initiated. New Map Generated.",
        enemyRevived: "🧟 {enemy} revived with {hp} HP!",
        packetLoss: "📦 Packet Loss! Discarded {count} cards!",
        sqlInjection: "⚠️ SQL Injection! {count} corrupted cards added to deck!",
        ransomware: "🔒 Ransomware! {count} cards locked!",
        fakeCard: "💀 FAKE CARD! Took {damage} damage instead of healing!",
        heals: "Heals {amount} HP.",
        revokedStatus: "Revoked Status privileges.",
        handOptimized: "Hand optimized (+3 Stats).",
        deployedFromArchives: "Deployed {card} from archives.",
        discardedHand: "Discarded hand.",
        addedToDiscard: "Added {card} to discard.",
        powerActive: "Power Active.",
        opsSuite: "(Ops Suite: +2 HP)",
        generatedCard: "Generated {card}.",
        intentCancelled: "Enemy Intent Cancelled.",
        endOfTurn: "End of Turn Processing...",
        hotfixApplied: "Hotfix Script applied patch: 2 damage.",
        jittersDamage: "Jitters dealt {damage} damage.",
        systemInitialized: "System Initialized. Generating Network Map...",
        installedRelic: "Installed {relic}",
        boughtRelic: "Bought {relic} for {cost}G.",
        purchasedCard: "Purchased {card}",
        boughtCard: "Bought {card} for {cost}G.",
        cardRemoved: "Card Removed",
        removedCardLog: "Removed card for {cost}G.",
        drawsCards: "Draws {count} cards.",
        analyzedData: "Analyzed data (Draw 3, Discard 2).",
        gainsBlock: "Gains {amount} block.",
        reflectsDamage: "Reflects next {amount} damage.",
        dealtDamage: "Dealt {amount} damage.",
        thornsDamage: "⚡ Static Shock! Took {amount} thorns damage.",
        deepFakeMimic: "🦾 Deep Fake mimics your last attack ({amount} damage)!",
        spannerShield: "CRITICAL: SPANNER SHIELD TRIGGERED! Survived with 10 HP.",
        integrityBreach: "Integrity breach! -{amount} HP.",
        damageBlocked: "Damage blocked.",
        enemyGainsBlock: "Gains {amount} block.",
        enemySummons: "Summons 2 Dependencies!",
        spaghettiTangled: "Spaghetti Monster tangled {count} Legacy Code cards into your deck!",
        reshuffledDiscard: "Reshuffled discard pile.",
        handFullBurned: "Hand full! Burned {card}.",
        noCardsToDraw: "No cards left to draw!",
        drawnLegacyCode: "Drawn Legacy Code! It broke something.",
        discardedTarget: "Discarded {card}.",
        packetFilterInit: "Packet Filter initialized: +8 Block.",
        encounterDetected: "Encounter detected: {enemy}",
        eventTriggered: "Event triggered: {event}",
        nubusPlays: "Nubus plays {card}.",
        algorithmOptimized: "The Algorithm optimized this attack (2x Damage)!",
        invulnerable: "{enemy} is INVULNERABLE!",
        dependencyRemoved: "(1 Dependency Removed)",
        attackBlocked: "Attack BLOCKED by Dependencies!",
        missDodged: "MISS! {enemy} dodged the attack.",
        launchDeadline: "LAUNCH DEADLINE REACHED. Success.",
        singularityConsumed: "⚡ SINGULARITY consumed {card} from your deck!",
        raceCondition: "⚡ RACE CONDITION TRIGGERED! Bonus damage!",
        hallucinationShuffled: "👻 Hallucination shuffled {count} suspicious healing cards into your deck...",
        infiniteLoop: "♾️ INFINITE LOOP! You'll redraw the same hand next turn!",
        usesDescription: "Uses {description}.",
        blackBoxHums: "The Black Box hums... nothing happens yet.",
        heatBuildsUp: "Heat builds up... (-{amount} Energy next turn)",
        overfitDetected: "📊 OVERFIT detected pattern! Gained +2 Strength from repetition!",
        turnStart: "Turn {turn} Start.",
        infiniteLoopRedraw: "♾️ Redrawing same hand from Infinite Loop!",
        encounterNarrative: "Nubus engages a {enemy} in the {theme}."
    },
    themes: {
        act1: "The Dusty Server Closet",
        act2: "Lift & Shift Limbo",
        act3: "The Singularity Core"
    },
    combatLog: {
        title: "CLOUD_OPS_LOG",
        minimize: "MINIMIZE",
        expand: "EXPAND",
        waiting: "System initialized. Waiting for input..."
    },
    gemini: {
        name: "Gemini"
    },
    mapNodes: {
        battle: "Standard security patrol. Good for warming up.",
        elite: "High-traffic node. Dangerous, but lucrative.",
        event: "Unknown signal detected. Proceed with caution.",
        shop: "Vendor API available. Spend credits here.",
        rest: "System maintenance window. Repair and optimize.",
        boss: "CRITICAL THREAT DETECTED. PREPARE FOR LAUNCH.",
        unknown: "Unknown sector."
    },
    classes: {
        'senior-engineer': {
            name: "Senior Engineer",
            description: "Overworked but efficient. Deploys automated services to do the work for him."
        },
        'security-guardian': {
            name: "Security Guardian",
            description: "Zero Trust architecture. Builds massive Block and reflects damage back at attackers."
        },
        'data-scientist': {
            name: "Data Scientist",
            description: "Trains models mid-fight. Cards start weak but gain permanent power the more you play them."
        }
    },
    cards: {
        // Legacy
        'percussive-maintenance': { name: "Percussive Maint.", description: "Deal 6 Damage.", flavorText: "\"If it doesn't work, hit it harder.\"" },
        'duct-tape': { name: "Duct Tape Patch", description: "Gain 5 Block.", flavorText: "\"It's not pretty, but it holds. Mostly.\"" },
        'reboot': { name: "Reboot", description: "Heal 3 HP. End your turn immediately.", flavorText: "\"Have you tried turning it off and on again?\"" },
        'coffee-break': { name: "Coffee Break", description: "Draw 2 Cards. Add a \"Jitters\" to discard.", flavorText: "\"I just need 5 minutes...\"" },
        'spaghetti-code': { name: "Spaghetti Code", description: "Deal 4-8 Damage (Random).", flavorText: "\"I don't know how it works, so don't touch it.\"" },
        'hard-drive-spin': { name: "Hard Drive Spin-Up", description: "Deal 12 Damage. Requires 1 turn warm-up (Retain).", flavorText: "\"Click... whirrr... click...\"" },

        // Cloud
        'compute-engine': { name: "Compute Engine", description: "Deal 9 Damage.", flavorText: "\"Raw horsepower. Nothing fancy.\"" },
        'cloud-storage': { name: "Storage Bucket", description: "Gain 6 Block. Retain 1 Card.", flavorText: "\"Infinite retention policy.\"" },
        'vpc-firewall': { name: "VPC Firewall", description: "Gain 8 Block.", flavorText: "\"Deny All Ingress. Except me.\"" },
        'cloud-functions': { name: "Cloud Functions", description: "Deal 3 Damage. Draw 1 card.", flavorText: "\"Tiny, fast, and cheap.\"" },
        'load-balancer': { name: "Load Balancer", description: "Discard hand. Draw 4 new cards.", flavorText: "\"Redistributing the traffic.\"" },
        'operations-suite': { name: "Operations Suite", description: "Whenever you play a Power, Heal 2 HP.", flavorText: "\"Observability prevents downtime.\"" },
        'pub-sub': { name: "Pub/Sub Scream", description: "Deal 8 Damage to ALL enemies.", flavorText: "\"One message, many subscribers.\"" },
        'preemptible-vm': { name: "Preemptible VM", description: "Deal 14 Damage. Exhaust. Ethereal.", flavorText: "\"Cheap power, but it might vanish.\"" },
        'cloud-armor': { name: "Cloud Armor", description: "Gain 12 Block. Reflect 3 damage this turn.", flavorText: "\"DDOS protection enabled.\"" },
        'dataflow': { name: "Dataflow Pipeline", description: "Start of turn: Draw +1 Card.", flavorText: "\"Streaming analytics in real-time.\"" },
        'looker-dashboard': { name: "Looker Dashboard", description: "Draw 3 cards, then discard 2 random cards.", flavorText: "\"Visualize the outcome.\"" },
        'iam-policy': { name: "IAM Policy", description: "Remove all Debuffs/Status cards from hand.", flavorText: "\"Revoking your access privileges.\"" },
        'bigquery-blast': { name: "BigQuery Blast", description: "Deal 15 Damage + 5 per card in discard.", flavorText: "\"Petabyte-scale destruction.\"" },
        'gke-swarm': { name: "GKE Swarm", description: "End of turn: Deal 5 Damage to enemy.", flavorText: "\"Orchestration automated.\"" },
        'apigee': { name: "Apigee Gateway", description: "Cancel Enemy Intent. Exhaust.", flavorText: "\"Rate limit exceeded. Please try again.\"" },
        'spanner-shield': { name: "Spanner Shield", description: "If HP drops to 0, survive with 10 HP (Once).", flavorText: "\"Global consistency means I don't die.\"" },
        'anthos-hybrid': { name: "Anthos Hybrid", description: "Play a random card from Discard Pile (Cost 0).", flavorText: "\"Run anywhere. Deploy everywhere.\"" },

        // Vertex
        'the-prompt': { name: "The Prompt", description: "Add a random Cloud card to hand. It costs 0.", flavorText: "\"I can dream up whatever you need.\"" },
        'model-fine-tuning': { name: "Model Fine-Tuning", description: "Upgrade ALL cards in hand (+3 Dmg/Block).", flavorText: "\"Adjusting weights for better performance.\"" },
        'grounding': { name: "Grounding", description: "Deal 20 Damage. Unblockable.", flavorText: "\"Fact-checked and verified.\"" },
        'multimodal': { name: "Multimodal Input", description: "Spend all Energy. Deal X Dmg, Gain X Block, Draw X.", flavorText: "\"Text, Images, Video—I can handle it all.\"" },

        // Status/Curse
        'jitters': { name: "Jitters", description: "At end of turn, take 1 damage.", flavorText: "\"Too much Caffeine...\"" },
        'latency': { name: "Latency", description: "Do nothing. Costs 2 Energy to remove.", flavorText: "\"Buffering...\"" },
        'legacy-code': { name: "Legacy Code", description: "When drawn, discard a random card.", flavorText: "\"It broke something else.\"" },
        'memory-leak': { name: "Memory Leak", description: "Unplayable. While in hand, Max Energy -1.", flavorText: "\"Where did the RAM go?\"" }
    },
    enemies: {
        'dust-bunny': { name: "Dust Bunny", description: "A floating sphere of dust and static. (Common)" },
        'spaghetti-monster': { name: "Spaghetti Monster", description: "A chaotic knot of cables. Fills deck with junk." },
        'zombie-process': { name: "Zombie Process", description: "A rotting terminal window leaking goo. (Common)" },
        'spicy-fan': { name: "The Spicy Fan", description: "Overheating CPU fan. Burns 1 Energy on attack." },
        'crt-golem': { name: "CRT Golem", description: "Hulking brute made of old monitors. (Elite)" },
        'monolith': { name: "The Monolith", description: "Rusty mainframe tower. (BOSS)" },
        'packet-loss': { name: "Packet Loss", description: "Frantic pixelated mailman. Forces discards." },
        'race-condition': { name: "Race Condition", description: "Two neon runners crashing into each other." },
        '404-phantom': { name: "404 Phantom", description: "A ghost in a sheet. High dodge chance." },
        'sql-injector': { name: "SQL Injector", description: "A cyber-worm of glowing green brackets." },
        'ransomware-knight': { name: "Ransomware Knight", description: "Black knight with padlock armor. (Elite)" },
        'bottleneck': { name: "The Bottleneck", description: "Giant traffic cone. Caps cards played to 3. (BOSS)" },
        'hallucination': { name: "The Hallucination", description: "Shimmering Nubus clone. Shuffles fake cards." },
        'overfit': { name: "The Overfit", description: "Robot with laser calipers. Precise damage." },
        'infinite-loop': { name: "The Infinite Loop", description: "Snake eating its own tail. Redraws same hand." },
        'black-box': { name: "The Black Box", description: "Ominous floating cube. Unknown intent." },
        'deep-fake': { name: "The Deep Fake", description: "Glitched shapeshifter. (Elite)" },
        'singularity': { name: "The Singularity", description: "Dark storm-cloud Nubus. (BOSS)" }
    },
    events: {
        'the-pivot': {
            title: "The Pivot",
            narrative: "A frantic Slack notification pierces the silence. It's the CEO. \"Team, I just read an article about Web3. We need to be a Web3 company by EOD. I don't care that we make toaster software. Pivot!\"",
            options: {
                'just-build-it': { label: "Just Build It", description: "Gain 75 Gold. Add \"NFT Integration\" Curse." },
                'push-back': { label: "Push Back", description: "Lose 8 HP. Remove a Card." },
                'ignore': { label: "Ignore Notification", description: "Leave with no changes." }
            }
        },
        'legacy-server': {
            title: "The Legacy Server",
            narrative: "You stumble upon a server that hasn't been rebooted in 12 years. It's covered in dust bunnies, but it's running a critical script that keeps the lights on. It's making a terrifying grinding noise.",
            options: {
                'percussive': { label: "Percussive Maintenance", description: "Take 4 Damage. Upgrade a random card." },
                'decommission': { label: "Decommission It", description: "Remove a card from your deck." },
                'back-away': { label: "Back Away Slowly", description: "Heal 5 HP." }
            }
        },
        'headhunter': {
            title: "The Headhunter",
            narrative: "A recruiter slides into your DMs. \"Hey Rockstar! 🚀 We're disrupting the disruption space. Stealth mode. 10x engineers only. Want to sell us some of your company's data?\"",
            options: {
                'sell-data': { label: "Sell Data", description: "Lose 10 Max HP. Gain 100 Gold." },
                'reject': { label: "Reject Offer", description: "Fight an Elite Enemy." }
            }
        }
    },
    relics: {
        'hotfix-script': { name: "Hotfix Script", description: "At the end of your turn, deal 2 damage to a random enemy." },
        'packet-filter': { name: "Packet Filter", description: "Start every combat with 8 Block." },
        'the-algorithm': { name: "The Algorithm", description: "Every 3rd Attack card you play deals DOUBLE damage." }
    }
};
