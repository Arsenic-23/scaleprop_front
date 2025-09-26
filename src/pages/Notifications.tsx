import React from "react";

const Notifications: React.FC = () => {
  const notifications = [
    { id: 1, title: "Profit Target Update", message: "You reached 60% of your target." },
    { id: 2, title: "Daily Drawdown Alert", message: "You used 30% of your daily limit." },
    { id: 3, title: "System Update", message: "New features added to your dashboard." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-950 via-black to-neutral-900 text-white p-6">
      <h1 className="text-xl font-bold mb-4">Notifications</h1>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <p className="text-gray-400">No notifications</p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="p-4 bg-slate-800 rounded-xl shadow border border-white/10"
            >
              <h2 className="font-semibold">{n.title}</h2>
              <p className="text-sm text-gray-300">{n.message}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;