import React, { useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  onAuthStateChanged,
  reload,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { Eye, EyeOff } from "lucide-react";
import FrostedCard from "../components/FrostedCard";
import { useNavigate } from "react-router-dom";

interface RegisterFormProps {
  onSuccess?: (uid: string) => void;
  onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
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
  const [verificationSent, setVerificationSent] = useState(false);
  const [resending, setResending] = useState(false);

  const navigate = useNavigate();

  // Automatically redirect if user verified
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await reload(user);
        if (user.emailVerified) {
          navigate("/home");
        }
      }
    });
    return unsubscribe;
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!firstName.trim() || !lastName.trim()) return setError("Please enter your first and last name.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      await updateProfile(user, { displayName: `${firstName.trim()} ${lastName.trim()}` });

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
      setVerificationSent(true);
      setInfo("Verification email sent. Please check your inbox.");
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
        default:
          msg = err.message || "Unexpected error occurred.";
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!auth.currentUser) return;
    setResending(true);
    setError(null);
    try {
      await reload(auth.currentUser);
      await sendEmailVerification(auth.currentUser);
      setInfo("Verification email resent successfully.");
    } catch {
      setError("Failed to resend verification email. Try again later.");
    } finally {
      setResending(false);
    }
  };

  return (
    <FrostedCard>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
        <h1 className="text-2xl font-semibold text-center text-green-200 mb-4">Register</h1>

        <div className="grid grid-cols-2 gap-3">
          <input
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 rounded bg-[rgba(255,255,255,0.05)] focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500"
            required
          />
          <input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 rounded bg-[rgba(255,255,255,0.05)] focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500"
            required
          />
        </div>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-[rgba(255,255,255,0.05)] focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500"
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded bg-[rgba(255,255,255,0.05)] focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-3 text-gray-400 hover:text-green-300"
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
            className="w-full p-3 pr-10 rounded bg-[rgba(255,255,255,0.05)] focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirm((p) => !p)}
            className="absolute right-3 top-3 text-gray-400 hover:text-green-300"
          >
            {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        {info && <div className="text-green-400 text-sm text-center">{info}</div>}

        <button
          type="submit"
          disabled={loading || verificationSent}
          className={`w-full p-3 rounded-xl font-medium transition-all ${
            loading
              ? "bg-[rgba(0,255,0,0.2)] text-gray-400 cursor-not-allowed"
              : "bg-[rgba(0,255,0,0.15)] hover:bg-[rgba(0,255,0,0.25)] text-green-200"
          }`}
        >
          {loading ? "Creating account..." : verificationSent ? "Verification Sent" : "Create account"}
        </button>

        {verificationSent && (
          <div className="text-xs text-right text-gray-400 mt-1">
            Didn’t get the email?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={resending}
              className="text-green-400 hover:text-green-300 underline ml-1"
            >
              {resending ? "Resending..." : "Resend"}
            </button>
          </div>
        )}

        <div className="text-sm text-gray-400 text-center mt-3">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="underline text-green-400 hover:text-green-300"
          >
            Log in
          </button>
        </div>
      </form>
    </FrostedCard>
  );
};

export default RegisterForm;
