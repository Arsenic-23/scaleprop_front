// src/context/UserContext.tsx
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { init, isTMA } from "@telegram-apps/sdk";

interface User {
  id: number;
  username?: string;
  first_name: string;
  last_name?: string;
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
    const fetchUser = async () => {
      try {
        if (await isTMA()) {
          init();
          const tg = (window as any)?.Telegram?.WebApp;
          tg?.ready();

          const tgUser = tg?.initDataUnsafe?.user;
          if (tgUser) {
            const parsedUser: User = {
              id: tgUser.id,
              username: tgUser.username,
              first_name: tgUser.first_name,
              last_name: tgUser.last_name,
              photo_url: tgUser.photo_url,
            };
            setUser(parsedUser);
            localStorage.setItem("tg_user", JSON.stringify(parsedUser));
            return;
          }
        }

        // Fallback to localStorage if outside Telegram or no data
        const cachedUser = localStorage.getItem("tg_user");
        if (cachedUser) {
          setUser(JSON.parse(cachedUser));
        }
      } catch (err) {
        console.error("Error fetching Telegram user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};