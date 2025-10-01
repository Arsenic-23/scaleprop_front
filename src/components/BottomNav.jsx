
import React, { useState } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: BarChart2, label: "Account", path: "/account" },
  { icon: Users, label: "Community", path: "/community" },
  { icon: User, label: "Profile", path: "/profile" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [popup, setPopup] = useState<string | null>(null);
  let pressTimer: any;

  const handleLongPressStart = (label: string) => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate([30, 20, 30]);
    }
    pressTimer = setTimeout(() => setPopup(label), 500);
  };

  const handleLongPressEnd = () => {
    clearTimeout(pressTimer);
    setPopup(null);
  };

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <nav
        className="relative flex justify-between items-center px-5 py-2.5
        bg-white/80 dark:bg-neutral-900/80
        backdrop-blur-lg shadow-lg rounded-xl border border-white/20 dark:border-neutral-700/50
        w-[85vw] max-w-md mx-auto"
      >
        {tabs.map((tab, index) => (
          <NavItem
            key={index}
            icon={tab.icon}
            label={tab.label}
            path={tab.path}
            currentPath={location.pathname}
            navigate={navigate}
            onLongPressStart={handleLongPressStart}
            onLongPressEnd={handleLongPressEnd}
          />
        ))}

        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              className="absolute bottom-14 left-1/2 -translate-x-1/2
              bg-black/80 text-white px-3 py-1.5 rounded-lg text-xs shadow-md
              dark:bg-white/10 backdrop-blur-md"
            >
              {popup}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

function NavItem({
  icon: Icon,
  label,
  path,
  currentPath,
  navigate,
  onLongPressStart,
  onLongPressEnd,
}: {
  icon: React.ComponentType<any>;
  label: string;
  path: string;
  currentPath: string;
  navigate: (path: string) => void;
  onLongPressStart: (label: string) => void;
  onLongPressEnd: () => void;
}) {
  const isActive = currentPath === path;

  const handleClick = () => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate([10, 15, 10]);
    }
    navigate(path);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      onClick={handleClick}
      onMouseDown={() => onLongPressStart(label)}
      onMouseUp={onLongPressEnd}
      onMouseLeave={onLongPressEnd}
      onTouchStart={() => onLongPressStart(label)}
      onTouchEnd={onLongPressEnd}
      className="relative flex flex-col items-center justify-center w-12"
    >
      <motion.div
        animate={isActive ? { scale: 1.15 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 18 }}
        className={
          isActive
            ? "text-blue-500 dark:text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]"
            : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
        }
      >
        <Icon size={20} strokeWidth={2} />
      </motion.div>

      <span
        className={`text-[10px] mt-0.5 transition-colors ${
          isActive
            ? "text-blue-500 dark:text-blue-400 font-medium"
            : "text-gray-400"
        }`}
      >
        {label}
      </span>

      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shadow-md"
        />
      )}
    </motion.button>
  );
}