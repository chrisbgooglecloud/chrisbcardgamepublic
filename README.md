

# System: Ascension

### A Cloud Migration Roguelite


---

## ☁️ About The Game

**System: Ascension** is a roguelite deckbuilder where you play as **Nubus**, a sentient cloud entity tasked with migrating a crumbling, rusty legacy infrastructure to a utopian Google Cloud environment.

Battle against "Technical Debt," "Spaghetti Code," and "Monolithic Servers" using a deck of cards that evolves from clumsy legacy patches to powerful enterprise solutions.

### 🎮 Key Features

- **Deckbuilding Progression**: Start with a "Legacy" deck (Duct Tape, Percussive Maintenance) and transform it into a "Modern" cloud-native arsenal (Kubernetes clusters, BigQuery data blasts).
- **Gemini Modernization Meter**: A unique mechanic powered by AI. Charge the meter to trigger **Gemini**, which inspects your legacy cards and "refactors" them into powerful, 0-cost modern equivalents in real-time.
- **Satirical World**: Explore 3 distinct Acts:
  1. **The Server Closet** (On-Prem Legacy Dustiness)
  2. **Lift & Shift Limbo** (The chaotic migration zone)
  3. **The Vertex Vanguard** (A pristine, futuristic cloud utopia)
- **Class System**: Choose your loadout:
  - **The Senior Engineer**: Focuses on automation and turrets.
  - **The Security Guardian**: Stacks block and reflects damage ("Firewall").
  - **The Data Scientist**: Scales exponentially as the battle drags on.

## 🛠️ Tech Stack

Built with modern web technologies:

- **Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **AI Integration**: [Google Gemini API](https://ai.google.dev/) (via `@google/genai`) for narrative generation and dynamic card refactoring.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/)

## 🚀 Getting Started

Follow these steps to get the game running locally on your machine.

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- A **Google Gemini API Key** (Get one [here](https://aistudio.google.com/))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/cloud-card-game-public.git
   cd cloud-card-game-public
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file in the root directory:

   ```bash
   touch .env.local
   ```

   Add your Gemini API key to it:

   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

   *(Note: Ensure the variable name matches what is used in `src/services/geminiService.ts` or `constants.ts`. Based on the codebase, it is often `VITE_GEMINI_API_KEY` for Vite apps).*

4. **Run Development Server**

   ```bash
   npm run dev
   ```

5. **Play!**
   Open your browser and navigate to `http://localhost:5173`.

## 🕹️ How to Play

1. **Combat**: Drag cards from your hand to enemies to attack, or to yourself to defend/buff.
2. **Energy**: You have 3 "Compute" (Energy) per turn. Manage it wisely.
3. **The Meter**: Every card played fills the circular **Gemini Meter**.
4. **Modernization**: When the meter is full (6 charges), Gemini randomly picks a "Legacy" card in your hand and **upgrades** it into a random Cloud card for free! use this to swing the tide of battle.
5. **Survival**: Defeat enemies, collect gold, buy relics at the "Vendor API" shop, and defeat the Boss of each Act to ascend.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Built with ❤️ by Chris Bocchicchio & Antigravity</sub>
</div>

