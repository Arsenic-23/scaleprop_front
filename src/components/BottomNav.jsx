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
    const interval = setInterval(() => {
      setWavePosition((prev) => (prev >= 100 ? 0 : prev + 0.4));
    }, 80);
    return () => clearInterval(interval);
  }, []);

  const handleLongPressStart = (label) => {
    if (window.navigator.vibrate) window.navigator.vibrate(15);
    pressTimer = setTimeout(() => setPopup(label), 450);
  };

  const handleLongPressEnd = () => {
    clearTimeout(pressTimer);
    setPopup(null);
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center select-none">
      <motion.nav
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 110, damping: 14 }}
        className="relative flex justify-between items-center px-7 py-2.5
        w-[78vw] max-w-md rounded-3xl overflow-hidden
        backdrop-blur-[22px]
        bg-[rgba(15,15,15,0.56)]
        border border-white/5
        shadow-[0_6px_32px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.04)]"
      >

        <motion.div
          animate={{ backgroundPositionX: `${wavePosition}%` }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 pointer-events-none
          bg-[linear-gradient(110deg,rgba(255,255,255,0.14)_0%,rgba(255,255,255,0)_35%)]
          bg-[length:200%_100%]"
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
              className="absolute bottom-14 left-1/2 -translate-x-1/2
              bg-black/70 text-white text-[11px] px-3 py-1.5
              rounded-lg border border-white/10 backdrop-blur-md"
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
    if (window.navigator.vibrate) window.navigator.vibrate(10);
    navigate(path);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ y: -1 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      onClick={handleClick}
      onMouseDown={() => onLongPressStart(label)}
      onMouseUp={onLongPressEnd}
      onMouseLeave={onLongPressEnd}
      onTouchStart={() => onLongPressStart(label)}
      onTouchEnd={onLongPressEnd}
      className="relative flex flex-col items-center justify-center w-14 h-12"
    >
      <motion.div
        animate={isActive ? { scale: 1.2, y: -2 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 480, damping: 26 }}
        className={`${isActive
          ? "text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.45)]"
          : "text-neutral-400 hover:text-neutral-200"
        }`}
      >
        <Icon size={23} strokeWidth={2.1} />
      </motion.div>

      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.4, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 6 }}
            exit={{ opacity: 0, scale: 0.4, y: 6 }}
            transition={{ duration: 0.22 }}
            className="absolute bottom-1 w-[5px] h-[5px] rounded-full bg-white"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
}
