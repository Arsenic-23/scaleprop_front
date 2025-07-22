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
    if (typeof window !== "undefined" && navigator.vibrate) {
      navigator.vibrate([10, 20, 10]);
    }
  };

  return (
    <div className="fixed inset-x-0 bottom-5 z-50 flex justify-center pointer-events-none">
      <div
        className="flex items-center justify-between gap-8 px-8 py-3 w-[90%] max-w-md rounded-full 
        bg-black/80 backdrop-blur-lg border border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.4)] 
        pointer-events-auto transition-all duration-300"
        style={{
          background: "linear-gradient(145deg, rgba(0,0,0,0.9), rgba(25,25,25,0.85))",
        }}
      >
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
              className={`transition-all duration-200 ease-in-out flex flex-col items-center 
                ${isActive ? "text-white scale-110" : "text-gray-400 hover:text-white"}`}
              aria-label={tab.route.substring(1)}
            >
              <Icon size={22} strokeWidth={2} />
            </button>
          );
        })}
      </div>
    </div>
  );
}