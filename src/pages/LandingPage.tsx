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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-tr from-blue-900 via-indigo-800 to-purple-900 animate-background">
      <div className="absolute inset-0 z-0 opacity-40 blur-2xl bg-gradient-to-br from-cyan-500 via-indigo-500 to-fuchsia-500"></div>

      <div className="z-10 max-w-md w-full px-6 py-8 backdrop-blur-xl bg-white/10 rounded-3xl border border-white/20 shadow-xl text-center text-white">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
          📈 Scale Fund
        </h1>
        <p className="text-lg font-medium mb-6 text-indigo-200">
          Your journey to trading excellence starts here.
        </p>

        {user ? (
          <>
            {user.photo_url && (
              <img
                src={user.photo_url}
                alt="profile"
                className="w-24 h-24 rounded-full mx-auto mb-3 border-4 border-white/30 shadow-lg"
              />
            )}
            <p className="text-xl font-semibold">@{user.username || user.first_name}</p>
          </>
        ) : (
          <p className="text-gray-300 mb-4">Not inside Telegram Mini App</p>
        )}

        <button
          onClick={handleEnter}
          className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-6 py-3 text-white rounded-full font-bold shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          🚀 Enter Prop Firm
        </button>
      </div>
    </div>
  );
};

export default LandingPage;