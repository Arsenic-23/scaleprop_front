import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../components/Header";
import SwipeableNotification from "../components/Swipeable";

const COLORS = {
  primary: "#3B82F6",
  backgroundDark: "#000000",
  surfaceDark: "#101010",
  textDark: "#FFFFFF",
  textMutedDark: "#8A8A8A",
  accentBlue: "#3B82F6",
};

interface NotificationItemProps {
  title: string;
  message: string;
  timestamp: string;
  icon: string;
  colorType: "blue" | "green" | "muted";
  isRead: boolean;
}

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
  let opacityClass = isRead ? "opacity-60" : "";

  if (colorType === "blue") {
    iconWrapperClasses = "bg-blue-500/10";
    iconColorClass = "text-blue-500";
  } else if (colorType === "green") {
    iconWrapperClasses = "bg-green-500/10";
    iconColorClass = "text-green-500";
  } else {
    iconWrapperClasses = "bg-white/5";
    iconColorClass = `text-[${COLORS.textMutedDark}]`;
  }

  return (
    <div
      className={`flex items-start gap-4 p-4 relative transition-all duration-500 ease-in-out ${opacityClass}`}
      style={{
        backgroundColor: COLORS.surfaceDark,
        borderRadius: "1rem",
        fontFamily: "Manrope, sans-serif",
      }}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-500 ease-in-out ${iconWrapperClasses} ${iconColorClass}`}
      >
        <span className="material-symbols-outlined text-2xl transition-colors duration-500 ease-in-out">
          {icon}
        </span>
      </div>

      <div className="flex-1" style={{ fontFamily: "Manrope, sans-serif" }}>
        <div className="flex items-center justify-between">
          <p
            className="font-semibold text-base transition-colors duration-500 ease-in-out"
            style={{ color: COLORS.textDark }}
          >
            {title}
          </p>
          <p
            className="text-xs whitespace-nowrap transition-colors duration-500 ease-in-out"
            style={{ color: COLORS.textMutedDark }}
          >
            {timestamp}
          </p>
        </div>
        <p
          className="mt-1 text-sm leading-snug transition-colors duration-500 ease-in-out"
          style={{ color: COLORS.textMutedDark }}
        >
          {message}
        </p>
      </div>

      {!isRead && (
        <div
          className="absolute top-4 right-4 h-2 w-2 rounded-full transition-opacity duration-500 ease-in-out"
          style={{ backgroundColor: COLORS.accentBlue }}
        ></div>
      )}
    </div>
  );
};

const Notifications: React.FC = () => {
  const [newNotifications, setNewNotifications] = useState([
    {
      id: 1,
      title: "Payout Confirmed",
      message:
        "Your payout of $5,231.00 has been processed and is on its way to you.",
      timestamp: "9:41 AM",
      icon: "account_balance_wallet",
      colorType: "blue" as const,
      isRead: false,
    },
    {
      id: 2,
      title: "Challenge Passed",
      message:
        "Congratulations! You've successfully passed the 100k Challenge.",
      timestamp: "8:15 AM",
      icon: "stacked_line_chart",
      colorType: "green" as const,
      isRead: false,
    },
  ]);

  const [earlierNotifications, setEarlierNotifications] = useState([
    {
      id: 3,
      title: "Margin Call",
      message:
        "Your account #123456 is approaching the margin limit. Please take action.",
      timestamp: "Yesterday, 3:30 PM",
      icon: "warning",
      colorType: "muted" as const,
      isRead: true,
    },
    {
      id: 4,
      title: "System Update",
      message:
        "A new platform update will be deployed on Sunday. Expect brief downtime.",
      timestamp: "Yesterday, 11:00 AM",
      icon: "new_releases",
      colorType: "muted" as const,
      isRead: true,
    },
    {
      id: 5,
      title: "Account Funded",
      message:
        "Your challenge account #987654 has been successfully funded.",
      timestamp: "Yesterday, 9:02 AM",
      icon: "paid",
      colorType: "muted" as const,
      isRead: true,
    },
  ]);

  const handleMarkAllAsRead = () => {
    const marked = newNotifications.map((n) => ({
      ...n,
      isRead: true,
      colorType: "muted" as const,
    }));

    // animate out first
    setNewNotifications((prev) =>
      prev.map((n) => ({ ...n, isRead: true, colorType: "muted" as const }))
    );

    // after animation, move them down
    setTimeout(() => {
      setEarlierNotifications((prev) => [...marked, ...prev]);
      setNewNotifications([]);
    }, 500); // matches motion animation duration
  };

  const handleRemoveNew = (id: number) => {
    setNewNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleRemoveEarlier = (id: number) => {
    setEarlierNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div
      style={{
        backgroundColor: COLORS.backgroundDark,
        minHeight: "100dvh",
        fontFamily: "Manrope, sans-serif",
        WebkitOverflowScrolling: "touch",
      }}
      className="relative flex h-screen min-h-screen w-full flex-col text-white overflow-hidden"
    >
      <Header title="Notifications" />

      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-8 will-change-transform">
        {newNotifications.length > 0 && (
          <>
            <div className="mb-5 flex items-center justify-between">
              <h2
                className="text-lg font-semibold"
                style={{
                  color: COLORS.textDark,
                  fontFamily: "Manrope, sans-serif",
                }}
              >
                New
              </h2>
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm hover:opacity-80 transition-colors"
                style={{ color: COLORS.accentBlue }}
              >
                Mark all as read
              </button>
            </div>
            <div className="space-y-3 mb-8">
              <AnimatePresence>
                {newNotifications.map((n) => (
                  <motion.div
                    key={n.id}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
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
            </div>
          </>
        )}

        <div className="mb-5">
          <h2
            className="text-lg font-semibold"
            style={{
              color: COLORS.textDark,
              fontFamily: "Manrope, sans-serif",
            }}
          >
            Earlier
          </h2>
        </div>
        <div className="space-y-3">
          <AnimatePresence>
            {earlierNotifications.map((n) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
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
        </div>
      </main>
    </div>
  );
};

export default Notifications;