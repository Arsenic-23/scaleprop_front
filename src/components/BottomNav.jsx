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

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 px-4 pb-3">
      <div className="mx-auto max-w-md h-16 rounded-full bg-black/70 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.3)] border border-white/10 flex items-center justify-between px-6">
        {tabs.map((tab, index) => {
          const isActive = location.pathname === tab.route;
          const Icon = tab.icon;

          return (
            <button
              key={index}
              onClick={() => navigate(tab.route)}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 ${
                isActive
                  ? "bg-white/10 text-white scale-110 shadow-inner"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Icon size={22} />
            </button>
          );
        })}
      </div>
    </div>
  );
}