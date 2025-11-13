import React, { useState, useEffect, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  reload,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { Eye, EyeOff } from "lucide-react";
import FrostedCard from "../components/FrostedCard";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [verified, setVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const startCheck = () => {
    if (pollRef.current) return;
    pollRef.current = setInterval(async () => {
      if (auth.currentUser) {
        await reload(auth.currentUser);
        if (auth.currentUser.emailVerified) {
          clearInterval(pollRef.current!);
          setVerified(true);
          setInfo("Email verified. You can continue.");
        }
      }
    }, 4000);
  };

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    if (!firstName.trim() || !lastName.trim()) return setError("Enter full name.");
    if (password.length < 8) return setError("Password must be 8+ characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: `${firstName} ${lastName}` });
      await setDoc(doc(db, "users", cred.user.uid), {
        firstName,
        lastName,
        email,
        uid: cred.user.uid,
        verified: false,
        createdAt: serverTimestamp(),
      });

      await sendEmailVerification(cred.user);
      setInfo("Verification email sent.");
      setResendTimer(60);
      startCheck();
    } catch {
      setError("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!auth.currentUser) return;
    try {
      await sendEmailVerification(auth.currentUser);
      setInfo("Verification email resent.");
      setResendTimer(60);
    } catch {
      setError("Failed to resend email.");
    }
  };

  const handleContinue = () => navigate("/home");

  return (
    <FrostedCard className="max-w-md w-full p-8 bg-[#0f0f0fd9] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
      <form onSubmit={handleRegister} className="flex flex-col space-y-6 font-[StackSansText]">
        <h1 className="text-center text-3xl font-semibold text-white tracking-tight">Register</h1>

        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 rounded-xl bg-white/5 text-gray-200 placeholder-gray-500 focus:ring-0 focus:outline-none border border-white/10"
            required
          />
          <input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 rounded-xl bg-white/5 text-gray-200 placeholder-gray-500 focus:ring-0 focus:outline-none border border-white/10"
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-xl bg-white/5 text-gray-200 placeholder-gray-500 focus:ring-0 focus:outline-none border border-white/10"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded-xl bg-white/5 text-gray-200 placeholder-gray-500 focus:ring-0 focus:outline-none border border-white/10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full p-3 pr-10 rounded-xl bg-white/5 text-gray-200 placeholder-gray-500 focus:ring-0 focus:outline-none border border-white/10"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm((p) => !p)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        {info && <div className="text-green-400 text-sm text-center">{info}</div>}

        <button
          type={verified ? "button" : "submit"}
          onClick={verified ? handleContinue : undefined}
          disabled={loading}
          className={`w-full p-3 rounded-xl font-medium transition-all bg-white/10 hover:bg-white/20 text-white border border-white/10 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Processing..." : verified ? "Continue" : "Register"}
        </button>

        {resendTimer > 0 ? (
          <div className="text-xs text-gray-400 text-right">Resend available in {resendTimer}s</div>
        ) : (
          info && !verified && (
            <div className="text-xs text-gray-400 text-right">
              Didn’t get the email?{' '}
              <button
                type="button"
                onClick={handleResend}
                className="text-gray-200 underline hover:text-white"
              >
                Resend
              </button>
            </div>
          )
        )}

        <div className="text-sm text-gray-400 text-center">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-gray-200 underline hover:text-white"
          >
            Log in
          </button>
        </div>
      </form>
    </FrostedCard>
  );
};

export default RegisterForm;
