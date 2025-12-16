SYSTEM: ASCENSION // MASTER DESIGN BIBLE

Version: 5.0 (Live Implementation)
Target: AI Developer / Game Engine
Directive: This document is the absolute source of truth for the game "System: Ascension". All development must adhere strictly to these specifications.

1. GAME IDENTITY & HIGH CONCEPT

Title: System: Ascension
Subtitle: A Cloud Migration Roguelite
Genre: Roguelite Deckbuilder (Turn-Based Strategy).
Core Loop: Slay the Spire meets Corporate IT Satire.
Theme: "Legacy Chaos" vs. "Modern Order."
Elevator Pitch: You play as Nubus, a sentient cloud trying to migrate a crumbling, rusty legacy infrastructure to a utopian Google Cloud environment. You start with a deck of "Junk" (Duct Tape, Percussive Maintenance) and must survive long enough to "Modernize" your deck into powerful enterprise solutions (Vertex AI, BigQuery).

2. VISUAL & AUDIO DIRECTION

A. Art Style (The "Contrast" Philosophy)

The World (Legacy): Hand-drawn, cel-shaded, messy, textured. Colors are rusty browns, dust grays, and dim ambers. Think Adventure Time meets a hoarder's basement.

The UI (Modern): Pristine, vector-based, Google Material Design. Colors are bright, opaque, and flat. This visualizes the "Overlay" of modern tech fixing the messy world.

B. Color Palette (Strict Hex Codes)

Google Blue (#4285F4): Energy, Player Skills, Selection Highlights.

Google Green (#34A853): Health (Uptime), Buffs, Success States.

Google Red (#EA4335): Enemy Health, Attack Intent, Danger/Error Logs.

Google Yellow (#FBBC04): Gold, Legendary/Rare items, Special Effects.

Clean White (#FFFFFF): Card Frames, UI Containers, Text.

C. Audio Identity

Music: A mix of Lo-Fi Hip Hop beats (Study/Focus vibes) blended with light server hums and digital chimes.

SFX:

Legacy Actions: Heavy clanks, duct tape ripping, fan whirring, grinding metal.

Cloud Actions: Clean digital pings, sci-fi warps, soft synthesizers, satisfying "completed task" chimes.

3. CHARACTERS & CLASSES

The Protagonist: NUBUS

Visual: A cute, white, puffy anthropomorphic cloud. Capable of expressive facial animations (Optimistic vs. Burned Out).

Combat Mode: Wears large Black & Red noise-canceling headphones when in battle.

Base Stats: 50 Max HP (Uptime), 3 Energy (Compute) per turn.

The Job Classes (Loadouts)

Selection determines starting Deck, Relic, and Visuals.

1. The Senior Engineer

Archetype: Automation / Efficiency.

Visual: Nubus has deep bags under eyes, holds a "World's Best Admin" coffee mug, wears a loose red tie.

Playstyle: Turrets & Passive Damage.

Starting Relic: Hotfix Script (End of Turn: Deal 2 damage to random enemy).

2. The Security Guardian

Archetype: Tank / Defense.

Visual: Nubus wears a riot helmet and holds a holographic "Firewall" riot shield.

Playstyle: Block Stacking & Thorns (Reflect Damage).

Starting Relic: Packet Filter (Start Combat: Gain 8 Block).

3. The Data Scientist

Archetype: Scaling / Ramp-up.

Visual: Nubus wears a lab coat, VR goggles, and holds a flask of bubbling purple data.

Playstyle: Exponential Growth (Cards get stronger the more they are played).

Starting Relic: The Algorithm (Passive: Every 3rd Attack card played deals double damage).

The Companion: GEMINI

Visual: A floating, sleek, diamond-shaped robot (octahedron) made of polished silver metal with a glowing blue eye.

Role: Narrator (Dry wit), Source of the "Modernization" Mechanic.

4. CORE MECHANICS & SYSTEMS

A. The Turn Loop

Start Turn: Reset Energy to 3. Reset Block to 0. Draw 5 Cards.

Player Action Phase: Player drags cards to target enemies. Energy is deducted. Effects trigger immediately.

End Turn Trigger: Player clicks "End Turn".

Discard Phase: Move all cards in Hand to Discard Pile (unless Retain). Trigger OnTurnEnd effects.

Enemy Action Phase: Enemies execute their queued Intent.

Repeat.

B. The Gemini Modernization Meter (UNIQUE FEATURE)

State: Tracks charges (0 to 6).

UI: A sleek ring next to Gemini. Segments fill in Google Colors (Blue, Red, Yellow, Green).

Trigger: +1 Charge for every card played.

Activation (at 6 Charges):

Targeting: Randomly selects 1 "Legacy" (Starter) card in the player's hand.

Visual: A blue beam connects Gemini to the card. The card shakes and glows Gold.

Transformation: The Legacy card is Removed. A random "Cloud" card (Common/Uncommon) is created in its place.

Bonus: The new card costs 0 Energy for this turn only.

C. Energy & Constraints

Playability Check: If CurrentEnergy < CardCost, the card dims gray and cannot be dragged.

Feedback: Clicking an unplayable card triggers a "Shake" animation and a toast: "Insufficient Compute."

E. Intro Sequence
1.  **Comic/Video**: Before the Title Screen, a "Comic" style intro plays (images with pan/zoom effects) to set the narrative context.
2.  **Skip**: Player can skip this sequence.

D. Cloud Operations Log (Combat Log)

UI: A collapsible "Terminal" window at the bottom left. Monospace font.

Format: [T:01] [INFO/WARNING/ERROR] Source: Message.

Usage: Logs every damage event, block gain, and enemy intent change to look like a server log.

5. THE CARD LIBRARY (DATABASE)

Global Keywords

Retain: Card is not discarded at end of turn.

Exhaust: Removed from the game when played.

Power: Grants a permanent buff.

Scry X: Look at top X cards of draw pile; discard any number.

Unplayable: Cannot be triggered manually.

I. Starter Deck ("Legacy Hardware")

Flagged is_legacy: true.

Percussive Maintenance (1 Energy | Attack): Deal 6 Damage. SFX: Bonk.

Duct Tape Patch (1 Energy | Skill): Gain 5 Block. SFX: Tape ripping.

Reboot (0 Energy | Skill): Heal 3 HP. End Turn immediately. SFX: Power down.

Coffee Break (1 Energy | Skill): Draw 2 Cards. Add "Jitters" Status to Discard. SFX: Slurping.

Spaghetti Code (1 Energy | Attack): Deal 4-8 Random Damage. SFX: Glitch noise.

Hard Drive Spin-Up (2 Energy | Attack): Deal 12 Damage. Retain. Cannot be played the turn it is drawn. SFX: HDD whirring.

II. Common Cloud Cards ("Lift & Shift")

Compute Engine (1 Energy | Attack): Deal 9 Damage.

Cloud Storage Bucket (1 Energy | Skill): Gain 6 Block. Retain 1 card in hand.

VPC Firewall (1 Energy | Skill): Gain 8 Block.

Cloud Functions (0 Energy | Attack): Deal 3 Damage. Draw 1 card.

Load Balancer (1 Energy | Skill): Discard your hand. Draw 4 new cards.

Operations Suite (1 Energy | Power): Power: Whenever you play a Power card, Heal 2 HP.

III. Uncommon Cloud Cards ("Refactoring")

Pub/Sub Scream (2 Energy | Attack): Deal 8 Damage to ALL enemies.

Preemptible VM (0 Energy | Attack): Deal 14 Damage. Exhaust.

Cloud Armor (2 Energy | Skill): Gain 12 Block. Apply Thorns 3 (Reflect 3 dmg) for 1 turn.

Dataflow Pipeline (1 Energy | Power): Power: At start of turn, Draw +1 card.

Looker Dashboard (1 Energy | Skill): Scry 3.

IAM Policy (1 Energy | Skill): Remove all Debuffs from Nubus.

IV. Rare Cloud Cards ("Enterprise Stack")

BigQuery Blast (2 Energy | Attack): Deal 15 Damage + 5 per card in Discard Pile.

Spanner Shield (3 Energy | Power): Power: Prevent death once. Set HP to 10.

GKE Swarm (3 Energy | Power): Power: Summon Turret (Deals 5 dmg/turn).

Apigee Gateway (2 Energy | Skill): Cancel Enemy Intent (Stun). Exhaust.

Anthos Hybrid (1 Energy | Skill): Play a card from your Discard Pile for free.

V. Vertex AI Cards ("The Future")

Obtained via Gemini Mechanic or Events.

The Prompt (1 Energy | Skill): Discover a card (Pick 1 of 3). It costs 0.

Model Fine-Tuning (1 Energy | Skill): Upgrade ALL cards in hand (+3 stats) for combat.

Grounding (2 Energy | Attack): Deal 20 Damage. Unblockable.

Multimodal Input (X Energy | Attack): Deal X Dmg, Gain X Block, Draw X Cards.

VI. Tech Debt (Status/Curses)

Jitters (Unplayable | Status): End of Turn: Take 1 Damage.

Latency (2 Energy | Curse): Playable but does nothing. Wastes Energy.

Legacy Code (1 Energy | Curse): OnDraw: Discard a random card.

Memory Leak (Unplayable | Status): While in hand, Max Energy is reduced by 1.

6. THE WORLD (BESTIARY & ENVIRONMENTS)

Act 1: The Server Closet (On-Prem)

Aesthetic: Dim, dusty, rusty racks, tangled cables.

Enemies:

Static Dust Bunny: Deals Thorns damage (1) if hit by Attack cards.

Spaghetti Monster: Shuffles "Tangled Wire" cards into your deck.

Spicy Fan: Glows red. Reduces player Energy.

BOSS: The Monolith. Giant rusty mainframe. Invulnerable until its 2 "Sub-Server" minions are killed.

Act 2: Lift & Shift Limbo (Migration)

Aesthetic: Construction zone in void. Yellow tape, floating platforms, glitching sky.

Enemies:

Packet Loss: Pixelated mailman. Attack forces player to Discard a card.

Race Condition: Neon runners. Gains Strength if player plays >3 cards in a turn.

404 Phantom: Ghost. 50% Dodge chance.

BOSS: The Bottleneck. Traffic cone monster. Caps cards played per turn to 3.

Act 3: Vertex Vanguard (Utopia)

Aesthetic: Pristine white, glowing holograms, glass, utopian.

Enemies:

Hallucination: Cloud clone. Shuffles fake healing cards (that hurt you) into deck.

Infinite Loop: Snake eating tail. Forces player to redraw the same hand next turn.

BOSS: The Singularity. Dark Nubus. "Total Consumption" mechanic strips Cloud cards from deck.

7. EVENTS & NARRATIVE

The Event System Logic

Nodes: Marked with ? on the Map.

Structure: Narrative Modal -> Image -> 2-3 Choices -> Result.

RNG: Events are pulled from a pool based on the current Act.

Scenarios (Summary)

The Pivot: CEO wants NFTs. Choice: Lose HP vs. Gain Gold + Curse.

Legacy Server: Old server noise. Choice: Fix (Upgrade) vs. Kill (Remove).

Headhunter: Job offer. Choice: Sell Data (Gold/-HP) vs. Elite Fight.

Hackathon: Choice: Caffeine IV (Relic) vs. Hide (Heal + Curse).

Mysterious USB: Choice: Plug in (Gamble) vs. Destroy (Remove Curse).

Deprecated API: Choice: Sacrifice Health (Get Cards) vs. Sacrifice Gold (Duplicate Card).

Standup Meeting: Choice: Admit Blocked (Heal/-Gold) vs. Lie (Upgrade/+Curse).

8. MAP & PROGRESSION

Structure

Vertical DAG: 15 Layers per Act.

Fixed Layers: Layer 1 (Start), Layer 9 (Treasure), Layer 15 (Rest), Layer 16 (Boss).

Node Types: Battle (Red Skull), Elite (Yellow Skull), Event (Blue ?), Shop (Gold Avatar), Rest (Green Wrench).

Character Selection Screen

Layout: 3 Vertical Panels.

Logic: Clicking a class sets the GlobalState and updates the "Start Migration" button.

9. TECHNICAL IMPLEMENTATION NOTES

A. Architecture & Stack

**Framework**: React (Functional Components) with TypeScript.
**Build Tool**: Vite.
**Styling**: Tailwind CSS.
**State Management**: `useState` and `useReducer` hooks within `App.tsx`. No external state libraries (Redux/Zustand) are used; state is lifted to the top-level `App` component.

B. Localization (i18n)

**System**: Custom `LanguageProvider` context.
**Languages**: English (en) and Spanish (es).
**Implementation**: All text is pulled from `src/locales/` dictionaries. The UI updates dynamically based on the selected language.

C. Enemy Intent System

Enemies must decide their move at the start of the player's turn.

Intent must be visualized with an Icon above their head (Sword=Attack, Shield=Block).

Hovering the icon shows tooltip: "Intends to deal 6 damage."

D. Animation Standards

Card Draw: Tween from Deck pile to Hand position.

Card Play: Drag and drop. On release, card moves to center, scales up, plays Effect, then moves to Discard.

Gemini Zap: Beam from Avatar to Card. No full-screen flashes.

Damage: Shake target sprite + Floating red text number (2s duration, slow float).

Attack Lunge:
*   **Player**: Sprite lunges RIGHT when playing an Attack card.
*   **Enemy**: Sprite lunges LEFT when executing an Attack intent.

10. LOOT & ECONOMY SYSTEMS

A. Post-Combat Rewards (The "Draft")

Trigger: Enemy HP hits 0.

Logic: The system generates 3 independent card choices.

Rarity Weights (Standard Battle):

Common: 60% Chance (Roll 0-59)

Uncommon: 37% Chance (Roll 60-96)

Rare: 3% Chance (Roll 97-99)

Rarity Weights (Elite Battle):

Common: 45% Chance

Uncommon: 40% Chance

Rare: 15% Chance

Constraints:

Never generate "Legacy" (Starter) or "Curse" cards in rewards.

Never offer duplicate cards in the same draft of 3.

B. The Shop System (Vendor Node)

Visual: The "Customer Engineer" NPC appears with a holographic store interface.

Inventory Slots (Fixed Layout):

Slot 1 & 2: Attack Cards.

Slot 3 & 4: Skill Cards.

Slot 5: Power Card.

Slot 6 & 7: Relics.

Slot 8: Card Removal Service.

Shop Card Rarity Weights:

Common: 45%

Uncommon: 40%

Rare: 15%

Pricing Logic:

Common Card: 45 - 55 Gold.

Uncommon Card: 70 - 80 Gold.

Rare Card: 140 - 160 Gold.

Card Removal: Starts at 75 Gold. Increases by +25 Gold each time it is purchased in the same run.