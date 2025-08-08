
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";

interface Announcement {
  id: number;
  title: string;
  message: string;
  date: string;
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  useEffect(() => {
    // 🔄 Replace this with a real API fetch later
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      {/* Page Header */}
      <div className="flex items-center justify-center mb-6">
        <Bell className="text-blue-600 dark:text-blue-400 w-6 h-6 mr-2" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Announcements
        </h2>
      </div>

      {/* Announcements List */}
      {announcements.length > 0 ? (
        <div className="space-y-5">
          {announcements.map((a, index) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-5 rounded-2xl shadow-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                {a.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {a.message}
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-3">
                {new Date(a.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
          No announcements yet.
        </p>
      )}
    </div>
  );
};

export default Announcements;