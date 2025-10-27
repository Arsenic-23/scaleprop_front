import React, { useState } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();

  const [active, setActive] = useState(location.pathname);

  const tabs = [
    { path: "/", icon: <Home size={22} />, label: "Home" },
    { path: "/dashboard", icon: <BarChart2 size={22} />, label: "Dashboard" },
    { path: "/team", icon: <Users size={22} />, label: "Team" },
    { path: "/profile", icon: <User size={22} />, label: "Profile" },
  ];

  const handleTabClick = (path) => {
    setActive(path);
    navigate(path);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="relative w-[90vw] max-w-md mx-auto">
        {/* Glass background */}
        <motion.div
          className="absolute inset-0 backdrop-blur-xl bg-gradient-to-b from-white/10 to-white/5 rounded-3xl border border-white/15 shadow-[0_8px_25px_rgba(255,255,255,0.08)] overflow-hidden"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          {/* Gloss reflection layer */}
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/15 to-transparent rounded-3xl pointer-events-none"></div>
          {/* Subtle inner dark tint */}
          <div className="absolute inset-0 bg-black/30 rounded-3xl backdrop-blur-2xl pointer-events-none"></div>
        </motion.div>

        {/* Navigation icons */}
        <div className="relative flex justify-around items-center h-16 z-10">
          {tabs.map((tab) => {
            const isActive = active === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => handleTabClick(tab.path)}
                className="relative flex flex-col items-center justify-center text-white/70 hover:text-white transition-all duration-300"
              >
                <div className="relative flex items-center justify-center">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="bubble"
                        className="absolute -inset-3 bg-white/15 backdrop-blur-md rounded-full shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>
                  <motion.div
                    animate={{
                      y: isActive ? -6 : 0,
                      scale: isActive ? 1.15 : 1,
                    }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  >
                    {tab.icon}
                  </motion.div>
                </div>
                <span
                  className={`text-[10px] font-medium mt-1 ${
                    isActive ? "text-white" : "text-white/60"
                  }`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Animated wave highlight */}
        <motion.div
          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-white/40 via-white/90 to-white/40 rounded-full"
          initial={false}
          animate={{
            width: "20%",
            x:
              tabs.findIndex((t) => t.path === active) *
              (100 / tabs.length) *
              0.9 *
              3.4,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
          }}
        />
      </div>
    </div>
  );
}
