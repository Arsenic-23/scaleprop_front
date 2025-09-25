// src/pages/Home.tsx
import React, { useState } from "react";
import { Bell } from "lucide-react";
import { ProgressBarsGroup } from "../components/ProgressBars";

const Home: React.FC = () => {
  const [target, setTarget] = useState(3000);
  const [targetMax] = useState(5000);

  const [dailyDd, setDailyDd] = useState(800);
  const [dailyDdMax] = useState(2500);

  const [totalDd, setTotalDd] = useState(1800);
  const [totalDdMax] = useState(5000);

  const [isVibrating, setIsVibrating] = useState(false);

  const handleNotificationClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(150);
    }
    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Brand with Logo and Grey Circle */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="Scalefund Logo"
                className="w-8 h-8 object-contain z-10"
              />
              {/* Grey Ring overlay */}
              <div className="absolute inset-0 rounded-full border-2 border-gray-500 z-0" />
            </div>
            <h1
              className="text-2xl font-bold text-gray-300 tracking-tight"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                lineHeight: "2.5rem", // vertically center with logo
              }}
            >
              Scale Fund
            </h1>
          </div>

          {/* Notification Icon */}
          <button
            aria-label="Notifications"
            onClick={handleNotificationClick}
            className={`p-2 rounded-full transition transform duration-150 ${
              isVibrating ? "scale-110" : "scale-100"
            }`}
          >
            <Bell className="w-5 h-5 text-gray-300" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          <ProgressBarsGroup
            target={target}
            targetMax={targetMax}
            dailyDd={dailyDd}
            dailyDdMax={dailyDdMax}
            totalDd={totalDd}
            totalDdMax={totalDdMax}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
