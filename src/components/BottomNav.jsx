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
      <div className="relative w-[80vw] max-w-sm mx-auto">

        {/* Glass container */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, rgba(20,20,20,0.45), rgba(50,50,50,0.25))",
            backdropFilter: "blur(32px)",
            WebkitBackdropFilter: "blur(32px)",
            border: "1px solid rgba(255,255,255,0.13)",
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.26), inset 0 -1px 0 rgba(255,255,255,0.04)",
          }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        />

        {/* Soft grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "url('https://grainy-gradients.vercel.app/noise.png') repeat",
            opacity: 0.18,
            mixBlendMode: "overlay",
          }}
        />

        {/* Content */}
        <div className="relative flex justify-around items-center h-14 z-10">
          {tabs.map((tab) => {
            const isActive = active === tab.path;
            return (
              <button
                key={tab.path}
                onClick={() => handleTabClick(tab.path)}
                className="relative flex items-center justify-center p-2"
              >
                <div className="relative flex items-center justify-center">
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        layoutId="bubble"
                        className="absolute w-9 h-9 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.1)",
                          backdropFilter: "blur(20px)",
                          WebkitBackdropFilter: "blur(20px)",
                          boxShadow: "0 0 8px rgba(255,255,255,0.22)",
                        }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.18 }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: isActive ? 1.18 : 1,
                      y: isActive ? -1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className={
                      isActive ? "text-white" : "text-white/50"
                    }
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
