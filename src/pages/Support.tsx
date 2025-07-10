// src/pages/Support.tsx
import { useState } from 'react';

const Support = () => {
  const [issue, setIssue] = useState('');

  const handleSubmit = () => {
    if (!issue.trim()) {
      alert('Please describe your issue.');
      return;
    }

    // Later: Send to backend (e.g. POST /support)
    alert('📨 Support request submitted. We will get back to you soon!');
    setIssue('');
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">📞 Support</h2>
      <p className="text-sm text-gray-500 mb-4">
        Having trouble with your challenge or payout? Let us know below:
      </p>

      <textarea
        value={issue}
        onChange={(e) => setIssue(e.target.value)}
        placeholder="Describe your issue..."
        className="w-full p-3 border rounded mb-4 h-32"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
      >
        Submit
      </button>
    </div>
  );
};

export default Support;
