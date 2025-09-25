import React, { useState } from "react";
import { Bell } from "lucide-react";
import { ProgressBarsGroup } from "../components/ProgressBars";

/* -------------------------
   Main Page
   ------------------------- */
const Home: React.FC = () => {
  const [target, setTarget] = useState(3000);
  const [targetMax] = useState(5000);

  const [dailyDd, setDailyDd] = useState(800);
  const [dailyDdMax] = useState(2500);

  const [totalDd, setTotalDd] = useState(1800);
  const [totalDdMax] = useState(5000);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Brand */}
          <h1 className="text-xl font-bold tracking-tight">Scalefund</h1>

          {/* Notification Icon */}
          <button
            aria-label="Notifications"
            className="p-2 rounded-full hover:bg-white/10 transition"
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