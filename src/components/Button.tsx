import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="flex items-center text-sm text-blue-600 mb-4"
    >
      <ArrowLeft className="w-4 h-4 mr-1" />
      Back
    </button>
  );
};

export default BackButton;