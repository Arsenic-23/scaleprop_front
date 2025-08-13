import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const tg = (window as any)?.Telegram?.WebApp;
    if (tg && tg.BackButton) {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate(-1));

      return () => {
        tg.BackButton.hide();
        tg.BackButton.offClick(() => navigate(-1));
      };
    }
  }, [navigate]);

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg shadow transition"
    >
      <ArrowLeft size={18} />
      Back
    </button>
  );
};

export default BackButton;