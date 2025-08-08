import React from "react";
import { Link } from "react-router-dom";
import BottomNav from "../components/BottomNav";

const Home = () => {
  const userId = localStorage.getItem("user_id");

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex flex-col pb-20">
      {/* Dashboard Header */}
      <div className="p-6 text-center border-b border-white/10">
        <h1 className="text-3xl font-extrabold tracking-wide">📊 Dashboard</h1>
        <p className="text-sm text-gray-400">
          User ID: <span className="font-mono">{userId}</span>
        </p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-6">
        <StatCard title="Account Balance" value="$50,000" color="from-green-500 to-emerald-400" />
        <StatCard title="Profit Target" value="$5,000" color="from-blue-500 to-cyan-400" />
        <StatCard title="Max Drawdown" value="$2,500" color="from-red-500 to-pink-400" />
      </div>

      {/* Action Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-6">
        <ActionCard to="/plans" label="Buy Challenge" emoji="💼" color="from-blue-600 to-blue-400" />
        <ActionCard to="/account" label="Trading Account" emoji="📊" color="from-green-600 to-green-400" />
        <ActionCard to="/rules" label="View Rules" emoji="📘" color="from-yellow-500 to-yellow-300" darkText />
        <ActionCard to="/payout" label="Request Payout" emoji="💸" color="from-purple-600 to-purple-400" />
        <ActionCard to="/announcements" label="Announcements" emoji="📢" color="from-indigo-600 to-indigo-400" />
        <ActionCard to="/profile" label="My Profile" emoji="👤" color="from-gray-700 to-gray-500" />
        <ActionCard to="/support" label="Support" emoji="📞" color="from-red-600 to-red-400" />
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
};

const StatCard = ({ title, value, color }: { title: string; value: string; color: string }) => (
  <div
    className={`p-4 rounded-xl shadow-lg text-center bg-gradient-to-tr ${color} transform transition hover:scale-105`}
  >
    <p className="text-sm opacity-80">{title}</p>
    <h2 className="text-2xl font-bold">{value}</h2>
  </div>
);

const ActionCard = ({
  to,
  label,
  emoji,
  color,
  darkText = false,
}: {
  to: string;
  label: string;
  emoji: string;
  color: string;
  darkText?: boolean;
}) => (
  <Link
    to={to}
    className={`transition-all hover:scale-105 bg-gradient-to-tr ${color} p-4 rounded-xl shadow-lg text-center font-semibold ${
      darkText ? "text-black" : "text-white"
    }`}
  >
    <div className="text-2xl mb-1">{emoji}</div>
    {label}
  </Link>
);

export default Home;