
// src/pages/Profile.tsx
import { Wallet, CreditCard, ArrowDownCircle } from "lucide-react";
import { useUser } from "../context/UserContext";

const Profile = () => {
  const { user } = useUser();

  const stats = {
    accountsBought: 42,
    totalEarnings: 15600,
    totalWithdrawals: 8200,
    joined: "2024-03-15",
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black text-gray-400 flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-8">
      <h2 className="text-2xl font-extrabold mb-8 tracking-wide text-center">
        👤 My Profile
      </h2>

      <div className="max-w-md mx-auto space-y-6">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 text-center hover:scale-[1.02] transition-transform duration-300">
          <img
            src={user.photo_url}
            alt="profile"
            className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-lg mx-auto mb-4"
          />
          <p className="text-lg font-semibold">@{user.username || "unknown"}</p>
          <p className="text-sm text-gray-400">{user.first_name}</p>
          <div className="mt-4 bg-black/40 rounded-lg p-3">
            <p className="text-xs text-gray-500">User ID</p>
            <p className="font-mono text-indigo-400">{user.id}</p>
          </div>
          <div className="mt-3 text-xs text-gray-400">
            Joined on {formatDate(stats.joined)}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10 text-center shadow-md hover:scale-105 transition">
            <Wallet className="mx-auto text-green-400 mb-2" size={28} />
            <p className="text-sm text-gray-400">Accounts Bought</p>
            <p className="text-lg font-bold">{stats.accountsBought}</p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10 text-center shadow-md hover:scale-105 transition">
            <CreditCard className="mx-auto text-blue-400 mb-2" size={28} />
            <p className="text-sm text-gray-400">Total Earnings</p>
            <p className="text-lg font-bold text-green-400">
              ₹{stats.totalEarnings.toLocaleString()}
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10 text-center shadow-md hover:scale-105 transition">
            <ArrowDownCircle className="mx-auto text-red-400 mb-2" size={28} />
            <p className="text-sm text-gray-400">Total Withdrawals</p>
            <p className="text-lg font-bold text-red-400">
              ₹{stats.totalWithdrawals.toLocaleString()}
            </p>
          </div>
        </div>

        <button
          className="w-full bg-indigo-600 hover:bg-indigo-500 transition-all py-3 rounded-lg font-semibold shadow-lg hover:shadow-indigo-500/30"
          onClick={() => alert("Edit profile coming soon!")}
        >
          ✏️ Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;