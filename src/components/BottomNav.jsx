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
    { path: "/plans", icon: <BarChart2 size={20} /> },
    { path: "/account", icon: <Users size={20} /> },
    { path: "/profile", icon: <User size={20} /> },
  ];

  const handleTabClick = (path) => {
    if (window.navigator.vibrate) {
      window.navigator.vibrate([50, 70, 50]);
    }

    setActive(path);
    navigate(path);
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <div className="relative w-[80vw] max-w-sm mx-auto">

        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            background: "rgba(30,30,30,0.78)",
            backdropFilter: "blur(48px)",
            WebkitBackdropFilter: "blur(48px)",
            border: "1px solid rgba(255,255,255,0.22)",
            boxShadow:
              "0 18px 50px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(255,255,255,0.12)",
          }}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.32 }}
        />

        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: "url('https://grainy-gradients.vercel.app/noise.png')",
            opacity: 0.32,
            mixBlendMode: "overlay",
          }}
        />

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
                        className="absolute w-10 h-10 rounded-full"
                        style={{
                          background: "rgba(255,255,255,0.22)",
                          backdropFilter: "blur(40px)",
                          WebkitBackdropFilter: "blur(40px)",
                          border: "1px solid rgba(255,255,255,0.22)",
                          boxShadow:
                            "0 4px 18px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.32)",
                        }}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ duration: 0.16 }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: isActive ? 1.22 : 1,
                      y: isActive ? -1 : 0,
                    }}
                    transition={{ duration: 0.18 }}
                    className={isActive ? "text-white" : "text-white/65"}
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
