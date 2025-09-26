import React from "react";

// --- Configuration based on HTML Analysis ---
const COLORS = {
  primary: "#3B82F6",
  backgroundDark: "#000000",
  surfaceDark: "#101010",
  textDark: "#FFFFFF",
  textMutedDark: "#8A8A8A",
  accentBlue: "#3B82F6",
};

// --- Helper Component: NotificationItem ---
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
  // Conditional classes based on the notification type and read status
  let iconWrapperClasses = "";
  let iconColorClass = "";
  let opacityClass = isRead ? "opacity-60" : "";
  
  if (colorType === "blue") {
    // Payout Confirmed / Action items
    iconWrapperClasses = "bg-blue-500/10";
    iconColorClass = "text-blue-500";
  } else if (colorType === "green") {
    // Challenge Passed / Success items
    iconWrapperClasses = "bg-green-500/10";
    iconColorClass = "text-green-500";
  } else {
    // Read / Earlier items
    iconWrapperClasses = "bg-white/5";
    iconColorClass = `text-[${COLORS.textMutedDark}]`;
  }

  // Ensure the base container uses the correct dark surface color
  const containerStyle = {
    backgroundColor: COLORS.surfaceDark,
    borderRadius: "1rem", // Using the default radius from config
  };

  return (
    <div
      className={`flex items-start gap-4 p-4 relative ${opacityClass}`}
      style={containerStyle}
    >
      {/* Icon Wrapper */}
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconWrapperClasses} ${iconColorClass}`}
      >
        {/* Material Symbols Outlined Icon */}
        <span className="material-symbols-outlined text-2xl">{icon}</span>
      </div>

      <div className="flex-1">
        <div className="flex items-center justify-between">
          {/* Title */}
          <p className="font-semibold" style={{ color: COLORS.textDark }}>
            {title}
          </p>
          {/* Timestamp */}
          <p
            className="text-xs"
            style={{ color: COLORS.textMutedDark }}
          >
            {timestamp}
          </p>
        </div>
        {/* Message */}
        <p className="mt-1 text-sm" style={{ color: COLORS.textMutedDark }}>
          {message}
        </p>
      </div>

      {/* Unread Dot - Only render if not read */}
      {!isRead && (
        <div
          className="absolute top-4 right-4 h-2 w-2 rounded-full"
          style={{ backgroundColor: COLORS.accentBlue }}
        ></div>
      )}
    </div>
  );
};

// --- Helper Component: NavMenu (Bottom Fixed Navigation) ---
const NavMenu: React.FC = () => {
  const linkStyle = { color: COLORS.textMutedDark };
  const activeLinkStyle = { color: COLORS.accentBlue };
  const navBgStyle = {
    backgroundColor: `${COLORS.backgroundDark}cc`, // Simulating dark background with transparency
  };

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 border-t border-white/10 px-4 pt-3 pb-5 backdrop-blur-sm"
      style={navBgStyle}
    >
      <div className="flex justify-around">
        {/* Home */}
        <a className="flex flex-col items-center gap-1 transition-colors hover:text-white" style={linkStyle} href="#">
          <span className="material-symbols-outlined"> home </span>
          <span className="text-xs">Home</span>
        </a>
        {/* Challenges */}
        <a className="flex flex-col items-center gap-1 transition-colors hover:text-white" style={linkStyle} href="#">
          <span className="material-symbols-outlined"> leaderboard </span>
          <span className="text-xs">Challenges</span>
        </a>
        {/* Activity (Active) */}
        <a className="flex flex-col items-center gap-1" style={activeLinkStyle} href="#">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1, 'wght' 400" }}> notifications </span>
          <span className="text-xs font-bold">Activity</span>
        </a>
        {/* Profile */}
        <a className="flex flex-col items-center gap-1 transition-colors hover:text-white" style={linkStyle} href="#">
          <span className="material-symbols-outlined"> person </span>
          <span className="text-xs">Profile</span>
        </a>
      </div>
    </nav>
  );
};

// --- Main Component: Notifications ---
const Notifications: React.FC = () => {
  // Data structure matching the design
  const newNotifications = [
    {
      id: 1,
      title: "Payout Confirmed",
      message: "Your payout of $5,231.00 has been processed and is on its way to you.",
      timestamp: "9:41 AM",
      icon: "account_balance_wallet",
      colorType: "blue" as const, // Use 'as const' for literal types
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
      message: "Your account #123456 is approaching the margin limit. Please take action.",
      timestamp: "Yesterday, 3:30 PM",
      icon: "warning",
      colorType: "muted" as const,
      isRead: true,
    },
    {
      id: 4,
      title: "System Update",
      message: "A new platform update will be deployed on Sunday. Expect brief downtime.",
      timestamp: "Yesterday, 11:00 AM",
      icon: "new_releases",
      colorType: "muted" as const,
      isRead: true,
    },
    {
      id: 5,
      title: "Account Funded",
      message: "Your challenge account #987654 has been successfully funded.",
      timestamp: "Yesterday, 9:02 AM",
      icon: "paid",
      colorType: "muted" as const,
      isRead: true,
    },
  ];
  
  const headerBgStyle = {
    backgroundColor: `${COLORS.backgroundDark}cc`, // Simulating dark background with transparency
  };

  const bodyStyle = {
    backgroundColor: COLORS.backgroundDark,
    minHeight: "100dvh",
    fontFamily: "Manrope, sans-serif",
  }

  return (
    // Note: You must include the Material Symbols font link and the custom
    // font-variation-settings CSS in your main HTML file or global styles for icons to render correctly.
    // e.g., <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet"/>
    <div style={bodyStyle} className={`relative flex h-screen min-h-screen w-full flex-col overflow-y-auto text-white`}>
      
      {/* --- Fixed Header --- */}
      <header
        className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 p-4 backdrop-blur-sm"
        style={headerBgStyle}
      >
        <button className="flex h-11 w-11 items-center justify-center rounded-full" style={{ color: COLORS.textDark }}>
          <span className="material-symbols-outlined"> arrow_back_ios_new </span>
        </button>
        <h1 className="text-xl font-bold">Notifications</h1>
        <button className="flex h-11 w-11 items-center justify-center rounded-full" style={{ color: COLORS.textDark }}>
          <span className="material-symbols-outlined"> more_horiz </span>
        </button>
      </header>

      {/* --- Main Content Area (Scrollable) --- */}
      <main className="flex-1 overflow-y-auto px-4 pt-6 pb-24">
        <div className="space-y-8">
          
          {/* --- New Notifications Section --- */}
          <div>
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold" style={{ color: COLORS.textDark }}>New</h2>
              <button
                className="text-sm font-medium hover:opacity-80 transition-colors"
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

          {/* --- Earlier Notifications Section --- */}
          <div>
            <h2 className="mb-5 text-lg font-semibold" style={{ color: COLORS.textDark }}>Earlier</h2>
            <div className="space-y-3">
              {earlierNotifications.map((n) => (
                <NotificationItem key={n.id} {...n} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* --- Fixed Bottom Navigation Bar --- */}
      <NavMenu />
    </div>
  );
};

export default Notifications;
