import React, { useState, useEffect } from "react";
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
  const [popup, setPopup] = useState(null);
  const [wavePosition, setWavePosition] = useState(0);
  let pressTimer;

  useEffect(() => {
    const waveInterval = setInterval(() => {
      setWavePosition((prev) => (prev >= 100 ? 0 : prev + 0.7));
    }, 60);
    return () => clearInterval(waveInterval);
  }, []);

  const handleLongPressStart = (label) => {
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
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center">
      <nav
        className="relative flex justify-between items-center px-6 py-3 
        w-[88vw] max-w-md mx-auto rounded-[2rem] 
        border border-white/20 dark:border-white/10 
        backdrop-blur-2xl bg-gradient-to-br from-white/25 via-white/10 to-white/5 
        dark:from-neutral-900/40 dark:via-neutral-900/20 dark:to-neutral-900/10
        shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_25px_rgba(0,0,0,0.25)]
        overflow-hidden"
      >
        {/* Animated glossy reflection */}
        <motion.div
          animate={{ backgroundPositionX: `${wavePosition}%` }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none bg-[linear-gradient(110deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.1)_45%,rgba(255,255,255,0)_100%)] bg-[length:200%_100%] rounded-[2rem]"
        />

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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2
              bg-black/70 dark:bg-white/10 text-white text-[11px] px-3 py-1.5 
              rounded-lg shadow-lg backdrop-blur-md border border-white/10"
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
        animate={isActive ? { scale: 1.25, y: -4 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={
          isActive
            ? "text-blue-500 dark:text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.9)]"
            : "text-gray-400 dark:text-gray-500 hover:text-gray-200 transition-colors"
        }
      >
        <Icon size={23} strokeWidth={2.1} />
      </motion.div>

      <motion.span
        animate={{
          opacity: isActive ? 1 : 0.6,
          y: isActive ? -1 : 1,
        }}
        transition={{ duration: 0.25 }}
        className={`text-[10px] mt-0.5 ${
          isActive
            ? "text-blue-500 dark:text-blue-400 font-medium"
            : "text-gray-400"
        }`}
      >
        {label}
      </motion.span>

      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full 
          bg-blue-500 dark:bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]"
        />
      )}
    </motion.button>
  );
}
