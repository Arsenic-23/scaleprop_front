import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import SwipeableNotification from "../components/Swipeable";
import EmptyState from "../components/EmptyState";
import GlassCard from "../components/GlassCard";

const COLORS = {
  accentBlue: "#3B82F6",
};

type NotificationColor = "blue" | "green" | "muted";

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  icon: string;
  colorType: NotificationColor;
  isRead: boolean;
}

const NotificationItem: React.FC<Notification> = ({
  title,
  message,
  timestamp,
  icon,
  colorType,
  isRead,
}) => {
  const opacityClass = isRead ? "opacity-70" : "";

  const colorMap: Record<NotificationColor, { glow: string }> = {
    blue: { glow: "rgba(59,130,246,0.5)" },
    green: { glow: "rgba(34,197,94,0.5)" },
    muted: { glow: "rgba(255,255,255,0.12)" },
  };

  return (
    <GlassCard
      className={`transition-all duration-300 ${opacityClass}`}
      style={{
        padding: "0.9rem 1rem",
        borderRadius: "1.1rem",
      }}
    >
      <div className="flex items-start gap-4 relative">
        <div
          className="relative h-10 w-10 shrink-0 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.06)",
            backdropFilter: "blur(20px) saturate(200%)",
            WebkitBackdropFilter: "blur(20px) saturate(200%)",
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: `0 0 12px ${colorMap[colorType].glow}, inset 0 1px 1px rgba(255,255,255,0.15)`,
          }}
        >
          <span className="material-symbols-outlined text-[22px] text-white">
            {icon}
          </span>
        </div>

        <div className="flex-1 min-w-0 font-[Manrope]">
          <div className="flex items-center justify-between gap-x-3">
            <p className="font-semibold text-[15px] text-white leading-tight">
              {title}
            </p>
            <p className="text-xs text-white/55 whitespace-nowrap">
              {timestamp}
            </p>
          </div>

          <p className="mt-1 text-[13px] text-white/80 leading-snug break-words">
            {message}
          </p>
        </div>

        {!isRead && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full"
            style={{
              backgroundColor: COLORS.accentBlue,
              boxShadow: "0 0 6px rgba(59,130,246,0.9)",
            }}
          />
        )}
      </div>
    </GlassCard>
  );
};

const Notifications: React.FC = () => {
  const [newNotifications, setNewNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Payout Confirmed",
      message:
        "Your payout of $5,231.00 has been processed and is on its way to you.",
      timestamp: "9:41 AM",
      icon: "account_balance_wallet",
      colorType: "blue",
      isRead: false,
    },
    {
      id: 2,
      title: "Challenge Passed",
      message:
        "You have passed the 100k Challenge. Keep up the progress.",
      timestamp: "8:15 AM",
      icon: "stacked_line_chart",
      colorType: "green",
      isRead: false,
    },
  ]);

  const [earlierNotifications, setEarlierNotifications] = useState<Notification[]>([
    {
      id: 3,
      title: "Margin Call",
      message:
        "Account #123456 is approaching the margin limit.",
      timestamp: "Yesterday",
      icon: "warning",
      colorType: "muted",
      isRead: true,
    },
    {
      id: 4,
      title: "System Update",
      message:
        "A new platform update coming Sunday. Brief downtime expected.",
      timestamp: "Yesterday",
      icon: "new_releases",
      colorType: "muted",
      isRead: true,
    },
  ]);

  const handleMarkAllAsRead = () => {
    const marked = newNotifications.map((n) => ({
      ...n,
      isRead: true,
      colorType: "muted" as NotificationColor,
    }));
    setNewNotifications([]);
    setTimeout(() => setEarlierNotifications((prev) => [...marked, ...prev]), 200);
  };

  const handleRemove = (id: number, isNew: boolean) => {
    if (isNew) setNewNotifications((prev) => prev.filter((n) => n.id !== id));
    else setEarlierNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div
      className="relative flex h-screen w-full flex-col text-white overflow-hidden"
      style={{
        background: "radial-gradient(circle at 30% 10%, #111, #000)",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      <Header title="Notifications" />

      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-8">
        {newNotifications.length === 0 && earlierNotifications.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {newNotifications.length > 0 && (
              <>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="text-[17px] font-semibold">New</h2>
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-blue-400 hover:opacity-80"
                  >
                    Mark all as read
                  </button>
                </div>

                <motion.div layout className="space-y-3 mb-8">
                  <AnimatePresence>
                    {newNotifications.map((n, index) => (
                      <motion.div
                        key={n.id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ type: "spring", stiffness: 220, damping: 28, delay: index * 0.04 }}
                      >
                        <SwipeableNotification
                          id={n.id}
                          onRemove={(id) => handleRemove(id, true)}
                        >
                          <NotificationItem {...n} />
                        </SwipeableNotification>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </>
            )}

            {earlierNotifications.length > 0 && (
              <>
                <div className="mb-4">
                  <h2 className="text-[17px] font-semibold">Earlier</h2>
                </div>

                <motion.div layout className="space-y-3">
                  <AnimatePresence>
                    {earlierNotifications.map((n, index) => (
                      <motion.div
                        key={n.id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ type: "spring", stiffness: 220, damping: 28, delay: index * 0.03 }}
                      >
                        <SwipeableNotification
                          id={n.id}
                          onRemove={(id) => handleRemove(id, false)}
                        >
                          <NotificationItem {...n} />
                        </SwipeableNotification>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Notifications;
