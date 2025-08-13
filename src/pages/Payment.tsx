import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton"; // ✅ Reusable back button

const Payment = () => {
  const navigate = useNavigate();

  const plan = localStorage.getItem("selected_plan");
  const price = localStorage.getItem("selected_price");
  const userId = localStorage.getItem("user_id");

  const handleConfirm = () => {
    alert("✅ Payment marked! Please wait for admin verification.");
    navigate("/account");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6 flex flex-col">
      {/* ✅ Reusable Back Button */}
      <div className="mb-6">
        <BackButton />
      </div>

      {/* Payment Card */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto border border-gray-700">
        <h2 className="text-2xl font-bold mb-4 text-center">
          💳 Complete Your Payment
        </h2>

        {/* Plan & Price */}
        <div className="bg-gray-900 p-4 rounded-xl border border-gray-700 mb-6 text-center">
          <p className="text-gray-400 text-sm">Selected Plan</p>
          <p className="text-lg font-semibold">{plan}</p>
          <p className="mt-2 text-gray-400 text-sm">Amount to Pay</p>
          <p className="text-2xl font-bold text-green-400">₹{price}</p>
        </div>

        {/* QR Code */}
        <div className="flex flex-col items-center">
          <img
            src="/qr.png"
            alt="QR Code"
            className="w-48 h-48 border-4 border-gray-700 rounded-xl shadow-lg mb-4"
          />
          <p className="text-gray-400 text-sm">Or pay manually to:</p>
          <p className="text-lg font-semibold text-blue-400">utkarsh@upi</p>
        </div>

        {/* Confirm Button */}
        <button
          onClick={handleConfirm}
          className="mt-6 w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl font-semibold transition shadow-lg"
        >
          ✅ I’ve Paid
        </button>

        {/* User ID */}
        <p className="text-xs text-gray-500 mt-4 text-center">
          Your User ID: <span className="font-semibold">{userId}</span>
        </p>
      </div>
    </div>
  );
};

export default Payment;