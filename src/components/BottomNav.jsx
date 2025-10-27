import React, { useState } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import BottomNavContainer from "./ui/BottomNavContainer";
import NavItem from "./ui/NavItem";

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

  const startPress = (label) => {
    pressTimer = setTimeout(() => setPopup(label), 500);
  };
  const endPress = () => {
    clearTimeout(pressTimer);
    setPopup(null);
  };

  return (
    <BottomNavContainer>
      {tabs.map((t, i) => (
        <NavItem
          key={i}
          icon={t.icon}
          label={t.label}
          active={location.pathname === t.path}
          onClick={() => navigate(t.path)}
          onLongPressStart={startPress}
          onLongPressEnd={endPress}
        />
      ))}

      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.12 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2
            bg-black/70 text-white text-[11px] px-3 py-1.5 
            rounded-lg shadow-xl backdrop-blur-xl border border-white/10 pointer-events-none"
          >
            {popup}
          </motion.div>
        )}
      </AnimatePresence>
    </BottomNavContainer>
  );
}
