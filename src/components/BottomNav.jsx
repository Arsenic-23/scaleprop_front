import React, { useState } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./GlassNav.css";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);

  const tabs = [
    { icon: <Home size={22} />, path: "/", label: "Home" },
    { icon: <BarChart2 size={22} />, path: "/dashboard", label: "Dashboard" },
    { icon: <Users size={22} />, path: "/community", label: "Community" },
    { icon: <User size={22} />, path: "/profile", label: "Profile" },
  ];

  const handleTabClick = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <div className="glass-nav">
      {tabs.map((tab) => (
        <motion.button
          key={tab.path}
          onClick={() => handleTabClick(tab.path)}
          className={`nav-btn ${activeTab === tab.path ? "active" : ""}`}
          whileTap={{ scale: 0.9 }}
        >
          <div className="icon">{tab.icon}</div>
          <AnimatePresence>
            {activeTab === tab.path && (
              <motion.span
                className="label"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.25 }}
              >
                {tab.label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      ))}
    </div>
  );
}
