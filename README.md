# ScaleFund (ScaleProp) Frontend 🚀


ScaleFund is the premium front-end application for a modern proprietary trading platform. Built with a focus on high performance, seamless user experience, and dark-mode-first premium aesthetics, this application provides users with all the tools they need to manage their trading accounts, participate in funded challenges, and track their payouts. It is seamlessly integrated as a Telegram Mini App and built as a modern Progressive Web App (PWA).

## 🌟 Key Features

- **Modern Tech Stack**: React 18, Vite, and TypeScript for blazing fast performance.
- **Premium UI/UX**: Designed with a sleek dark-mode aesthetic utilizing Tailwind CSS and Shadcn UI.
- **Fluid Animations**: Smooth transitions and micro-interactions powered by Framer Motion and GSAP.
- **Comprehensive Dashboards**: Interactive charts and progress tracking built with Recharts and Chart.js.
- **Telegram Mini App Ready**: Deep integration with the Telegram Apps SDK (`@telegram-apps/sdk`) for a frictionless mobile experience.
- **Robust Routing**: Client-side routing managed by React Router DOM, with protected private routes.
- **Real-Time Database Integration**: Built-in support for Firebase to handle real-time data sync.
- **PWA Support**: Built to function as a Progressive Web App (PWA) with installable manifests and offline capabilities.

## 🏗️ Architecture & Tech Stack

- **Framework**: [React](https://reactjs.org/) (v18.2)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Shadcn UI](https://ui.shadcn.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Charting**: [Recharts](https://recharts.org/) & [Chart.js](https://www.chartjs.org/)
- **Backend/Auth**: [Firebase](https://firebase.google.com/)
- **Integration**: [Telegram Apps SDK](https://core.telegram.org/bots/webapps)

## 📁 Project Structure

```text
src/
├── components/   # Reusable UI components (GlassCard, BottomNav, Modals, etc.)
├── context/      # React Context providers (UserContext)
├── hooks/        # Custom React hooks
├── pages/        # Main application views (Home, Account, Plans, Payment, Admin Panel)
│   └── support/  # Support sub-pages (FAQs, KnowledgeBase, LiveSupport)
├── services/     # API calls, Firebase initialization and logic
├── styles/       # Global CSS and Tailwind configurations
├── App.tsx       # Root application layout and routing
└── main.tsx      # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn or pnpm

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/scaleprop_front.git
   cd scaleprop_front
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Environment Setup:**

   Create a `.env` file in the root directory based on `.env.example` (or use the following variables):

   ```env
   VITE_API_BASE_URL=https://your-backend-url.com/api
   ```
   *(Add your Firebase config details in `src/firebase.config.ts` if needed)*

4. **Run the development server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## 🛠️ Scripts

- `npm run dev`: Starts the Vite development server.
- `npm run build`: Compiles TypeScript and builds the app for production.
- `npm run preview`: Bootstraps a local static web server to preview the production build.

## 🤝 Contributing

Contributions are welcome! If you'd like to improve the ScaleFund frontend, please open an issue or submit a pull request. 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the terms described in the `LICENSE` file.
