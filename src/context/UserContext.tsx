import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

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
  const [user, setUser] = useState<User | null>(() => {
    // Load cached user instantly
    const cached = localStorage.getItem("tg_user");
    return cached ? JSON.parse(cached) : null;
  });

  useEffect(() => {
    const tgUser = (window as any)?.Telegram?.WebApp?.initDataUnsafe?.user;
    if (tgUser) {
      const newUser: User = {
        id: tgUser.id,
        username: tgUser.username,
        first_name: tgUser.first_name,
        photo_url: tgUser.photo_url,
      };
      setUser(newUser);
      localStorage.setItem("tg_user", JSON.stringify(newUser));
      if (newUser.id) {
        localStorage.setItem("user_id", newUser.id.toString());
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};