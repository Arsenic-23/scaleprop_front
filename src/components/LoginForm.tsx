import React, { useRef, useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react";
import FrostedCard from "../components/FrostedCard";

interface LoginFormProps {
  onSuccess?: (uid: string) => void;
  onSwitchToRegister?: () => void;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!EMAIL_REGEX.test(email.trim())) return setError("Enter a valid email.");
    if (!password) return setError("Password is required.");
    setLoading(true);

    try {
      const q = query(collection(db, "users"), where("email", "==", email.trim()));
      const snap = await getDocs(q);
      if (snap.empty) {
        setError("Email not registered.");
        setLoading(false);
        return;
      }

      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      if (!cred.user.emailVerified) {
        await signOut(auth);
        setError("Verify your email before logging in.");
        setLoading(false);
        return;
      }

      localStorage.setItem("user_id", cred.user.uid);
      onSuccess?.(cred.user.uid);
    } catch {
      setError("Invalid credentials or network issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FrostedCard className="max-w-md w-full p-8 bg-[#0f0f0fd9] backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-6 font-[StackSansText]">
        <h1 className="text-center text-3xl font-semibold text-white tracking-tight">Login</h1>

        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-xl bg-white/5 text-gray-200 placeholder-gray-500 focus:ring-0 focus:outline-none border border-white/10"
        />

        <div className="relative">
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 pr-10 rounded-xl bg-white/5 text-gray-200 placeholder-gray-500 focus:ring-0 focus:outline-none border border-white/10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-200"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {error && <div className="text-red-400 text-sm text-center">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-xl font-medium transition-all bg-white/10 hover:bg-white/20 text-white border border-white/10 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-sm text-gray-400 text-center">
          Don’t have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-gray-200 underline hover:text-white"
          >
            Register
          </button>
        </div>
      </form>
    </FrostedCard>
  );
};

export default LoginForm;

