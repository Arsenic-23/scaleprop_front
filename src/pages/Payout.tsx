// src/pages/Payout.tsx
import { useState } from 'react';

const Payout = () => {
  const [method, setMethod] = useState('UPI');
  const [details, setDetails] = useState('');

  const handleSubmit = () => {
    if (!details) return alert('Please enter your payout details');
    alert(`✅ Payout request sent via ${method}. Our team will process it soon.`);
    setDetails('');
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">💸 Request Payout</h2>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Choose Method:</label>
        <select
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 rounded border"
        >
          <option value="UPI">UPI</option>
          <option value="Crypto">Crypto (USDT)</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Enter {method} ID:</label>
        <input
          type="text"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder={method === 'UPI' ? 'example@upi' : 'Your USDT Wallet Address'}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
      >
        Request Payout
      </button>

      <p className="text-xs text-gray-400 mt-4">
        Manual verification by admin is required before processing payouts.
      </p>
    </div>
  );
};

export default Payout;
