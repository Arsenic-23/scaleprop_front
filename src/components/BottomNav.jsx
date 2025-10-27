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
        {/* Frost glass */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.09)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            border: "1.5px solid rgba(255,255,255,0.25)",
            boxShadow:
              "0 10px 40px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.1)",
          }}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Frosty top highlight */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "1.5px",
              background:
                "linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)",
            }}
          />
          {/* Vertical frost edge */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "1px",
              height: "100%",
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.85), transparent, rgba(255,255,255,0.2))",
            }}
          />
        </motion.div>

        {/* Nav icons */}
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
                        className="absolute w-10 h-10 rounded-full bg-white/20 backdrop-blur-2xl"
                        initial={{ scale: 0.4, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.4, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    animate={{
                      scale: isActive ? 1.28 : 1,
                      y: isActive ? -2 : 0,
                    }}
                    transition={{ duration: 0.18 }}
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
