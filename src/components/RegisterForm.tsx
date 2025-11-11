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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [checking, setChecking] = useState(false);
  const [verified, setVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const navigate = useNavigate();
  const pollRef = useRef<NodeJS.Timeout | null>(null);

  const startVerificationCheck = () => {
    if (pollRef.current) return;
    setChecking(true);
    pollRef.current = setInterval(async () => {
      if (auth.currentUser) {
        await reload(auth.currentUser);
        if (auth.currentUser.emailVerified) {
          clearInterval(pollRef.current!);
          pollRef.current = null;
          setVerified(true);
          setChecking(false);
          setInfo("Email verified! You can now continue to Home.");
        }
      }
    }, 4000);
  };

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setVerified(false);

    if (!firstName.trim() || !lastName.trim())
      return setError("Please enter your first and last name.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      await updateProfile(user, { displayName: `${firstName} ${lastName}` });

      await setDoc(
        doc(db, "users", user.uid),
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email,
          uid: user.uid,
          verified: false,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      await sendEmailVerification(user);
      setInfo("Verification email sent. Please check your inbox.");
      setResendTimer(60);
      startVerificationCheck();
    } catch (err: any) {
      let msg = "Registration failed.";
      switch (err.code) {
        case "auth/email-already-in-use":
          msg = "This email is already registered.";
          break;
        case "auth/invalid-email":
          msg = "Invalid email format.";
          break;
        case "auth/weak-password":
          msg = "Password is too weak.";
          break;
        case "auth/network-request-failed":
          msg = "Network error. Check your connection.";
          break;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!auth.currentUser) return;
    try {
      await sendEmailVerification(auth.currentUser);
      setInfo("Verification email resent successfully.");
      setResendTimer(60);
    } catch {
      setError("Failed to resend verification email.");
    }
  };

  const handleContinue = () => {
    navigate("/home");
  };

  return (
    <FrostedCard className="w-full max-w-md mx-auto p-6 bg-[rgba(0,0,0,0.6)] backdrop-blur-lg border border-[rgba(255,255,255,0.1)] rounded-2xl shadow-lg">
      <form onSubmit={handleRegister} className="flex flex-col space-y-4">
        <h1 className="text-2xl font-normal text-center text-white tracking-wide">
          Register
        </h1>

        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 rounded-md bg-[rgba(255,255,255,0.08)] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 rounded-md bg-[rgba(255,255,255,0.08)] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-3 rounded-md bg-[rgba(255,255,255,0.08)] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-400"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded-md bg-[rgba(255,255,255,0.08)] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-3 text-gray-400 hover:text-green-400"
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
            className="w-full p-3 pr-10 rounded-md bg-[rgba(255,255,255,0.08)] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-400"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm((p) => !p)}
            className="absolute right-3 top-3 text-gray-400 hover:text-green-400"
          >
            {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        {info && <div className="text-green-400 text-sm text-center">{info}</div>}
        {checking && !verified && (
          <div className="text-gray-400 text-sm text-center animate-pulse">
            Waiting for verification...
          </div>
        )}

        {resendTimer > 0 ? (
          <div className="text-xs text-right text-gray-400">
            Resend available in {resendTimer}s
          </div>
        ) : (
          info &&
          !verified && (
            <div className="text-xs text-right text-gray-400">
              Didn’t get the email?{" "}
              <button
                type="button"
                onClick={handleResend}
                className="text-green-400 hover:text-green-300 underline ml-1"
              >
                Resend
              </button>
            </div>
          )
        )}

        <button
          type={verified ? "button" : "submit"}
          onClick={verified ? handleContinue : undefined}
          disabled={loading || (checking && !verified)}
          className={`w-full p-3 rounded-md text-white font-medium transition-all ${
            loading || (checking && !verified)
              ? "bg-green-900 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 active:bg-green-800"
          }`}
        >
          {loading
            ? "Processing..."
            : checking && !verified
            ? "Waiting for verification..."
            : verified
            ? "Continue to Home"
            : "Register"}
        </button>

        <div className="text-sm text-gray-400 text-center mt-3">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-green-400 hover:text-green-300 underline"
          >
            Log in
          </button>
        </div>
      </form>
    </FrostedCard>
  );
};

export default RegisterForm;
