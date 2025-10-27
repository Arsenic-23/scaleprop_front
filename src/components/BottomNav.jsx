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
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="pointer-events-auto relative flex justify-between items-center px-6 py-2.5
          w-[78vw] max-w-sm mx-auto rounded-[2rem]
          bg-white/15 border border-white/25
          backdrop-blur-[45px] backdrop-saturate-[260%]
          shadow-[0_4px_25px_rgba(0,0,0,0.35)]
          ring-1 ring-white/15 ring-inset overflow-hidden"
        style={{
          WebkitBackdropFilter: "blur(45px) saturate(260%)",
          backdropFilter: "blur(45px) saturate(260%)",
        }}
      >
        {/* Animated flowing light wave */}
        <motion.div
          initial={{ x: "-150%" }}
          animate={{ x: "150%" }}
          transition={{
            repeat: Infinity,
            duration: 6,
            ease: "linear",
            repeatDelay: 3,
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-30"
        />

        {/* Layered internal gradient for iOS gloss */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/25 via-white/15 to-transparent pointer-events-none" />

        {/* Top reflective highlight */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/60 blur-[1px] opacity-80" />

        {/* Inner shadows for curved glass depth */}
        <div className="absolute inset-0 rounded-[2rem] shadow-[inset_0_2px_10px_rgba(255,255,255,0.25),inset_0_-4px_12px_rgba(0,0,0,0.35)] pointer-events-none" />

        {/* Dynamic light reflection sweep */}
        <motion.div
          initial={{ x: "-120%" }}
          animate={{ x: "120%" }}
          transition={{
            repeat: Infinity,
            duration: 7,
            ease: "easeInOut",
            repeatDelay: 5,
          }}
          className="absolute top-0 left-0 w-[150%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-30 blur-[12px] rounded-[2rem]"
        />

        {/* Navigation Items */}
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

        {/* Label popup when long-pressing */}
        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.18 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2
                bg-black/70 text-white text-[11px] px-3 py-1.5 
                rounded-lg shadow-xl backdrop-blur-md border border-white/10"
            >
              {popup}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle glass top sheen */}
        <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-t from-transparent via-white/25 to-white/70 opacity-25 pointer-events-none" />
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
      whileTap={{ scale: 0.88 }}
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
            ? { scale: 1.45, y: -2 }
            : { scale: 1, y: 0 }
        }
        transition={{ type: "spring", stiffness: 420, damping: 26 }}
        className={`${
          active
            ? "text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]"
            : "text-white/80 shadow-[inset_0_2px_4px_rgba(255,255,255,0.35),inset_0_-1px_3px_rgba(0,0,0,0.35)]"
        }`}
        style={{
          filter: active
            ? "brightness(1.2)"
            : "brightness(0.95)",
        }}
      >
        <Icon size={21} strokeWidth={2.1} />
      </motion.div>

      {active && (
        <motion.div
          layoutId="activeGlow"
          transition={{ type: "spring", stiffness: 500, damping: 26 }}
          className="absolute bottom-1.5 w-2.5 h-2.5 rounded-full 
            bg-white shadow-[0_0_20px_rgba(255,255,255,0.9)]"
        />
      )}
    </motion.button>
  );
}
