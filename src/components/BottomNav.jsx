import { useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart2, Users, User } from "lucide-react";
import { useEffect } from "react"; // Import useEffect for haptic feedback

const tabs = [
  { icon: Home, route: "/home" },
  { icon: BarChart2, route: "/dashboard" },
  { icon: Users, route: "/community" },
  { icon: User, route: "/account" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to trigger haptic feedback
  const triggerHapticFeedback = () => {
    if (window.navigator && window.navigator.vibrate) {
      // Vibrate for a short duration (e.g., 50ms)
      window.navigator.vibrate(50);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4 md:p-5 lg:p-6"> {/* Responsive padding */}
      <div className="relative mx-auto max-w-sm sm:max-w-md md:max-w-lg h-14 sm:h-16 rounded-full bg-black/70 backdrop-blur-xl shadow-2xl border border-white/10 flex items-center justify-around px-4 sm:px-6"> {/* Adjusted sizing and shadows */}
        {/* Optional: Add a subtle background gradient or animated element for premium feel */}
        <div className="absolute inset-0 rounded-full pointer-events-none" style={{ background: 'linear-gradient(45deg, rgba(255,255,255,0.05), rgba(255,255,255,0))' }}></div>

        {tabs.map((tab, index) => {
          const isActive = location.pathname === tab.route;
          const Icon = tab.icon;

          return (
            <button
              key={index}
              onClick={() => {
                navigate(tab.route);
                triggerHapticFeedback(); // Trigger vibration on click
              }}
              className={`
                relative flex flex-col items-center justify-center
                flex-grow group
                transition-all duration-300 ease-out
                ${isActive
                  ? "text-white scale-105"
                  : "text-gray-400 hover:text-white"
                }
              `}
              aria-label={tab.route.substring(1)} // Accessibility improvement
            >
              <div className={`
                w-10 h-10 sm:w-12 sm:h-12 rounded-full
                flex items-center justify-center
                transition-all duration-300 ease-out
                ${isActive
                  ? "bg-white/15 shadow-lg"
                  : "group-hover:bg-white/5"
                }
              `}>
                <Icon size={20} className="sm:text-xl md:text-2xl" /> {/* Responsive icon size */}
              </div>
              {/* Optional: Add a small, subtle text label for active tab */}
              {isActive && (
                <span className="absolute -bottom-4 text-xs font-medium text-white opacity-80 animate-fade-in-up">
                  {tab.route.substring(1).charAt(0).toUpperCase() + tab.route.substring(1).slice(1)}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
