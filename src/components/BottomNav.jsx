import { useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart2, Users, User } from "lucide-react";

@keyframes fadeInSlideUp {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scaleBounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  100% { transform: scale(1); }
}

.animate-fadeInSlideUp {
  animation: fadeInSlideUp 0.3s ease-out forwards;
}

.animate-scaleBounce {
  animation: scaleBounce 0.4s ease-out;
}
*/

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
      window.navigator.vibrate(50); // Short, crisp vibration
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4"> {/* Consistent padding */}
      <div className="relative mx-auto max-w-sm h-16 rounded-3xl bg-gradient-to-br from-gray-900 to-black backdrop-blur-xl shadow-xl border border-white/5 flex items-center justify-around px-2">
        {/* Subtle inner highlight/border for premium look */}
        <div className="absolute inset-px rounded-3xl border border-white/5 pointer-events-none"></div>

        {tabs.map((tab, index) => {
          const isActive = location.pathname === tab.route;
          const Icon = tab.icon;

          return (
            <button
              key={index}
              onClick={() => {
                navigate(tab.route);
                triggerHapticFeedback(); // Trigger vibration
              }}
              className={`
                relative flex items-center justify-center
                w-16 h-full flex-shrink-0
                transition-all duration-300 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900
                group
                ${isActive ? "text-white" : "text-gray-400 hover:text-white/80"}
              `}
              aria-label={tab.route.substring(1)}
            >
              {/* Active indicator - a sleek pill/underline */}
              {isActive && (
                <span className="absolute bottom-2.5 w-8 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-fadeInSlideUp"></span>
              )}

              <div className-text={`
                flex items-center justify-center
                w-12 h-12 rounded-full
                transition-transform duration-200 ease-out
                ${isActive ? "bg-white/10 shadow-lg scale-110 animate-scaleBounce" : "group-hover:scale-105"}
              `}>
                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} /> {/* Thicker stroke for active icon */}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
