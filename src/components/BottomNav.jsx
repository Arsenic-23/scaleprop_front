import React, { useState, useEffect } from "react";
import { Home, BarChart2, Users, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const TABS = [
  { icon: Home, label: "Dashboard", path: "/home" },
  { icon: BarChart2, label: "Wallet", path: "/wallet" },
  { icon: Users, label: "Connect", path: "/connect" },
  { icon: User, label: "Me", path: "/profile" },
];

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

  const triggerHaptic = (style) => {
    if (window.navigator.vibrate) {
      if (style === 'tap') window.navigator.vibrate(50);
      if (style === 'long') window.navigator.vibrate([30, 20, 30]);
    }
  };

  const handleClick = () => {
    triggerHaptic('tap');
    navigate(path);
  };

  // Combine long press handlers for a single touch/mouse experience
  const handleStart = () => {
    triggerHaptic('long');
    onLongPressStart(label);
  };

  return (
    <motion.button
      // Subtle tap animation for feedback
      whileTap={{ scale: 0.9 }}
      onClick={handleClick}
      
      // Desktop Long Press Handlers
      onMouseDown={handleStart}
      onMouseUp={onLongPressEnd}
      onMouseLeave={onLongPressEnd}
      
      // Mobile Touch Handlers
      onTouchStart={handleStart}
      onTouchEnd={onLongPressEnd}
      
      className="relative flex flex-col items-center justify-center w-16 h-10 transition-colors duration-200"
    >
      {/* Icon Container */}
      <motion.div
        animate={
          isActive
            ? { scale: 1.1, y: -2 }
            : { scale: 1, y: 0 }
        }
        transition={{ type: "spring", stiffness: 450, damping: 25 }}
        className={
          isActive
            ? "text-blue-400 drop-shadow-[0_0_10px_rgba(96,165,250,0.9)]" // Bright blue glow for active state
            : "text-white/60 hover:text-white transition-colors" // Subtly transparent white for inactive
        }
      >
        <Icon size={24} strokeWidth={2} />
      </motion.div>

      {/* Label (Hidden/Subtle in the iOS-like version) */}
      <motion.span
        animate={{
          opacity: isActive ? 1 : 0, // Hide inactive label, show active one briefly
          y: isActive ? 4 : 8,
        }}
        transition={{ duration: 0.2 }}
        className={`absolute text-[10px] font-medium transition-all duration-200 ${
          isActive
            ? "text-blue-400 drop-shadow-[0_0_2px_rgba(96,165,250,0.6)]"
            : "text-white/50"
        }`}
      >
        {label}
      </motion.span>
    </motion.button>
  );
}

/**
 * BottomNav Container Component: Applies the primary glassmorphism styling.
 */
function BottomNav({ currentPath, setCurrentPath }) {
  const [popup, setPopup] = useState(null);
  const [pressTimer, setPressTimer] = useState(null);

  const handleLongPressStart = (label) => {
    // Clear any existing timer to prevent double-trigger
    if (pressTimer) clearTimeout(pressTimer); 
    
    // Set new timer
    const timer = setTimeout(() => {
      setPopup(label);
    }, 500);
    setPressTimer(timer);
  };

  const handleLongPressEnd = () => {
    if (pressTimer) {
      clearTimeout(pressTimer);
      setPressTimer(null);
    }
    setPopup(null);
  };

  // Dummy navigate function for single-file operation
  const navigate = (path) => setCurrentPath(path);

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full flex justify-center pointer-events-none">
      <nav
        className="
          relative flex justify-around items-center h-[65px] px-2 py-2 
          bg-black/50 
          backdrop-blur-3xl 
          border border-white/10
          rounded-3xl 
          shadow-[0_15px_50px_rgba(0,0,0,0.8)]
          w-[90vw] max-w-sm 
          pointer-events-auto
          
          
          // Custom Inner Gloss Effect (Black Gradient Simulation)
          before:content-[''] before:absolute before:inset-0 before:rounded-3xl
          before:bg-gradient-to-t before:from-black/5 before:to-white/5 before:z-[-1]
          before:mix-blend-overlay
        "
      >
        {TABS.map((tab, index) => (
          <NavItem
            key={index}
            icon={tab.icon}
            label={tab.label}
            path={tab.path}
            currentPath={currentPath}
            navigate={navigate}
            onLongPressStart={handleLongPressStart}
            onLongPressEnd={handleLongPressEnd}
          />
        ))}

        {/* Long Press Popup (Tooltip) */}
        <AnimatePresence>
          {popup && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute bottom-[70px] 
              bg-white/90 text-neutral-900 text-[12px] px-3 py-1.5 
              rounded-xl font-semibold shadow-2xl backdrop-blur-sm 
              whitespace-nowrap"
            >
              {popup}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}

/**
 * Main App Component to hold the state and provide a context for the Nav.
 */
export default function App() {
  // Simulate routing by tracking the current active path
  const [currentPath, setCurrentPath] = useState(TABS[0].path);

  // Set the body background for the dark aesthetic
  useEffect(() => {
    document.body.className = "bg-neutral-900 min-h-screen font-sans antialiased text-white flex flex-col items-center justify-center p-8";
  }, []);

  return (
    <div className="w-full h-screen">
      {/* Simulated Content Area */}
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold text-white/90 mb-4 drop-shadow-md">
          {TABS.find(t => t.path === currentPath)?.label} View
        </h1>
        <p className="text-white/60 text-center max-w-xs">
          This is the content area for the currently selected tab. 
        </p>
      </div>

      {/* The beautifully styled navigation bar */}
      <BottomNav 
        currentPath={currentPath} 
        setCurrentPath={setCurrentPath} 
      />
    </div>
  );
}
