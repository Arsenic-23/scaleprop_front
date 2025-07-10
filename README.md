propfirm-frontend/
├── public/                     # Static files (e.g., icons, manifest)
│   └── vite.svg
│
├── src/                        # Main source code
│   ├── assets/                 # Images, icons, illustrations
│   │   └── logo.png
│   │
│   ├── components/             # Shared UI components
│   │   ├── Header.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   └── Loader.tsx
│   │
│   ├── pages/                  # Page components (each route)
│   │   ├── LandingPage.tsx     # Telegram user entry point
│   │   ├── Home.tsx
│   │   ├── Plans.tsx
│   │   ├── Payment.tsx
│   │   ├── Account.tsx
│   │   ├── Rules.tsx
│   │   ├── Passed.tsx
│   │   ├── Payout.tsx
│   │   ├── Profile.tsx
│   │   ├── AdminPanel.tsx
│   │   ├── Announcements.tsx
│   │   └── Support.tsx
│   │
│   ├── services/               # API calls and backend communication
│   │   └── api.ts
│   │
│   ├── hooks/                  # Custom React hooks
│   │   └── useTelegram.ts      # Fetch Telegram user info
│   │
│   ├── context/                # Global context providers (user info etc.)
│   │   └── UserContext.tsx
│   │
│   ├── styles/                 # Tailwind + global styles
│   │   └── index.css
│   │
│   ├── App.tsx                 # Main routing
│   └── main.tsx                # Entry point (Vite)
│
├── .env                        # Environment variables (API URL etc.)
├── tailwind.config.ts         # Tailwind config
├── postcss.config.js          # PostCSS config
├── index.html                 # Entry HTML file
├── tsconfig.json              # TypeScript config
├── package.json
└── vite.config.ts             # Vite config