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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#111827] border-t border-gray-800 shadow-md flex justify-around items-center h-16 px-2">
      {tabs.map((tab) => {
        const isActive = location.pathname === tab.route;
        const Icon = tab.icon;

        return (
          <button
            key={tab.name}
            onClick={() => navigate(tab.route)}
            className={`flex flex-col items-center justify-center text-xs font-medium transition-all ${
              isActive ? "text-white scale-110" : "text-gray-400"
            }`}
          >
            <Icon size={22} className="mb-1" />
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}