import React from "react";
import {
  ArrowLeft,
  Filter,
  Home,
  Trophy,
  User,
  Settings,
  Star,
  Rocket,
  ShieldCheck,
  Lock,
} from "lucide-react";
// import { useUser } from "../context/UserContext"; // Removed useUser import

// Mock User Data for direct display
const mockUser = {
  id: "mock-user-123",
  first_name: "Mock Trader",
  username: "ProMockster",
  photo_url: "https://i.pravatar.cc/150?img=6", // Placeholder image URL
};

type AchievementKey = "profit" | "streak" | "risk";

const tailwindColors = {
  primary: "#4f46e5",
  "background-dark": "#0D0D0D",
  "card-dark": "#1A1A1A",
};

const formatCurrency = (v: number) =>
  `$${v.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const TOTAL_SLICES = 10;
const SlicedBar: React.FC<{ value: number; fillColor?: string }> = ({
  value,
  fillColor = "#10B981",
}) => {
  const filledSlices = Math.round((value / 100) * TOTAL_SLICES);

  return (
    <div className="flex gap-1">
      {Array.from({ length: TOTAL_SLICES }).map((_, i) => {
        const isFilled = i < filledSlices;
        return (
          <div
            key={i}
            style={{
              backgroundColor: isFilled ? fillColor : "#111827",
              height: 12,
              flex: 1,
              borderRadius: i === 0 || i === TOTAL_SLICES - 1 ? 9999 : 0,
            }}
          />
        );
      })}
    </div>
  );
};

const AchievementBadge: React.FC<{
  icon: React.ElementType;
  title: string;
  colorClass?: string;
  isLocked?: boolean;
  progress?: number;
  progressText?: string;
  onClick?: () => void;
}> = ({
  icon: Icon,
  title,
  colorClass = "text-white",
  isLocked = false,
  progress = 0,
  progressText,
  onClick,
}) => {
  const isProgressVisible = isLocked && progress > 0;
  const borderColor = isLocked ? "#2d2d2d" : "#374151";

  return (
    <div className="flex flex-col items-center space-y-2">
      <button
        onClick={onClick}
        disabled={isLocked}
        className={`relative flex h-20 w-20 items-center justify-center rounded-lg shadow-lg border ${
          isLocked ? "cursor-default" : "cursor-pointer"
        }`}
        style={{
          backgroundColor: tailwindColors["card-dark"],
          borderColor: borderColor,
        }}
      >
        <Icon size={40} className={isLocked ? "text-gray-500" : colorClass} />

        {isProgressVisible && (
          <div className="absolute bottom-2 w-full px-2">
            <div
              className="h-1.5 rounded-full"
              style={{ backgroundColor: "#374151" }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${progress}%`,
                  backgroundColor: tailwindColors.primary,
                }}
              />
            </div>
          </div>
        )}
      </button>

      <p
        className={`text-sm font-medium ${
          isLocked ? "text-gray-400" : "text-white"
        }`}
      >
        {title}
      </p>
      {isLocked && progressText && (
        <p className="text-xs text-gray-500 -mt-1">{progressText}</p>
      )}
    </div>
  );
};

const Profile: React.FC = () => {
  // Replaced useUser() with a direct mock user assignment
  const user = mockUser;
  const [showFilters, setShowFilters] = React.useState(false);
  const [openAchievement, setOpenAchievement] =
    React.useState<AchievementKey | null>(null);

  const stats = {
    accountsBought: 42,
    totalEarnings: 12450.75,
    totalWithdrawals: 5000,
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

  const toggleAchievement = (key: AchievementKey) => {
    setOpenAchievement(openAchievement === key ? null : key);
  };

  // Removed the conditional loading block (`if (!user) { ... }`)

  const profitProgress = Math.min(100, (stats.totalEarnings / 10000) * 100);

  return (
    <div
      className="relative flex min-h-screen w-full flex-col justify-between overflow-x-hidden font-display"
      style={{ backgroundColor: tailwindColors["background-dark"] }}
    >
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
                alt={user.first_name}
                className="h-32 w-32 rounded-full object-cover"
                src={user.photo_url}
              />
            </div>
            <h2 className="text-2xl font-bold text-white">
              {user.first_name}
            </h2>
            <p className="text-gray-400">{user.username || user.id}</p>
          </section>

          {/* Total Profit */}
          <section className="mt-8">
            <div
              className="rounded-xl p-4 text-center"
              style={{ backgroundColor: tailwindColors["card-dark"] }}
            >
              <p className="text-sm text-gray-400">Total Profit</p>
              <p className="text-4xl font-bold text-green-400">
                {formatCurrency(stats.totalEarnings)}
              </p>
            </div>
          </section>

          {/* Trade Stats */}
          <section className="mt-6 grid grid-cols-2 gap-4">
            <div
              className="rounded-xl p-4 flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: tailwindColors["card-dark"] }}
            >
              <p className="text-sm font-medium text-gray-400">Total Trades</p>
              <p className="text-2xl font-bold text-white">
                {stats.accountsBought}
              </p>
            </div>
            <div
              className="rounded-xl p-4 flex flex-col items-center justify-center text-center"
              style={{ backgroundColor: tailwindColors["card-dark"] }}
            >
              <p className="text-sm font-medium text-gray-400">Total Payout</p>
              <p className="text-2xl font-bold text-white">
                {formatCurrency(stats.totalWithdrawals)}
              </p>
            </div>
          </section>

          {/* Trading History */}
          <section className="mt-8">
            <div className="flex justify-between items-center px-4 pb-2 pt-4">
              <h3 className="text-lg font-bold text-white">
                Trading History
              </h3>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="text-white flex items-center gap-1"
              >
                <Filter size={20} />
                <span className="text-sm">Filter</span>
              </button>
            </div>

            {/* Filter Dropdown */}
            {showFilters && (
              <div
                className="rounded-xl p-4 mb-4"
                style={{ backgroundColor: tailwindColors["card-dark"] }}
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
                      className="w-full bg-transparent border-gray-600 text-white rounded-lg text-sm p-2"
                      id="date-range"
                      type="date"
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
                      className="w-full bg-transparent border-gray-600 text-white rounded-lg text-sm p-2"
                      id="trade-type"
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
                  className="p-3 rounded-lg flex justify-between items-center"
                  style={{ backgroundColor: tailwindColors["card-dark"] }}
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
                      {trade.profit > 0 ? "+" : ""}
                      {formatCurrency(trade.profit)}
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
                onClick={() => toggleAchievement("profit" as AchievementKey)}
              />
              <AchievementBadge
                icon={Rocket}
                title="Win Streak"
                colorClass="text-emerald-400"
                onClick={() => toggleAchievement("streak" as AchievementKey)}
              />
              <AchievementBadge
                icon={ShieldCheck}
                title="Risk Manager"
                colorClass="text-cyan-400"
                onClick={() => toggleAchievement("risk" as AchievementKey)}
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
                className="mt-4 rounded-xl p-4"
                style={{ backgroundColor: tailwindColors["card-dark"] }}
              >
                {openAchievement === "profit" && (
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      Profit Pro
                    </h4>
                    <p className="mt-2 text-sm text-gray-400">
                      Achieve a total profit of $10,000.
                    </p>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-white">Progress</span>
                        <span className="text-green-400">
                          {formatCurrency(stats.totalEarnings)} / $10,000
                        </span>
                      </div>
                      <div
                        className="mt-1 w-full h-2 rounded-full"
                        style={{ backgroundColor: "#374151" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${profitProgress}%`,
                            backgroundColor: "#10B981",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {openAchievement === "streak" && (
                  <div>
                    <h4 className="text-lg font-bold text-white">
                      Win Streak
                    </h4>
                    <p className="mt-2 text-sm text-gray-400">
                      Achieve a 10-trade winning streak.
                    </p>
                    <div className="mt-3">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-white">Progress</span>
                        <span className="text-green-400">7 / 10</span>
                      </div>
                      <div
                        className="mt-1 w-full h-2 rounded-full"
                        style={{ backgroundColor: "#374151" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `70%`,
                            backgroundColor: "#10B981",
                          }}
                        />
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
                      <div
                        className="mt-1 w-full h-2 rounded-full"
                        style={{ backgroundColor: "#374151" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `83%`,
                            backgroundColor: "#10B981",
                          }}
                        />
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
                <SlicedBar value={stats.profitTarget} fillColor="#10B981" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-medium text-white">Max Daily Loss</p>
                  <p className="text-sm font-medium text-red-500">
                    {stats.maxDailyLoss}%
                  </p>
                </div>
                <SlicedBar value={stats.maxDailyLoss} fillColor="#EF4444" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <p className="font-medium text-white">Max Total Loss</p>
                  <p className="text-sm font-medium text-green-400">
                    {stats.maxTotalLoss}%
                  </p>
                </div>
                <SlicedBar value={stats.maxTotalLoss} fillColor="#10B981" />
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer Navigation (Sticky) */}
      <footer
        className="sticky bottom-0 border-t border-gray-800 backdrop-blur-sm py-2"
        style={{ backgroundColor: `${tailwindColors["background-dark"]}D9` }}
      >
        <nav className="flex justify-around">
          <a
            className="flex flex-col items-center gap-1 text-gray-400"
            href="#"
          >
            <Home size={24} />
            <span className="text-xs font-medium">Home</span>
          </a>
          <a
            className="flex flex-col items-center gap-1 text-gray-400"
            href="#"
          >
            <Trophy size={24} />
            <span className="text-xs font-medium">Challenges</span>
          </a>
          <a className="flex flex-col items-center gap-1 text-white" href="#">
            <User size={24} />
            <span className="text-xs font-medium">Profile</span>
          </a>
          <a
            className="flex flex-col items-center gap-1 text-gray-400"
            href="#"
          >
            <Settings size={24} />
            <span className="text-xs font-medium">Settings</span>
          </a>
        </nav>
      </footer>
    </div>
  );
};

export default Profile;
