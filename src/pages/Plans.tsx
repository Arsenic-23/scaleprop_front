// src/pages/Plans.tsx
import { useNavigate } from 'react-router-dom';

const Plans = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: string, price: number) => {
    localStorage.setItem('selected_plan', plan);
    localStorage.setItem('selected_price', price.toString());
    navigate('/payment');
  };

  const plans = [
    { name: 'Beginner Challenge', price: 499, details: 'Demo $10,000 / 5% drawdown' },
    { name: 'Pro Trader Challenge', price: 999, details: 'Demo $25,000 / 8% drawdown' },
    { name: 'Elite Funded Track', price: 1999, details: 'Demo $50,000 / 10% drawdown' },
  ];

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">💼 Choose a Challenge</h2>

      <div className="grid gap-4">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="p-4 border rounded-lg shadow bg-white"
          >
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <p className="text-sm text-gray-600">{plan.details}</p>
            <p className="font-bold my-2">₹{plan.price}</p>
            <button
              onClick={() => handleSelectPlan(plan.name, plan.price)}
              className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
