import { useLocation, useNavigate } from "react-router-dom";
import { Home, BarChart2, Users, User } from "lucide-react";

const tabs = [
  { name: "Home", icon: Home, route: "/home" },
  { name: "Dashboard", icon: BarChart2, route: "/dashboard" },
  { name: "Community", icon: Users, route: "/community" },
  { name: "Account", icon: User, route: "/account" },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl bg-black/60 backdrop-blur-md border border-white/10 shadow-xl flex justify-around items-center h-16 px-4">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.route;
        const Icon = tab.icon;

        return (
          <button
            key={tab.name}
            onClick={() => navigate(tab.route)}
            className={`flex flex-col items-center justify-center text-[11px] font-medium transition-all duration-200 ${
              isActive
                ? "text-white scale-110 drop-shadow-md"
                : "text-gray-400 hover:text-white"
            }`}
          >
            <Icon
              size={22}
              className={`mb-1 transition-all duration-200 ${
                isActive ? "stroke-white" : "stroke-gray-400"
              }`}
            />
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}