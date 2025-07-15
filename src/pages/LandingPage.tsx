import { useNavigate } from "react-router-dom";
import { LogoScroller } from "../components/LogoScroller";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <div className="flex flex-col items-center justify-between h-full py-10 space-y-10">
        {/* Branding Section */}
        <div className="flex items-center gap-2 text-4xl font-medium">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-10 h-10 object-contain" // no rounded or background
          />
          <span>Cale</span>
        </div>

        {/* Logo Scroller */}
        <div className="w-full max-w-screen-lg">
          <LogoScroller />
        </div>

        {/* Join Button */}
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-3 text-base font-medium text-white bg-black rounded-lg shadow transition hover:bg-gray-900"
        >
          Join Now
        </button>
      </div>
    </div>
  );
}