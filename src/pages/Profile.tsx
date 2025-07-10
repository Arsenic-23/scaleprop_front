// src/pages/Profile.tsx
import { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      setUser(tg.initDataUnsafe.user);
    }
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">👤 My Profile</h2>

      {user ? (
        <div className="inline-block bg-white border rounded-lg shadow p-4">
          <img
            src={user.photo_url}
            alt="profile"
            className="w-24 h-24 rounded-full mb-2 mx-auto border"
          />
          <p className="text-lg font-semibold">@{user.username || 'unknown'}</p>
          <p className="text-sm text-gray-500">Name: {user.first_name}</p>
          <p className="text-sm text-gray-500">User ID: {user.id}</p>
        </div>
      ) : (
        <p className="text-gray-500">Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
