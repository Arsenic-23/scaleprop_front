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

  // Subtle animated glossy reflection wave
  useEffect(() => {
    const interval = setInterval(() => {
      setWavePosition((prev) => (prev >= 100 ? 0 : prev + 0.6));
    }, 70);
    return () => clearInterval(interval);
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
      <motion.nav
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 16 }}
        className="relative flex justify-between items-center px-8 py-2.5 
        w-[80vw] max-w-md mx-auto rounded-[2.2rem] overflow-hidden
        backdrop-blur-2xl border border-white/10
        bg-[linear-gradient(145deg,rgba(10,10,10,0.9)_0%,rgba(25,25,25,0.7)_100%)]
        shadow-[0_4px_20px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.05)]
        before:absolute before:inset-0 before:rounded-[2.2rem]
        before:bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.06),transparent_60%)]
        before:pointer-events-none"
      >
        {/* Subtle glossy reflection moving across */}
        <motion.div
          animate={{ backgroundPositionX: `${wavePosition}%` }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none 
          bg-[linear-gradient(120deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.05)_45%,rgba(255,255,255,0)_100%)]
          bg-[length:200%_100%] rounded-[2.2rem]"
        />

        {/* Faint soft shadow underneath for depth */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-[60%] h-5 
          bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.5)_0%,rgba(0,0,0,0)_70%)] 
          blur-xl rounded-full pointer-events-none" />

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

        {/* Tooltip */}
        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              className="absolute bottom-14 left-1/2 -translate-x-1/2
              bg-black/70 text-white text-[11px] px-3 py-1.5 
              rounded-lg shadow-[0_2px_10px_rgba(0,0,0,0.4)] 
              backdrop-blur-md border border-white/10"
            >
              {popup}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
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
      whileTap={{ scale: 0.92 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
      onClick={handleClick}
      onMouseDown={() => onLongPressStart(label)}
      onMouseUp={onLongPressEnd}
      onMouseLeave={onLongPressEnd}
      onTouchStart={() => onLongPressStart(label)}
      onTouchEnd={onLongPressEnd}
      className="relative flex flex-col items-center justify-center w-14 h-12"
    >
      {/* Icon */}
      <motion.div
        animate={isActive ? { scale: 1.2, y: -2 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className={`transition-all duration-300 ${
          isActive
            ? "text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            : "text-neutral-400 hover:text-neutral-200"
        }`}
      >
        <Icon size={23} strokeWidth={2.1} />
      </motion.div>

      {/* Active indicator */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 6 }}
            exit={{ opacity: 0, scale: 0.4, y: 6 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-1 w-[5px] h-[5px] rounded-full 
            bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)]"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
