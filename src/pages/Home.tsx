import React, { useState } from "react";
import { Bell } from "lucide-react";
import { ProgressBarsGroup } from "../components/ProgressBars";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  const [target, setTarget] = useState(3000);
  const [targetMax] = useState(5000);

  const [dailyDd, setDailyDd] = useState(800);
  const [dailyDdMax] = useState(2500);

  const [totalDd, setTotalDd] = useState(1800);
  const [totalDdMax] = useState(5000);

  const [isVibrating, setIsVibrating] = useState(false);

  const handleNotificationClick = () => {
    if (navigator.vibrate) navigator.vibrate(150);

    setIsVibrating(true);
    setTimeout(() => setIsVibrating(false), 200);

    navigate("/notifications"); // go to Notifications page
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Brand with Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <img
                src="/scale.png"
                alt="Scalefund Logo"
                className="w-8 h-8 object-contain z-10"
              />
              <div className="absolute inset-0 rounded-full border border-gray-500 z-0" />
            </div>
            <h1
              className="text-2xl font-bold text-gray-300 tracking-tight"
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                lineHeight: "2.5rem",
              }}
            >
              Scalefund
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
            <Bell className="w-6 h-6 text-gray-300" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto p-6">
          <ProgressBarsGroup
            profitTargetValue={target}
            profitTargetMax={targetMax}
            dailyDrawdownValue={dailyDd}
            dailyDrawdownMax={dailyDdMax}
            totalDrawdownValue={totalDd}
            totalDrawdownMax={totalDdMax}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;