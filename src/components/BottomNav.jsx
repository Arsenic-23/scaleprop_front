import { useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart2, Users, User } from "lucide-react";

const tabs = [
  { icon: Home, route: "/home" },
  { icon: BarChart2, route: "/dashboard" },
  { icon: Users, route: "/community" },
  { icon: User, route: "/account" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const triggerHapticFeedback = () => {
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center items-center pointer-events-none">
      <div className="flex justify-between items-center px-6 py-3 w-[90%] max-w-md h-16 rounded-2xl shadow-xl border border-white/10 backdrop-blur-lg bg-black/60 pointer-events-auto transition-all duration-300">
        {tabs.map((tab, index) => {
          const isActive = location.pathname === tab.route;
          const Icon = tab.icon;

          return (
            <button
              key={index}
              onClick={() => {
                navigate(tab.route);
                triggerHapticFeedback();
              }}
              className={`
                flex items-center justify-center
                w-11 h-11 sm:w-12 sm:h-12 rounded-full
                transition-all duration-300
                ${isActive
                  ? "bg-white/20 text-white shadow-lg scale-110"
                  : "text-gray-400 hover:text-white hover:bg-white/10"
                }
              `}
              aria-label={tab.route.substring(1)}
            >
              <Icon size={22} />
            </button>
          );
        })}
      </div>
    </div>
  );
}