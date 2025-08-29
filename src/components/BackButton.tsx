import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
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
    <motion.button
      onClick={() => navigate(-1)}
      whileTap={{ scale: 0.9 }}
      className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 shadow-lg transition"
    >
      <motion.div
        whileTap={{ rotate: -45, x: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 10 }}
      >
        <ArrowLeft size={22} className="text-white" />
      </motion.div>
    </motion.button>
  );
};

export default BackButton;