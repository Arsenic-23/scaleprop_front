import React, { useState } from "react";
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

interface NotificationItemProps extends Notification {}

const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  message,
  timestamp,
  icon,
  colorType,
  isRead,
}) => {
  let iconWrapperClasses = "";
  let iconColorClass = "";
  const opacityClass = isRead ? "opacity-60" : "";

  if (colorType === "blue") {
    iconWrapperClasses = "bg-blue-500/10";
    iconColorClass = "text-blue-500";
  } else if (colorType === "green") {
    iconWrapperClasses = "bg-green-500/10";
    iconColorClass = "text-green-500";
  } else {
    iconWrapperClasses = "bg-white/5";
    iconColorClass = "text-white/50";
  }

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
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconWrapperClasses} ${iconColorClass}`}
        >
          <span className="material-symbols-outlined text-2xl">{icon}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between flex-wrap gap-x-3">
            <p
              className="font-semibold text-base leading-tight text-white"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {title}
            </p>
            <p className="text-xs whitespace-nowrap text-white/60">
              {timestamp}
            </p>
          </div>

          <p className="mt-1 text-sm leading-snug text-white/60 break-words">
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
              boxShadow: "0 0 6px rgba(59,130,246,0.8)",
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
        "Congratulations! You've successfully passed the 100k Challenge. Keep up the great work!",
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
        "Your account #123456 is approaching the margin limit. Please take action.",
      timestamp: "Yesterday, 3:30 PM",
      icon: "warning",
      colorType: "muted",
      isRead: true,
    },
    {
      id: 4,
      title: "System Update",
      message:
        "A new platform update will be deployed on Sunday. Expect brief downtime during rollout.",
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

    setTimeout(() => {
      setEarlierNotifications((prev) => [...marked, ...prev]);
    }, 300);
  };

  const handleRemoveNew = (id: number) =>
    setNewNotifications((prev) => prev.filter((n) => n.id !== id));

  const handleRemoveEarlier = (id: number) =>
    setEarlierNotifications((prev) => prev.filter((n) => n.id !== id));

  return (
    <div
      style={{
        backgroundColor: COLORS.backgroundDark,
        minHeight: "100dvh",
        fontFamily: "Manrope, sans-serif",
      }}
      className="relative flex h-screen w-full flex-col text-white overflow-hidden"
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
                  <AnimatePresence>
                    {newNotifications.map((n, index) => (
                      <motion.div
                        key={n.id}
                        layout
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 28,
                          delay: index * 0.04,
                        }}
                      >
                        <SwipeableNotification
                          id={n.id}
                          onRemove={handleRemoveNew}
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
                  <AnimatePresence>
                    {earlierNotifications.map((n, index) => (
                      <motion.div
                        key={n.id}
                        layout
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 28,
                          delay: index * 0.03,
                        }}
                      >
                        <SwipeableNotification
                          id={n.id}
                          onRemove={handleRemoveEarlier}
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
