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
import { useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const pollRef = useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  const startVerificationCheck = () => {
    if (pollRef.current) return;
    pollRef.current = setInterval(async () => {
      if (auth.currentUser) {
        await reload(auth.currentUser);
        if (auth.currentUser.emailVerified) {
          clearInterval(pollRef.current!);
          pollRef.current = null;
          setVerified(true);
          setInfo("Email verified! You can continue.");
        }
      }
    }, 4000);
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    if (!firstName || !lastName) return setError("Please enter your full name.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });
      await setDoc(doc(db, "users", user.uid), {
        firstName,
        lastName,
        email,
        createdAt: serverTimestamp(),
      });
      await sendEmailVerification(user);
      setInfo("Verification email sent. Check your inbox.");
      setResendTimer(60);
      startVerificationCheck();
    } catch (err: any) {
      const msg =
        err.code === "auth/email-already-in-use"
          ? "This email is already registered."
          : err.code === "auth/invalid-email"
          ? "Invalid email address."
          : err.code === "auth/weak-password"
          ? "Weak password."
          : "Registration failed.";
      setError(msg);
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
      setError("Failed to resend verification email.");
    }
  };

  const handleContinue = () => navigate("/home");

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 rounded-lg bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 rounded-lg bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
        </div>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded-lg bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-3 text-gray-400 hover:text-white"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full p-3 pr-10 rounded-lg bg-black border border-white text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((p) => !p)}
            className="absolute right-3 top-3 text-gray-400 hover:text-white"
          >
            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        {info && <p className="text-green-400 text-sm text-center">{info}</p>}

        {resendTimer > 0 && !verified && (
          <p className="text-xs text-center text-gray-400">
            Resend available in {resendTimer}s
          </p>
        )}
        {resendTimer <= 0 && info && !verified && (
          <p className="text-xs text-center text-gray-400">
            Didn’t get the email?{" "}
            <button
              type="button"
              onClick={handleResend}
              className="underline text-white hover:text-gray-300"
            >
              Resend
            </button>
          </p>
        )}

        <button
          type={verified ? "button" : "submit"}
          onClick={verified ? handleContinue : undefined}
          disabled={loading}
          className="w-full py-3 mt-2 bg-white text-black font-semibold rounded-lg hover:bg-transparent hover:text-white border border-white transition"
        >
          {loading
            ? "Processing..."
            : verified
            ? "Continue to Home"
            : "Register"}
        </button>

        <p className="text-sm text-center text-gray-400 mt-3">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="underline text-white hover:text-gray-200"
          >
            Login
          </button>
        </p>
      </form>
    </AuthLayout>
  );
};

export default RegisterForm;
