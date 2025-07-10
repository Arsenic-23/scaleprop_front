// src/pages/Home.tsx
import { Link } from 'react-router-dom';

const Home = () => {
  const userId = localStorage.getItem('user_id');

  return (
    <div className="p-4 text-center">
      <h1 className="text-xl font-bold mb-2">🏠 Dashboard</h1>
      <p className="text-sm text-gray-500 mb-4">User ID: {userId}</p>

      <div className="grid gap-4">
        <Link to="/plans" className="block bg-blue-500 text-white p-3 rounded shadow">
          💼 Buy Challenge
        </Link>
        <Link to="/account" className="block bg-green-500 text-white p-3 rounded shadow">
          📊 View Trading Account
        </Link>
        <Link to="/rules" className="block bg-yellow-500 text-white p-3 rounded shadow">
          📘 View Rules
        </Link>
        <Link to="/payout" className="block bg-purple-500 text-white p-3 rounded shadow">
          💸 Request Payout
        </Link>
        <Link to="/announcements" className="block bg-indigo-500 text-white p-3 rounded shadow">
          📢 Announcements
        </Link>
        <Link to="/profile" className="block bg-gray-700 text-white p-3 rounded shadow">
          👤 My Profile
        </Link>
        <Link to="/support" className="block bg-red-500 text-white p-3 rounded shadow">
          📞 Support
        </Link>
      </div>
    </div>
  );
};

export default Home;
