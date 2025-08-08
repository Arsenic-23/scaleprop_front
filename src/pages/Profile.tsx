// src/pages/Profile.tsx
import { useEffect, useState } from "react";

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex flex-col items-center p-6 text-white">
      <h2 className="text-2xl font-extrabold mb-6 tracking-wide">
        👤 My Profile
      </h2>

      {user ? (
        <div className="bg-gray-800/60 backdrop-blur-md border border-gray-700 rounded-2xl shadow-xl p-6 w-full max-w-sm transition-transform transform hover:scale-105 duration-300">
          <div className="relative mb-4">
            <img
              src={user.photo_url}
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-indigo-500 shadow-lg mx-auto"
            />
          </div>

          <p className="text-lg font-semibold text-center">
            @{user.username || "unknown"}
          </p>
          <p className="text-sm text-gray-400 text-center mt-1">
            {user.first_name}
          </p>

          <div className="mt-4 bg-gray-900/50 rounded-lg p-3">
            <p className="text-xs text-gray-500">User ID</p>
            <p className="font-mono text-indigo-400">{user.id}</p>
          </div>

          <button
            className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 transition-all py-2 rounded-lg font-semibold shadow-md"
            onClick={() => alert("Edit profile coming soon!")}
          >
            ✏️ Edit Profile
          </button>
        </div>
      ) : (
        <p className="text-gray-400 animate-pulse">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;