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
  const [popup, setPopup] = useState<string | null>(null);
  let pressTimer; any;

  const handleLongPressStart = (label: string) => {
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="pointer-events-auto relative flex justify-between items-center px-6 py-3
          w-[90vw] max-w-md mx-auto
          rounded-3xl border border-white/20
          bg-gradient-to-br from-[#0d0d0d]/85 via-[#1a1a1a]/80 to-[#000]/85
          backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.35)]
          ring-1 ring-white/10 ring-inset"
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 left-1/2 -translate-x-1/2
              bg-black/70 text-white text-[11px] px-3 py-1.5 
              rounded-lg shadow-lg backdrop-blur-md border border-white/10"
            >
              {popup}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle glassy reflection overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-transparent via-white/5 to-white/10 pointer-events-none" />
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
}: any) {
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
            ? { scale: 1.25, y: -3 }
            : { scale: 1, y: 0 }
        }
        transition={{ type: "spring", stiffness: 420, damping: 25 }}
        className={`${
          isActive
            ? "text-blue-400 drop-shadow-[0_0_12px_rgba(96,165,250,0.9)]"
            : "text-gray-400 hover:text-gray-200 transition-colors"
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
          bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,0.8)]"
        />
      )}
    </motion.button>
  );
}
