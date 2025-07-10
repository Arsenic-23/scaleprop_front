// src/pages/Announcements.tsx
import { useEffect, useState } from 'react';

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
        title: 'New Challenge Plan Added 🎯',
        message: 'We have added a $100k challenge with 90% profit split!',
        date: '2025-07-10',
      },
      {
        id: 2,
        title: 'UPI Payments Now Supported 💳',
        message: 'You can now pay using UPI and QR directly in the app.',
        date: '2025-07-08',
      },
    ];

    setAnnouncements(dummyAnnouncements);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">📢 Announcements</h2>

      {announcements.length > 0 ? (
        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a.id} className="p-3 border rounded shadow bg-white">
              <h3 className="font-semibold">{a.title}</h3>
              <p className="text-sm text-gray-600">{a.message}</p>
              <p className="text-xs text-gray-400 mt-1">{a.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-sm">No announcements yet.</p>
      )}
    </div>
  );
};

export default Announcements;
