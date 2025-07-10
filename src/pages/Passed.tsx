// src/pages/Passed.tsx

const Passed = () => {
  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4 text-green-600">🎉 Congratulations!</h2>
      <p className="text-gray-700 mb-2">
        You’ve successfully passed the challenge.
      </p>
      <p className="text-sm text-gray-500 mb-6">
        Our team will review your account and assign your funded credentials shortly.
      </p>

      <div className="bg-green-100 border border-green-400 rounded p-4 text-green-800 max-w-md mx-auto">
        <p><strong>Status:</strong> Passed ✅</p>
        <p><strong>Next Step:</strong> Funded Account Preparation</p>
      </div>

      <div className="mt-6 text-sm text-gray-400">
        If your payout is simulated, your profits will be credited manually based on your trades.
      </div>
    </div>
  );
};

export default Passed;
