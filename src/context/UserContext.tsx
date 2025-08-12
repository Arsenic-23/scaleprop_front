// src/context/UserContext.tsx
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface User {
  id: number;
  username: string;
  first_name: string;
  photo_url?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const tg = (window as any)?.Telegram?.WebApp;

    if (!tg) {
      console.warn("⚠️ Telegram WebApp not found. Running outside Telegram?");
      return;
    }

    // Ensure Telegram is ready before reading data
    tg.ready();
    tg.expand();

    console.log("📡 Telegram initDataUnsafe:", tg.initDataUnsafe);

    if (tg.initDataUnsafe?.user) {
      setUser({
        id: tg.initDataUnsafe.user.id,
        username: tg.initDataUnsafe.user.username,
        first_name: tg.initDataUnsafe.user.first_name,
        photo_url: tg.initDataUnsafe.user.photo_url,
      });
    } else {
      console.warn("⚠️ No user data found in Telegram initDataUnsafe");
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};