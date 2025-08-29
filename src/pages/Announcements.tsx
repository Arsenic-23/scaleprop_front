import { useEffect, useState, MouseEvent } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import BackButton from "./BackButton"; // ✅ Import your back button

interface Announcement {
  id: number;
  title: string;
  message: string;
  date: string;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  useEffect(() => {
    const dummyAnnouncements: Announcement[] = [
      {
        id: 1,
        title: "New Challenge Plan Added 🎯",
        message:
          "We have added a $100k challenge with 90% profit split! Take your trading journey to the next level.",
        date: "2025-07-10",
      },
      {
        id: 2,
        title: "UPI Payments Now Supported 💳",
        message:
          "You can now pay using UPI and QR directly in the app for faster and easier transactions.",
        date: "2025-07-08",
      },
    ];
    setAnnouncements(dummyAnnouncements);
  }, []);

  const handleRipple = (e: MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { id: Date.now(), x, y };
    setRipples((prev) => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 600);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black p-6">
      {/* Header with Back Button */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-8"
      >
        <BackButton /> {/* ✅ Back button placed here */}
        <div className="flex items-center bg-white/60 dark:bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 shadow-sm">
          <Bell className="text-blue-600 dark:text-blue-400 w-5 h-5 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white tracking-tight">
            Announcements
          </h2>
        </div>
        <div className="w-12" /> {/* Spacer for symmetry */}
      </motion.div>

      {/* Announcements List */}
      {announcements.length > 0 ? (
        <div className="space-y-6">
          {announcements.map((a, index) => (
            <motion.button
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleRipple}
              transition={{
                delay: index * 0.1,
                type: "spring",
                stiffness: 150,
                damping: 12,
              }}
              className="relative overflow-hidden w-full text-left p-5 rounded-3xl shadow-lg bg-white/70 dark:bg-white/5 border border-white/30 dark:border-white/10 backdrop-blur-xl hover:shadow-xl transition-all duration-300 focus:outline-none"
            >
              {/* Ripple Effect Layer */}
              {ripples.map((r) => (
                <span
                  key={r.id}
                  className="absolute bg-black/10 dark:bg-white/20 rounded-full animate-ripple"
                  style={{
                    left: r.x,
                    top: r.y,
                    transform: "translate(-50%, -50%)",
                  }}
                />
              ))}

              <h3 className="font-semibold text-lg text-gray-900 dark:text-white leading-snug">
                {a.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
                {a.message}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-4">
                {new Date(a.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </motion.button>
          ))}
        </div>
      ) : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-500 dark:text-gray-400 text-sm"
        >
          No announcements yet.
        </motion.p>
      )}

      {/* Ripple Animation Styles */}
      <style jsx>{`
        .animate-ripple {
          width: 20px;
          height: 20px;
          animation: ripple 0.6s linear;
        }
        @keyframes ripple {
          from {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.4;
          }
          to {
            transform: translate(-50%, -50%) scale(15);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Announcements;