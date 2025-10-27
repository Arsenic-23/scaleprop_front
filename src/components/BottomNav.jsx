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
      setWavePosition((prev) => (prev >= 100 ? 0 : prev + 0.6));
    }, 70);
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
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center">
      <nav
        className="relative flex justify-between items-center px-7 py-3.5 
        w-[88vw] max-w-md mx-auto rounded-[2rem]
        border border-white/10 backdrop-blur-2xl
        bg-[linear-gradient(135deg,rgba(25,25,25,0.95),rgba(10,10,10,0.75))]
        shadow-[inset_0_1px_2px_rgba(255,255,255,0.15),0_8px_25px_rgba(0,0,0,0.6)]
        overflow-hidden animate-background bg-[length:200%_200%]"
      >
        {/* Animated glossy reflection */}
        <motion.div
          animate={{ backgroundPositionX: `${wavePosition}%` }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none 
          bg-[linear-gradient(110deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0)_100%)] 
          bg-[length:200%_100%] rounded-[2rem]"
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
              bg-black/80 text-white text-[11px] px-3 py-1.5 
              rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.4)] 
              backdrop-blur-md border border-white/10"
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
      whileTap={{ scale: 0.92 }}
      onClick={handleClick}
      onMouseDown={() => onLongPressStart(label)}
      onMouseUp={onLongPressEnd}
      onMouseLeave={onLongPressEnd}
      onTouchStart={() => onLongPressStart(label)}
      onTouchEnd={onLongPressEnd}
      className="relative flex flex-col items-center justify-center w-14"
    >
      {/* Icon */}
      <motion.div
        animate={isActive ? { scale: 1.3, y: -5 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={
          isActive
            ? "text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            : "text-gray-400 hover:text-gray-200 transition-colors"
        }
      >
        <Icon size={24} strokeWidth={2} />
      </motion.div>

      {/* Label */}
      <motion.span
        animate={{
          opacity: isActive ? 1 : 0.6,
          y: isActive ? -1 : 1,
        }}
        transition={{ duration: 0.25 }}
        className={`text-[10px] mt-0.5 ${
          isActive ? "text-cyan-400 font-medium" : "text-gray-400"
        }`}
      >
        {label}
      </motion.span>

      {/* Glowing dot indicator */}
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full 
          bg-cyan-400 shadow-glow animate-blink"
        />
      )}
    </motion.button>
  );
}