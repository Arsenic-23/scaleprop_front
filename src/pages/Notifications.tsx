import React from "react";

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

  const containerStyle = {
    backgroundColor: COLORS.surfaceDark,
    borderRadius: "1rem",
    fontFamily: "Manrope, sans-serif",
  };

  return (
    <div
      className={`flex items-start gap-4 p-4 relative ${opacityClass}`}
      style={containerStyle}
    >
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconWrapperClasses} ${iconColorClass}`}
      >
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>

      <div className="flex-1" style={{ fontFamily: "Manrope, sans-serif" }}>
        <div className="flex items-center justify-between">
          <p className="font-semibold text-base" style={{ color: COLORS.textDark }}>
            {title}
          </p>
          <p className="text-xs" style={{ color: COLORS.textMutedDark }}>
            {timestamp}
          </p>
        </div>
        <p className="mt-1 text-sm" style={{ color: COLORS.textMutedDark }}>
          {message}
        </p>
      </div>

      {!isRead && (
        <div
          className="absolute top-4 right-4 h-2 w-2 rounded-full"
          style={{ backgroundColor: COLORS.accentBlue }}
        ></div>
      )}
    </div>
  );
};

const Notifications: React.FC = () => {
  const newNotifications = [
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
      message: "Congratulations! You've successfully passed the 100k Challenge.",
      timestamp: "8:15 AM",
      icon: "stacked_line_chart",
      colorType: "green" as const,
      isRead: false,
    },
  ];

  const earlierNotifications = [
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
  ];

  const headerBgStyle = {
    backgroundColor: `${COLORS.backgroundDark}cc`,
  };

  const bodyStyle = {
    backgroundColor: COLORS.backgroundDark,
    minHeight: "100dvh",
    fontFamily: "Manrope, sans-serif",
  };

  const triggerVibration = () => {
    if (navigator.vibrate) {
      navigator.vibrate(60);
    }
  };

  const handleBack = () => {
    triggerVibration();
    window.history.back();
  };

  return (
    <div
      style={bodyStyle}
      className="relative flex h-screen min-h-screen w-full flex-col overflow-y-auto text-white"
    >
      <header
        className="sticky top-0 z-10 flex items-center border-b border-white/10 p-4 backdrop-blur-sm"
        style={headerBgStyle}
      >
        <button
          onClick={handleBack}
          className="flex h-11 w-11 items-center justify-center rounded-full"
          style={{ color: COLORS.textDark }}
        >
          <span className="material-symbols-outlined">
            arrow_back_ios_new
          </span>
        </button>
        <h1
          className="flex-1 text-center text-xl font-bold"
          style={{ fontFamily: "Manrope, sans-serif", color: COLORS.textDark }}
        >
          Notifications
        </h1>
        {/* Empty spacer to balance layout */}
        <div className="h-11 w-11" />
      </header>

      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-8">
        <div className="space-y-8">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2
                className="text-lg font-semibold"
                style={{ color: COLORS.textDark, fontFamily: "Manrope, sans-serif" }}
              >
                New
              </h2>
              <button
                className="text-sm hover:opacity-80 transition-colors"
                style={{ color: COLORS.accentBlue }}
              >
                Mark all as read
              </button>
            </div>
            <div className="space-y-3">
              {newNotifications.map((n) => (
                <NotificationItem key={n.id} {...n} />
              ))}
            </div>
          </div>

          <div>
            <h2
              className="mb-5 text-lg font-semibold"
              style={{ color: COLORS.textDark, fontFamily: "Manrope, sans-serif" }}
            >
              Earlier
            </h2>
            <div className="space-y-3">
              {earlierNotifications.map((n) => (
                <NotificationItem key={n.id} {...n} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Notifications;