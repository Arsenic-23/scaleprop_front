import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import SwipeableNotification from "../components/Swipeable";
import EmptyState from "../components/EmptyState";
import GlassCard from "../components/GlassCard";

const COLORS = {
  primary: "#3B82F6",
  backgroundDark: "#000000",
  textDark: "#FFFFFF",
  textMutedDark: "#8A8A8A",
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

// prevent animation on first mount
const useFirstRender = () => {
  const first = useRef(true);
  useEffect(() => {
    first.current = false;
  }, []);
  return first.current;
};

const NotificationItem: React.FC<Notification> = ({
  title,
  message,
  timestamp,
  icon,
  colorType,
  isRead,
}) => {
  const opacityClass = isRead ? "opacity-60" : "";
  const colorMap: Record<NotificationColor, { bg: string; text: string }> = {
    blue: { bg: "bg-blue-500/15", text: "text-blue-400" },
    green: { bg: "bg-green-500/15", text: "text-green-400" },
    muted: { bg: "bg-white/5", text: "text-white/50" },
  };

  return (
    <GlassCard
      className={`transition-all duration-300 ${opacityClass}`}
      style={{
        padding: "0.9rem 1rem",
        borderRadius: "1.1rem",
      }}
    >
      <div className="flex items-start gap-4 relative font-[Manrope]">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${colorMap[colorType].bg}`}
          style={{ minHeight: 40, minWidth: 40 }}
        >
          <span
            className={`material-symbols-outlined text-2xl ${colorMap[colorType].text}`}
            style={{ lineHeight: "1" }}
          >
            {icon}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-x-3">
            <p className="font-semibold text-base leading-tight text-white select-none">
              {title}
            </p>
            <p className="text-xs whitespace-nowrap text-white/50 select-none">
              {timestamp}
            </p>
          </div>

          <p className="mt-1 text-sm leading-snug text-white/70 break-words select-none">
            {message}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};

const Notifications: React.FC = () => {
  const isFirstRender = useFirstRender();

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
        "Congratulations! You have successfully passed the 100k Challenge.",
      timestamp: "8:15 AM",
      icon: "stacked_line_chart",
      colorType: "green",
      isRead: false,
    },
  ]);

  const [earlierNotifications, setEarlierNotifications] = useState<
    Notification[]
  >([
    {
      id: 3,
      title: "Margin Call",
      message: "Your account #123456 is approaching the margin limit.",
      timestamp: "Yesterday, 3:30 PM",
      icon: "warning",
      colorType: "muted",
      isRead: true,
    },
    {
      id: 4,
      title: "System Update",
      message: "A new platform update will be deployed on Sunday.",
      timestamp: "Yesterday, 11:00 AM",
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
    setTimeout(
      () => setEarlierNotifications((prev) => [...marked, ...prev]),
      300
    );
  };

  const handleRemove = (id: number, isNew: boolean) => {
    if (isNew) {
      setNewNotifications((prev) => prev.filter((n) => n.id !== id));
    } else {
      setEarlierNotifications((prev) => prev.filter((n) => n.id !== id));
    }
  };

  return (
    <div
      className="relative flex h-screen w-full flex-col text-white overflow-hidden bg-black"
      style={{
        minHeight: "100dvh",
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
                  <h2 className="text-lg font-semibold text-white">New</h2>
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm hover:opacity-80 transition-colors text-blue-400"
                  >
                    Mark all as read
                  </button>
                </div>

                <motion.div layout className="space-y-3 mb-8">
                  <AnimatePresence initial={false}>
                    {newNotifications.map((n) => (
                      <motion.div
                        key={n.id}
                        layout
                        initial={{ opacity: isFirstRender ? 1 : 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
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
                <div className="mb-5">
                  <h2 className="text-lg font-semibold text-white">Earlier</h2>
                </div>

                <motion.div layout className="space-y-3">
                  <AnimatePresence initial={false}>
                    {earlierNotifications.map((n) => (
                      <motion.div
                        key={n.id}
                        layout
                        initial={{ opacity: isFirstRender ? 1 : 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.18 }}
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