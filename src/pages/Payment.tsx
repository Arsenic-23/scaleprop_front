// src/pages/Payment.tsx
import { useNavigate } from 'react-router-dom';

const Payment = () => {
  const navigate = useNavigate();

  const plan = localStorage.getItem('selected_plan');
  const price = localStorage.getItem('selected_price');
  const userId = localStorage.getItem('user_id');

  const handleConfirm = () => {
    alert('Please wait for admin to verify payment manually.');
    navigate('/account');
  };

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-2">💳 Payment</h2>
      <p className="text-gray-500 text-sm mb-2">Plan: <strong>{plan}</strong></p>
      <p className="text-gray-500 text-sm mb-4">Amount: ₹{price}</p>

      <img
        src="/qr.png"
        alt="QR Code"
        className="mx-auto mb-4 w-48 h-48 border rounded shadow"
      />
      <p className="text-sm">Or pay manually to:</p>
      <p className="font-semibold text-lg text-blue-600">utkarsh@upi</p>

      <button
        onClick={handleConfirm}
        className="mt-6 bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition"
      >
        ✅ I’ve Paid
      </button>

      <p className="text-xs text-gray-400 mt-4">
        Your user ID: <strong>{userId}</strong>
      </p>
    </div>
  );
};

export default Payment;
