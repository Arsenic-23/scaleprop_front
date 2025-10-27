\import React, { useState } from "react";
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
        initial={{ opacity: 0, y: 26, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pointer-events-auto relative flex justify-between items-center px-5 py-3 
          w-[80vw] max-w-sm mx-auto rounded-[2.5rem]
          bg-white/20 dark:bg-white/10 
          border border-white/30 
          backdrop-blur-[40px] backdrop-saturate-[250%]
          shadow-[0_10px_40px_rgba(0,0,0,0.35)]
          ring-1 ring-white/20 ring-inset overflow-hidden"
        style={{
          WebkitBackdropFilter: "blur(40px) saturate(250%)",
          backdropFilter: "blur(40px) saturate(250%)",
        }}
      >
        {/* Moving shimmer highlight */}
        <motion.div
          initial={{ x: "-150%" }}
          animate={{ x: "150%" }}
          transition={{
            repeat: Infinity,
            duration: 4.8,
            ease: "linear",
            repeatDelay: 4,
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/35 to-transparent opacity-40"
        />

        {/* Inner gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/25 via-white/15 to-transparent rounded-[2.5rem] pointer-events-none" />

        {/* Subtle edge light lines */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/50 blur-[1px] opacity-70" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/10 blur-[1px]" />

        {/* Inner shadow for inset glass depth */}
        <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_2px_8px_rgba(255,255,255,0.35),inset_0_-6px_12px_rgba(0,0,0,0.35)] pointer-events-none" />

        {/* Nav Items */}
        {tabs.map((tab, i) => (
          <NavItem
            key={i}
            icon={tab.icon}
            label={tab.label}
            path={tab.path}
            currentPath={location.pathname}
            navigate={navigate}
            onLongPressStart={handleLongPressStart}
            onLongPressEnd={handleLongPressEnd}
          />
        ))}

        {/* Popup label on long press */}
        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2
              bg-black/60 text-white text-[11px] px-3 py-1.5 
              rounded-lg shadow-xl backdrop-blur-md border border-white/10"
            >
              {popup}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top reflective sheen */}
        <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-t from-transparent via-white/20 to-white/60 opacity-30 pointer-events-none" />
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
  const active = currentPath === path;

  const handleClick = () => {
    if (window.navigator.vibrate) window.navigator.vibrate([10, 15, 10]);
    navigate(path);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      onClick={handleClick}
      onMouseDown={() => onLongPressStart(label)}
      onMouseUp={onLongPressEnd}
      onMouseLeave={onLongPressEnd}
      onTouchStart={() => onLongPressStart(label)}
      onTouchEnd={onLongPressEnd}
      className="relative flex items-center justify-center w-12 h-12"
    >
      <motion.div
        animate={
          active
            ? { scale: 1.45, y: -3 }
            : { scale: 1, y: 0 }
        }
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        className={`${
          active
            ? "text-neutral-100 drop-shadow-[0_0_16px_rgba(255,255,255,0.8)]"
            : "text-white/85"
        }`}
      >
        <Icon size={21} strokeWidth={2.1} />
      </motion.div>

      {active && (
        <motion.div
          layoutId="activeGlow"
          transition={{ type: "spring", stiffness: 500, damping: 26 }}
          className="absolute bottom-1.5 w-2.5 h-2.5 rounded-full 
          bg-white/80 shadow-[0_0_20px_rgba(255,255,255,0.9)]"
        />
      )}
    </motion.button>
  );
}
