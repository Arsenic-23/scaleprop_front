// src/pages/AdminPanel.tsx
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  status: 'pending' | 'active' | 'blocked';
  plan: string;
  paid: boolean;
}

const mockUsers: User[] = [
  { id: 1001, name: 'TraderOne', status: 'pending', plan: 'Beginner', paid: false },
  { id: 1002, name: 'TraderTwo', status: 'active', plan: 'Pro', paid: true },
  { id: 1003, name: 'TraderThree', status: 'blocked', plan: 'Elite', paid: true },
];

const AdminPanel = () => {
  const [users, setUsers] = useState(mockUsers);

  const confirmPayment = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, paid: true, status: 'active' } : u))
    );
  };

  const blockUser = (id: number) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, status: 'blocked' } : u))
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold text-center mb-4">🛠️ Admin Panel</h2>

      {users.map((user) => (
        <div
          key={user.id}
          className="border rounded p-3 mb-3 shadow bg-white"
        >
          <p><strong>{user.name}</strong> (ID: {user.id})</p>
          <p className="text-sm text-gray-600">Plan: {user.plan}</p>
          <p className="text-sm">
            Status: <span className="font-bold">{user.status}</span>
          </p>
          <p className="text-sm">Payment: {user.paid ? '✅ Confirmed' : '❌ Not Paid'}</p>

          {!user.paid && (
            <button
              onClick={() => confirmPayment(user.id)}
              className="bg-green-600 text-white px-3 py-1 mt-2 mr-2 rounded"
            >
              ✅ Confirm Payment
            </button>
          )}

          {user.status !== 'blocked' && (
            <button
              onClick={() => blockUser(user.id)}
              className="bg-red-600 text-white px-3 py-1 mt-2 rounded"
            >
              ⛔ Block Account
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;