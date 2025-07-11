// src/pages/Home.tsx
import { Link } from 'react-router-dom';

const Home = () => {
  const userId = localStorage.getItem('user_id');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl p-6">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold mb-1 tracking-wide">🏠 Dashboard</h1>
          <p className="text-sm text-gray-400">User ID: <span className="font-mono">{userId}</span></p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/plans"
            className="transition-all hover:scale-105 bg-gradient-to-tr from-blue-600 to-blue-400 p-4 rounded-xl shadow-lg text-center font-semibold"
          >
            💼 Buy Challenge
          </Link>

          <Link
            to="/account"
            className="transition-all hover:scale-105 bg-gradient-to-tr from-green-600 to-green-400 p-4 rounded-xl shadow-lg text-center font-semibold"
          >
            📊 View Trading Account
          </Link>

          <Link
            to="/rules"
            className="transition-all hover:scale-105 bg-gradient-to-tr from-yellow-500 to-yellow-300 p-4 rounded-xl shadow-lg text-center font-semibold text-black"
          >
            📘 View Rules
          </Link>

          <Link
            to="/payout"
            className="transition-all hover:scale-105 bg-gradient-to-tr from-purple-600 to-purple-400 p-4 rounded-xl shadow-lg text-center font-semibold"
          >
            💸 Request Payout
          </Link>

          <Link
            to="/announcements"
            className="transition-all hover:scale-105 bg-gradient-to-tr from-indigo-600 to-indigo-400 p-4 rounded-xl shadow-lg text-center font-semibold"
          >
            📢 Announcements
          </Link>

          <Link
            to="/profile"
            className="transition-all hover:scale-105 bg-gradient-to-tr from-gray-700 to-gray-500 p-4 rounded-xl shadow-lg text-center font-semibold"
          >
            👤 My Profile
          </Link>

          <Link
            to="/support"
            className="transition-all hover:scale-105 bg-gradient-to-tr from-red-600 to-red-400 p-4 rounded-xl shadow-lg text-center font-semibold"
          >
            📞 Support
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;