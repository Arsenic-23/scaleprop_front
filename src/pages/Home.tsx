import React, { useState, useRef } from "react";
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
  const [ripple, setRipple] = useState(false);
  const rippleTimeout = useRef<NodeJS.Timeout | null>(null);

  const triggerRipple = () => {
    setRipple(true);
    if (rippleTimeout.current) clearTimeout(rippleTimeout.current);
    rippleTimeout.current = setTimeout(() => setRipple(false), 300);
  };

  const handleNotificationClick = () => {
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
    setIsVibrating(true);
    triggerRipple();
    setTimeout(() => setIsVibrating(false), 200);
  };

  const handleLongPress = () => {
    if (navigator.vibrate) {
      navigator.vibrate([50, 100, 50]);
    }
    triggerRipple();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Brand */}
          <h1
            className="text-2xl font-extrabold text-gray-300 tracking-wide"
            style={{
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
              letterSpacing: "-0.5px",
            }}
          >
            Scalefund
          </h1>

          {/* Notification Icon */}
          <button
            aria-label="Notifications"
            onClick={handleNotificationClick}
            onContextMenu={(e) => {
              e.preventDefault();
              handleLongPress();
            }}
            className={`relative p-3 rounded-full overflow-hidden transition transform duration-150 ${
              isVibrating ? "scale-110" : "scale-100"
            }`}
          >
            {ripple && (
              <span className="absolute inset-0 bg-gray-500/30 animate-ping rounded-full"></span>
            )}
            <Bell className="w-6 h-6 text-gray-300 relative z-10" />
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