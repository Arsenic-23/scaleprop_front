import {
  Wallet,
  CreditCard,
  ArrowDownCircle,
  ArrowLeft,
  Filter,
  ArrowUp,
  ArrowDown,
  Home,
  Trophy,
  User,
  Settings,
  Star, // Used for achievements/badges to match Material Symbols visually
  Rocket,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { useUser } from "../context/UserContext";

// Define the colors and styles based on the original HTML's Tailwind config
const tailwindColors = {
  primary: "#4f46e5",
  'background-dark': "#0D0D0D",
  'card-dark': "#1A1A1A",
};

// Custom component to replicate the 'sliced-bar' progress indicator
const SlicedBar = ({
  value,
  colorClass,
}: {
  value: number;
  colorClass: string;
}) => {
  const totalSlices = 10;
  const filledSlices = Math.round((value / 100) * totalSlices);
  const slices = Array.from({ length: totalSlices }, (_, i) => {
    const isFilled = i < filledSlices;
    let className = "slice flex-grow h-3"; // Increased height slightly for better visibility
    if (isFilled) {
      className += ` ${colorClass}`;
    } else {
      className += " bg-gray-800";
    }

    // Apply border-radius to the ends
    if (i === 0) {
      className += " rounded-l-full";
    }
    if (i === totalSlices - 1) {
      className += " rounded-r-full";
    }
    return <div key={i} className={className}></div>;
  });

  return <div className="flex gap-1">{slices}</div>;
};

// Simple component for a Badge/Achievement grid item
const AchievementBadge = ({
  icon: Icon,
  title,
  colorClass,
  isLocked = false,
  progress = 0,
  progressText = "",
  onClick,
}: {
  icon: React.ElementType;
  title: string;
  colorClass: string;
  isLocked?: boolean;
  progress?: number;
  progressText?: string;
  onClick?: () => void;
}) => (
  <div className="flex flex-col items-center space-y-3">
    <button
      onClick={onClick}
      disabled={isLocked}
      className={`relative flex h-20 w-20 items-center justify-center rounded-lg bg-card-dark shadow-lg ${
        isLocked
          ? "border border-gray-800 cursor-default"
          : "border border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary hover:bg-white/10 transition"
      }`}
      style={{
        '--primary': tailwindColors.primary,
        '--card-dark': tailwindColors['card-dark']
      }}
    >
      <Icon
        size={40}
        className={isLocked ? "text-gray-600" : colorClass}
      />
      {isLocked && progress > 0 && (
        <div className="absolute bottom-2 w-full px-2">
          <div className="h-1.5 w-full bg-gray-700 rounded-full">
            <div
              className="bg-primary h-1.5 rounded-full"
              style={{ width: `${progress}%`, backgroundColor: tailwindColors.primary }}
            ></div>
          </div>
        </div>
      )}
    </button>
    <p
      className={`text-sm font-medium ${
        isLocked ? "text-gray-500" : "text-white"
      }`}
    >
      {title}
    </p>
    {isLocked && progressText && (
      <p className="text-xs text-gray-600 -mt-2">{progressText}</p>
    )}
  </div>
);

// This component uses state to manage the filter and achievement pop-ups,
// replacing the Alpine.js functionality from the original HTML.
const Profile = () => {
  const { user } = useUser();
  const [showFilters, setShowFilters] = React.useState(false);
  const [openAchievement, setOpenAchievement] = React.useState<
    "profit" | "streak" | "risk" | null
  >(null);

  // Stats hardcoded from the original HTML example (mixed with the TS example)
  const stats = {
    // TS original
    accountsBought: 42, // Using as Total Trades equivalent
    totalEarnings: 12450.75, // Using as Total Profit equivalent
    totalWithdrawals: 5000, // Using as Total Payout equivalent
    joined: "2024-03-15",

    // HTML-derived performance metrics
    profitTarget: 75,
    maxDailyLoss: 25,
    maxTotalLoss: 10,
  };

  const tradingHistory = [
    {
      pair: "EUR/USD",
      type: "BUY",
      range: "1.0850 → 1.0910",
      profit: 250.5,
      date: "Oct 26, 2023",
      profitColor: "text-green-400",
      typeColor: "text-green-400",
    },
    {
      pair: "XAU/USD",
      type: "SELL",
      range: "1985.20 → 1982.10",
      profit: -120.0,
      date: "Oct 25, 2023",
      profitColor: "text-red-500",
      typeColor: "text-red-500",
    },
    {
      pair: "GBP/JPY",
      type: "BUY",
      range: "182.30 → 183.00",
      profit: 350.0,
      date: "Oct 24, 2023",
      profitColor: "text-green-400",
      typeColor: "text-green-400",
    },
  ];

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const toggleAchievement = (key: "profit" | "streak" | "risk") => {
    setOpenAchievement(openAchievement === key ? null : key);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background-dark text-gray-400 flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden bg-background-dark font-display" style={{ '--background-dark': tailwindColors['background-dark'] }}>
      <div className="flex-grow">
        {/* Header */}
        <header className="flex items-center p-4">
          <button className="text-white">
            <ArrowLeft size={24} />
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-white pr-6">
            Profile
          </h1>
        </header>

        {/* Main Content */}
        <main className="p-4">
          {/* Profile Info */}
          <section className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <img
                alt={user.first_name || "profile"}
                className="h-32 w-32 rounded-full object-cover"
                src={user.photo_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuA4SMYHkHqJZK7pReVwwIPPHPRs00tIbXv65_Bm_euJZJKfYu4Kp3u9oLjvYl3zSe77gx_6djr_yKran5vAx8nlQW-lnMKvUPmLLEMdmvnnGaGwpt-NNPo3kTNU9qyAKUmH2-_DN7CptCxaUcRkc0pHJq6jGe4L5yfkVtFLNty-W3t9eOvnMHkBGZE8BBX8i-oNLMKEhp41av2pINrgXw-j18L_HA0GxTta-S9GddHIwxSmUzvPOd9H-4h8udrQ92XPXCYCGIWnrjM"}
              />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {user.first_name || "Ethan Carter"}
            </h2>
            <p className="text-gray-400">{user.username || user.id}</p>
          </section>

          {/* Total Profit */}
          <section className="mt-8">
            <div
              className="rounded-xl p-4 text-center"
              style={{ backgroundColor: tailwindColors['card-dark'] }}
            >
              <p className="text-sm text-gray-400">Total Profit</p>
              <p className="text-4xl font-bold text-green-400">
                ${stats.totalEarnings.toFixed(2).toLocaleString()}
              </p>
            </div>
          </section>

          {/* Trade Stats */}
          <section className="mt-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-xl p-4 flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: tailwindColors['card-dark'] }}
            >
              <p className="text-sm font-medium text-gray-400">Total Trades</p>
              <p className="text-2xl font-bold text-white">
                {stats.accountsBought}
              </p>
            </div>
            <div
              className="rounded-xl p-4 flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: tailwindColors['card-dark'] }}
            >
              <p className="text-sm font-medium text-gray-400">Total Payout</p>
              <p className="text-2xl font-bold text-white">
                ${stats.totalWithdrawals.toLocaleString()}
              </p>
            </div>
          </section>

          {/* Trading History */}
          <section className="mt-8">
            <div className="flex justify-between items-center px-4 pb-2 pt-4">
              <h3 className="text-lg font-bold text-white">Trading History</h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-white flex items-center gap-1"
              >
                <Filter size={20} />
                <span className="text-sm">Filter</span>
              </button>
            </div>

            {/* Filter Dropdown (Simple transition for React) */}
            {showFilters && (
              <div
                className="bg-card-dark rounded-xl p-4 mb-4"
                style={{ backgroundColor: tailwindColors['card-dark'] }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-400 mb-1"
                      htmlFor="date-range"
                    >
                      Date Range
                    </label>
                    <input
                      className="w-full bg-background-dark border-gray-600 text-white rounded-lg text-sm p-2"
                      id="date-range"
                      type="date"
                      style={{ backgroundColor: tailwindColors['background-dark'] }}
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-medium text-gray-400 mb-1"
                      htmlFor="trade-type"
                    >
                      Trade Type
                    </label>
                    <select
                      className="w-full bg-background-dark border-gray-600 text-white rounded-lg text-sm p-2"
                      id="trade-type"
                      style={{ backgroundColor: tailwindColors['background-dark'] }}
                    >
                      <option>All</option>
                      <option>Buy</option>
                      <option>Sell</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-gray-300 text-sm py-2 px-4 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowFilters(false)}
                    className="text-white text-sm py-2 px-4 rounded-lg"
                    style={{ backgroundColor: tailwindColors.primary }}
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            {/* Trade List */}
            <div className="space-y-3 px-4">
              {tradingHistory.map((trade, index) => (
                <div
                  key={index}
                  className="bg-card-dark p-3 rounded-lg flex justify-between items-center"
                  style={{ backgroundColor: tailwindColors['card-dark'] }}
                >
                  <div>
                    <p className="font-bold text-white">
                      {trade.pair}{" "}
                      <span className={`text-xs font-normal ${trade.typeColor}`}>
                        {trade.type}
                      </span>
                    </p>
                    <p className="text-xs text-gray-400">{trade.range}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold ${trade.profitColor}`}>
                      {trade.profit > 0 ? "+" : ""}${trade.profit.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500">{trade.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Achievements & Badges */}
          <section className="mt-8">
            <h3 className="px-4 pb-2 pt-4 text-lg font-bold text-white">
              Achievements & Badges
            </h3>
            <div className="grid grid-cols-3 gap-4 p-4 text-center">
              <AchievementBadge
                icon={Star}
                title="Profit Pro"
                colorClass="text-amber-400"
                onClick={() => toggleAchievement("profit")}
              />
              <AchievementBadge
                icon={Rocket}
                title="Win Streak"
                colorClass="text-emerald-400"
                onClick={() => toggleAchievement("streak")}
              />
              <AchievementBadge
                icon={ShieldCheck}
                title="Risk Manager"
                colorClass="text-cyan-400"
                onClick={() => toggleAchievement("risk")}
              />
              <AchievementBadge
                icon={Lock}
                title="Night Owl"
                colorClass="text-gray-600"
                isLocked
                progress={60}
                progressText="30/50"
              />
              <AchievementBadge
                icon={Lock}
                title="Top 10%"
                colorClass="text-gray-600"
                isLocked
                progress={25}
                progressText="5/20"
              />
              <AchievementBadge
                icon={Lock}
                title="Master Trader"
                colorClass="text-gray-600"
                isLocked
                progress={80}
                progressText="80/100"
              />
            </div>

            {/* Achievement Details Pop-up */}
            {openAchievement && (
              <div
                className="mt-4 bg-card-dark rounded-xl p-4 transition-all duration-300 ease-in-out"
                style={{ backgroundColor: tailwindColors['card-dark'] }}
              >
                {openAchievement === "profit" && (
                  <div>
                    <h4 className="text-lg font-bold text-white">Profit Pro</h4>
                    <p className="mt-2 text-sm text-gray-400">
                      Achieve a total profit of $10,000.
                    </p>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-white">Progress</span>
                        <span className="text-green-400">
                          ${stats.totalEarnings.toFixed(2)} / $10,000
                        </span>
                      </div>
                      <div className="mt-1 w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{
                            width: `${Math.min(
                              100,
                              (stats.totalEarnings / 10000) * 100
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                {openAchievement === "streak" && (
                  <div>
                    <h4 className="text-lg font-bold text-white">Win Streak</h4>
                    <p className="mt-2 text-sm text-gray-400">
                      Achieve a 10-trade winning streak.
                    </p>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-white">Progress</span>
                        <span className="text-green-400">7 / 10</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                {openAchievement === "risk" && (
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      Risk Manager
                    </h4>
                    <p className="mt-2 text-sm text-gray-400">
                      Keep max drawdown below 5% for 30 consecutive days.
                    </p>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-white">Progress</span>
                        <span className="text-green-400">25 / 30 Days</span>
                      </div>
                      <div className="mt-1 w-full bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-green-500 h-2.5 rounded-full"
                          style={{ width: "83%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </section>

          {/* Performance Metrics */}
          <section className="mt-8">
            <h3 className="px-4 pb-2 pt-4 text-lg font-bold text-white">
              Performance
            </h3>
            <div className="space-y-6 p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-medium text-white">Profit Target</p>
                  <p className="text-sm font-medium text-green-400">
                    {stats.profitTarget}%
                  </p>
                </div>
                <SlicedBar value={stats.profitTarget} colorClass="bg-green-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-medium text-white">Max Daily Loss</p>
                  <p className="text-sm font-medium text-red-500">
                    {stats.maxDailyLoss}%
                  </p>
                </div>
                <SlicedBar value={stats.maxDailyLoss} colorClass="bg-red-500" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-medium text-white">Max Total Loss</p>
                  <p className="text-sm font-medium text-green-400">
                    {stats.maxTotalLoss}%
                  </p>
                </div>
                <SlicedBar value={stats.maxTotalLoss} colorClass="bg-green-500" />
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer Navigation (Sticky) */}
      <footer
        className="sticky bottom-0 border-t border-gray-800 backdrop-blur-sm py-2"
        style={{ backgroundColor: `${tailwindColors['background-dark']}D9` }} // ~85% opacity background-dark for blur effect
      >
        <nav className="flex justify-around">
          <a className="flex flex-col items-center gap-1 text-gray-400" href="#">
            <Home size={24} />
            <span className="text-xs font-medium">Home</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-gray-400" href="#">
            <Trophy size={24} />
            <span className="text-xs font-medium">Challenges</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-white" href="#">
            <User size={24} />
            <span className="text-xs font-medium">Profile</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-gray-400" href="#">
            <Settings size={24} />
            <span className="text-xs font-medium">Settings</span>
          </a>
        </na