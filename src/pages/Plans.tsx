import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton"; // ✅ Reusable back button

const Plans = () => {
  const navigate = useNavigate();

  const handleSelectPlan = (plan: string, price: number) => {
    localStorage.setItem("selected_plan", plan);
    localStorage.setItem("selected_price", price.toString());
    navigate("/payment");
  };

  const plans = [
    {
      name: "Beginner Challenge",
      price: 499,
      details: "Demo $10,000 • 5% Max Drawdown",
      emoji: "🚀",
    },
    {
      name: "Pro Trader Challenge",
      price: 999,
      details: "Demo $25,000 • 8% Max Drawdown",
      emoji: "🏆",
    },
    {
      name: "Elite Funded Track",
      price: 1999,
      details: "Demo $50,000 • 10% Max Drawdown",
      emoji: "💎",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-4 py-6">
      {/* ✅ Reusable Back Button */}
      <div className="mb-6">
        <BackButton />
      </div>

      {/* Heading */}
      <h2 className="text-2xl font-bold mb-8 text-center">
        💼 Choose Your Trading Challenge
      </h2>

      {/* Plans Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer"
            onClick={() => handleSelectPlan(plan.name, plan.price)}
          >
            <div className="text-4xl mb-3">{plan.emoji}</div>
            <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
            <p className="text-gray-300 text-sm mb-4">{plan.details}</p>
            <p className="text-2xl font-bold mb-6">₹{plan.price}</p>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-700 py-2 rounded-full font-semibold hover:opacity-90 transition">
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;