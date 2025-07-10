// src/pages/Rules.tsx

const Rules = () => {
  return (
    <div className="p-4 max-w-md mx-auto text-left">
      <h2 className="text-xl font-bold text-center mb-4">📘 Challenge Rules</h2>

      <ul className="space-y-4 text-sm text-gray-700">
        <li>
          ✅ <strong>Max Daily Drawdown:</strong> 5% of starting balance
        </li>
        <li>
          ✅ <strong>Max Total Drawdown:</strong> 10%
        </li>
        <li>
          ✅ <strong>Profit Target:</strong> 8% in 30 days
        </li>
        <li>
          ✅ <strong>Trading Days Required:</strong> Minimum 5 active days
        </li>
        <li>
          ❌ <strong>EA/Bot Usage:</strong> Not allowed
        </li>
        <li>
          ❌ <strong>News Trading:</strong> Restricted during high-volatility events
        </li>
        <li>
          ❌ <strong>Holding Trades Over Weekend:</strong> Not permitted
        </li>
      </ul>

      <div className="mt-6 text-center text-sm text-gray-500">
        Violation of rules will result in account disqualification.
      </div>
    </div>
  );
};

export default Rules;
