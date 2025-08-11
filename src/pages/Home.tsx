import React from "react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const Home = () => {
  const userId = localStorage.getItem("user_id");

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white flex flex-col pb-24">
      {/* Dashboard Header */}
      <div className="p-6 text-center border-b border-white/10 backdrop-blur-lg bg-white/5">
        <h1 className="text-3xl font-extrabold tracking-wide">📊 Trading Dashboard</h1>
        <p className="text-sm text-gray-400 mt-1">
          User ID: <span className="font-mono">{userId}</span>
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-6">
        <StatCard title="Account Balance" value="$50,000" accent="green" />
        <StatCard title="Profit Target" value="$5,000" accent="blue" />
        <StatCard title="Max Drawdown" value="$2,500" accent="red" />
      </div>

      {/* Quick Actions */}
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4 tracking-wide text-gray-300">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <ActionTile to="/plans" label="Buy Challenge" emoji="💼" accent="blue" />
          <ActionTile to="/account" label="Trading Account" emoji="📊" accent="green" />
          <ActionTile to="/rules" label="View Rules" emoji="📘" accent="yellow" />
          <ActionTile to="/payout" label="Request Payout" emoji="💸" accent="purple" />
          <ActionTile to="/announcements" label="Announcements" emoji="📢" accent="indigo" />
          <ActionTile to="/profile" label="My Profile" emoji="👤" accent="gray" />
          <ActionTile to="/support" label="Support" emoji="📞" accent="red" />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

// Premium Stat Card
const StatCard = ({
  title,
  value,
  accent,
}: {
  title: string;
  value: string;
  accent: "green" | "blue" | "red";
}) => {
  const colors: Record<typeof accent, string> = {
    green: "from-green-500/20 to-green-500/5 border-green-400/30 text-green-400",
    blue: "from-blue-500/20 to-blue-500/5 border-blue-400/30 text-blue-400",
    red: "from-red-500/20 to-red-500/5 border-red-400/30 text-red-400",
  };

  return (
    <div
      className={`p-5 rounded-2xl shadow-lg backdrop-blur-md border bg-gradient-to-br ${colors[accent]} transform transition hover:scale-105 hover:shadow-${accent}-500/30`}
    >
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-bold mt-1">{value}</h2>
    </div>
  );
};

// Action Tile Component
const ActionTile = ({
  to,
  label,
  emoji,
  accent,
}: {
  to: string;
  label: string;
  emoji: string;
  accent:
    | "blue"
    | "green"
    | "yellow"
    | "purple"
    | "indigo"
    | "gray"
    | "red";
}) => {
  const accentMap: Record<typeof accent, string> = {
    blue: "hover:border-blue-400/40 hover:shadow-blue-500/20",
    green: "hover:border-green-400/40 hover:shadow-green-500/20",
    yellow: "hover:border-yellow-400/40 hover:shadow-yellow-500/20",
    purple: "hover:border-purple-400/40 hover:shadow-purple-500/20",
    indigo: "hover:border-indigo-400/40 hover:shadow-indigo-500/20",
    gray: "hover:border-gray-400/40 hover:shadow-gray-500/20",
    red: "hover:border-red-400/40 hover:shadow-red-500/20",
  };

  return (
    <Link
      to={to}
      className={`p-4 rounded-xl backdrop-blur-lg bg-white/5 border border-white/10 text-center font-medium transition-all duration-300 transform hover:scale-105 ${accentMap[accent]}`}
    >
      <div className="text-2xl mb-1">{emoji}</div>
      <span className="text-sm">{label}</span>
    </Link>
  );
};

export default Home;