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

  // Subtle moving reflection animation
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setWavePosition((prev) => (prev >= 100 ? 0 : prev + 0.6));
    }, 70);
    return () => clearInterval(waveInterval);
  }, []);

  const handleLongPressStart = (label) => {
    if (window.navigator.vibrate) window.navigator.vibrate([30, 20, 30]);
    pressTimer = setTimeout(() => setPopup(label), 500);
  };

  const handleLongPressEnd = () => {
    clearTimeout(pressTimer);
    setPopup(null);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center">
      <nav
        className="relative flex justify-between items-center px-8 py-3.5 
        w-[82vw] max-w-md mx-auto rounded-[2rem] overflow-hidden
        border border-white/15 backdrop-blur-2xl
        bg-[linear-gradient(145deg,rgba(25,25,25,0.9),rgba(10,10,10,0.65))]
        shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-2px_6px_rgba(0,0,0,0.6),0_6px_25px_rgba(0,0,0,0.6)]"
      >
        {/* Moving glossy highlight reflection */}
        <motion.div
          animate={{ backgroundPositionX: `${wavePosition}%` }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none 
          bg-[linear-gradient(110deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.03)_40%,rgba(255,255,255,0)_80%)] 
          bg-[length:200%_100%] rounded-[2rem]"
        />

        {/* Inner light ring edges */}
        <div className="absolute inset-0 rounded-[2rem] border border-white/10 pointer-events-none" />
        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_70%)] pointer-events-none" />

        {/* Navigation Items */}
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

        {/* Tooltip on long press */}
        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2
              bg-black/75 text-white text-[11px] px-3 py-1.5 
              rounded-lg shadow-[0_2px_12px_rgba(0,0,0,0.45)] 
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
    if (window.navigator.vibrate) window.navigator.vibrate([10, 15, 10]);
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
      className="relative flex items-center justify-center w-14 h-14 group"
    >
      {/* Icon with neon glow and smooth scale */}
      <motion.div
        animate={isActive ? { scale: 1.25, y: -2 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={`transition-all duration-300 ${
          isActive
            ? "text-cyan-400 drop-shadow-[0_0_10px_rgba(34,211,238,0.9)]"
            : "text-gray-400 group-hover:text-gray-100"
        }`}
      >
        <Icon size={26} strokeWidth={2.1} />
      </motion.div>

      {/* Under icon active glow ring */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.8, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}