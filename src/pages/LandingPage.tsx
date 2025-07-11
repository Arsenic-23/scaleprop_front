import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<TelegramUser | null>(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg || !tg.initDataUnsafe?.user) {
      console.warn('Not running inside Telegram Mini App.');
      return;
    }

    const tgUser = tg.initDataUnsafe.user;
    const normalizedUser: TelegramUser = {
      id: tgUser.id,
      first_name: tgUser.first_name,
      username: tgUser.username,
      photo_url: tgUser.photo_url,
    };

    setUser(normalizedUser);
    localStorage.setItem('user_id', String(tgUser.id));
  }, []);

  const handleEnter = () => {
    navigate('/home');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-white text-center">
      <h1 className="text-2xl font-bold mb-4">📈 Welcome to Scale Fund</h1>

      {user ? (
        <>
          {user.photo_url && (
            <img
              src={user.photo_url}
              alt="profile"
              className="w-24 h-24 rounded-full mb-2 border shadow"
            />
          )}
          <p className="font-medium">@{user.username || 'unknown'}</p>
          <p className="text-sm text-gray-500 mb-4">ID: {user.id}</p>
        </>
      ) : (
        <p className="text-gray-500 mb-4">Not inside Telegram Mini App</p>
      )}

      <button
        onClick={handleEnter}
        className="bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
      >
        🚀 Enter Prop Firm
      </button>
    </div>
  );
};

export default LandingPage;