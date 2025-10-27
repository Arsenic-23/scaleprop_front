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
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="pointer-events-auto relative flex justify-between items-center px-6 py-3
          w-[90vw] max-w-md mx-auto rounded-[2.2rem]
          border border-white/30
          bg-[rgba(255,255,255,0.08)] dark:bg-[rgba(0,0,0,0.3)]
          backdrop-blur-[30px] backdrop-saturate-[180%]
          shadow-[0_4px_40px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]
          ring-1 ring-white/10 ring-inset overflow-hidden"
        style={{
          WebkitBackdropFilter: "blur(30px) saturate(180%)",
          backdropFilter: "blur(30px) saturate(180%)",
        }}
      >
        {/* Top reflective gradient for glass highlight */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.18] via-white/[0.08] to-transparent pointer-events-none rounded-[2.2rem]" />

        {/* Subtle edge light for realism */}
        <div className="absolute -top-[1px] left-0 right-0 h-[1px] bg-white/30 blur-[1px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/5 pointer-events-none rounded-[2.2rem]" />

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

        {/* Floating popup label */}
        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2
              bg-[rgba(0,0,0,0.7)] text-white text-[11px] px-3 py-1.5 
              rounded-lg shadow-lg backdrop-blur-md border border-white/10"
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
        animate={
          isActive
            ? { scale: 1.3, y: -3 }
            : { scale: 1, y: 0 }
        }
        transition={{ type: "spring", stiffness: 420, damping: 25 }}
        className={`${
          isActive
            ? "text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.9)]"
            : "text-gray-300 hover:text-gray-100 transition-colors"
        }`}
      >
        <Icon size={22} strokeWidth={2.1} />
      </motion.div>

      <motion.span
        animate={{
          opacity: isActive ? 1 : 0.6,
          y: isActive ? -1 : 1,
        }}
        transition={{ duration: 0.25 }}
        className={`text-[10px] mt-0.5 ${
          isActive ? "text-blue-400 font-medium" : "text-gray-400"
        }`}
      >
        {label}
      </motion.span>

      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full 
          bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.9)]"
        />
      )}
    </motion.button>
  );
}
