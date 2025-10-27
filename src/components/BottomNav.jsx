import React, { useState } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { icon: Home, label: "Home", path: "/home" },
  { icon: BarChart2, label: "Account", path: "/account" },
  { icon: Users, label: "Community", path: "/community" },
];

export default function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const [popup, setPopup] = useState(null);
  let pressTimer;

  const handleLongPressStart = (label) => {
    if (window.navigator.vibrate) window.navigator.vibrate([30, 20, 30]);
    pressTimer = setTimeout(() => setPopup(label), 500);
  };

  const handleLongPressEnd = () => {
    clearTimeout(pressTimer);
    setPopup(null);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <motion.nav
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="pointer-events-auto relative flex justify-between items-center px-5 py-3
          w-[86vw] max-w-sm mx-auto rounded-[2rem]
          border border-white/15 bg-white/10 dark:bg-black/25
          backdrop-blur-[40px] backdrop-saturate-[230%]
          shadow-[0_8px_30px_rgba(0,0,0,0.4)]
          ring-1 ring-white/10 ring-inset"
        style={{
          WebkitBackdropFilter: "blur(40px) saturate(230%)",
          backdropFilter: "blur(40px) saturate(230%)",
        }}
      >
        <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_1px_10px_rgba(255,255,255,0.22),inset_0_-5px_12px_rgba(0,0,0,0.35)] pointer-events-none" />

        {tabs.map((tab, i) => (
          <NavItem
            key={i}
            icon={tab.icon}
            label={tab.label}
            path={tab.path}
            navigate={navigate}
            currentPath={location.pathname}
            onLongPressStart={handleLongPressStart}
            onLongPressEnd={handleLongPressEnd}
          />
        ))}

        <CenterButton
          navigate={navigate}
          active={location.pathname === "/profile"}
        />

        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2
              bg-black/75 text-white text-[11px] px-3 py-1.5 
              rounded-lg shadow-xl backdrop-blur-md border border-white/10"
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
  navigate,
  currentPath,
  onLongPressStart,
  onLongPressEnd,
}) {
  const active = currentPath === path;

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={() => navigate(path)}
      onMouseDown={() => onLongPressStart(label)}
      onMouseUp={onLongPressEnd}
      onMouseLeave={onLongPressEnd}
      onTouchStart={() => onLongPressStart(label)}
      onTouchEnd={onLongPressEnd}
      className="relative flex items-center justify-center w-12 h-12"
    >
      <motion.div
        animate={active ? { scale: 1.4, y: -2 } : { scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 440, damping: 26 }}
        className={`${active ? "text-blue-400 drop-shadow-[0_0_20px_rgba(96,165,250,0.9)]" : "text-white/70"}`}
      >
        <Icon size={21} strokeWidth={2.1} />
      </motion.div>
    </motion.button>
  );
}

function CenterButton({ navigate, active }) {
  return (
    <motion.button
      whileTap={{ scale: 0.93 }}
      onClick={() => navigate("/profile")}
      className="absolute -top-5 left-1/2 -translate-x-1/2 w-14 h-14
      bg-gradient-to-br from-blue-500 to-blue-700
      rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(56,132,255,0.8)]"
    >
      <motion.div
        animate={active ? { scale: 1.25 } : { scale: 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className="text-white"
      >
        <User size={24} strokeWidth={2.1} />
      </motion.div>
    </motion.button>
  );
}
