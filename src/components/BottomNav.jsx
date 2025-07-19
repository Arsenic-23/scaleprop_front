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
      window.navigator.vibrate(40);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-5 z-50 flex justify-center pointer-events-none">
      <div className="flex items-center justify-between gap-5 px-4 py-2 w-fit rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow-lg pointer-events-auto">
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
                text-[1.1rem] transition-all duration-200
                ${isActive ? "text-white" : "text-gray-400 hover:text-white"}
              `}
              aria-label={tab.route.substring(1)}
            >
              <Icon size={20} />
            </button>
          );
        })}
      </div>
    </div>
  );
}