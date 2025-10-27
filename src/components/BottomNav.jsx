import React, { useState } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function BottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(location.pathname);

  const tabs = [
    { path: "/home", icon: <Home size={20} /> },
    { path: "/account", icon: <BarChart2 size={20} /> },
    { path: "/plans", icon: <Users size={20} /> },
    { path: "/profile", icon: <User size={20} /> },
  ];

  const handleTabClick = (path) => {
    setActive(path);
    navigate(path);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="relative w-[82vw] max-w-sm mx-auto">
        <motion.div
          className="absolute inset-0 backdrop-blur-xl bg-white/10 rounded-3xl border border-white/15 shadow-[0_8px_20px_rgba(255,255,255,0.06)] overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-black/25 pointer-events-none"></div>
        </motion.div>

        <div className="relative flex justify-around items-center h-14 z-10">
          {tabs.map((tab) => {
            const isActive = active === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => handleTabClick(tab.path)}
                className="relative flex items-center justify-center text-white/70 hover:text-white transition-all duration-300 p-2"
              >
                <div className="relative flex items-center justify-center">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="bubble"
                        className="absolute inset-0 bg-white/15 backdrop-blur-md rounded-full shadow-[0_0_12px_rgba(255,255,255,0.15)]"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      />
                    )}
                  </AnimatePresence>
                  <motion.div
                    animate={{
                      scale: isActive ? 1.25 : 1,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className={`${isActive ? "text-white" : "text-white/60"}`}
                  >
                    {tab.icon}
                  </motion.div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
