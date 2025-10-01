
import React, { useState } from "react";
import { Home, BarChart2, Trophy, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: BarChart2, label: "Account", path: "/account" },
  { icon: Trophy, label: "Achievements", path: "/achievements" }, // updated trophy tab
  { icon: User, label: "Profile", path: "/profile" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [popup, setPopup] = useState<string | null>(null);
  let pressTimer: ReturnType<typeof setTimeout>;

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
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50">
      <nav
        className="relative flex justify-between items-center px-6 py-3
        bg-white/70 dark:bg-neutral-900/70 
        backdrop-blur-xl shadow-lg rounded-2xl border border-white/30 dark:border-neutral-700/50 
        w-[90vw] max-w-md mx-auto"
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
              className="absolute bottom-16 left-1/2 -translate-x-1/2 
              bg-black/80 text-white px-3 py-1.5 rounded-lg text-xs shadow-lg 
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
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      onMouseDown={() => onLongPressStart(label)}
      onMouseUp={onLongPressEnd}
      onMouseLeave={onLongPressEnd}
      onTouchStart={() => onLongPressStart(label)}
      onTouchEnd={onLongPressEnd}
      className="relative flex flex-col items-center justify-center w-14"
    >
      <motion.div
        animate={isActive ? { scale: 1.2 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`${
          isActive
            ? "text-blue-500 dark:text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.65)]"
            : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
        }`}
      >
        <Icon size={22} strokeWidth={2} />
      </motion.div>

      <span
        className={`text-[11px] mt-1 transition-colors ${
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
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="absolute -bottom-2 w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400 shadow-md"
        />
      )}
    </motion.button>
  );
}