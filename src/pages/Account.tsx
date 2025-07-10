// src/pages/Account.tsx
import { useEffect, useState } from 'react';

interface AccountData {
  login: string;
  server: string;
  password: string;
  balance: number;
  equity: number;
  profit: number;
  status: string;
}

const Account = () => {
  const [account, setAccount] = useState<AccountData | null>(null);
  const userId = localStorage.getItem('user_id');

  useEffect(() => {
    // 🚀 Later, fetch this from your backend
    const mockAccount: AccountData = {
      login: '10123456',
      server: 'MetaTrader-Demo',
      password: 'trader123',
      balance: 10000,
      equity: 9985.5,
      profit: -14.5,
      status: 'Active',
    };

    setAccount(mockAccount);
  }, []);

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2">📊 Your Trading Account</h2>
      <p className="text-sm text-gray-500 mb-4">User ID: {userId}</p>

      {account ? (
        <div className="bg-white shadow rounded-lg p-4 text-left max-w-md mx-auto">
          <p><strong>Login:</strong> {account.login}</p>
          <p><strong>Server:</strong> {account.server}</p>
          <p><strong>Password:</strong> {account.password}</p>
          <hr className="my-3" />
          <p><strong>Balance:</strong> ${account.balance.toFixed(2)}</p>
          <p><strong>Equity:</strong> ${account.equity.toFixed(2)}</p>
          <p><strong>Profit:</strong> ${account.profit.toFixed(2)}</p>
          <p><strong>Status:</strong> {account.status}</p>
        </div>
      ) : (
        <p className="text-sm text-gray-400">Loading account details...</p>
      )}
    </div>
  );
};

export default Account;
