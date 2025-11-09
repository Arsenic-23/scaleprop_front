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

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const mapErrorToMessage = (code: string): string => {
  const lower = code.toLowerCase();
  if (lower.includes("user-not-found")) return "Email not registered.";
  if (lower.includes("wrong-password")) return "Incorrect password.";
  if (lower.includes("invalid-email")) return "Invalid email format.";
  if (lower.includes("too-many-requests")) return "Too many attempts. Try again later.";
  if (lower.includes("network")) return "Network error. Check your connection.";
  return "Something went wrong. Try again.";
};

const checkEmailExists = async (email: string) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const snap = await getDocs(q);
    return { exists: !snap.empty };
  } catch (err) {
    return { exists: false, error: err };
  }
};

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess, onSwitchToRegister }) => {
  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const resetErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();

    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Enter a valid email address.");
      return;
    }
    if (!password) {
      setPasswordError("Password is required.");
      return;
    }

    setLoading(true);
    const { exists } = await checkEmailExists(email);
    if (!exists) {
      setEmailError("Email not registered.");
      setLoading(false);
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      if (!user.emailVerified) {
        await signOut(auth);
        setFormError("Email not verified. Check your inbox.");
        setLoading(false);
        return;
      }
      localStorage.setItem("user_id", user.uid);
      onSuccess?.(user.uid);
    } catch (err: any) {
      const msg = mapErrorToMessage(err.code || err.message || "");
      if (msg.includes("password")) setPasswordError(msg);
      else setFormError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <FrostedCard>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 w-full">
          <h1 className="text-3xl font-semibold text-center text-white mb-6 tracking-wide">
            Welcome Back
          </h1>

          <input
            ref={emailRef}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full p-3 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white ${
              emailError ? "border-red-500" : ""
            }`}
          />
          {emailError && <p className="text-red-400 text-sm text-center">{emailError}</p>}

          <div className="relative">
            <input
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-3 pr-10 rounded-lg bg-black/40 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white ${
                passwordError ? "border-red-500" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          {passwordError && <p className="text-red-400 text-sm text-center">{passwordError}</p>}
          {formError && <p className="text-red-400 text-sm text-center">{formError}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-2 rounded-lg font-medium transition-all border ${
              loading
                ? "bg-white/10 text-gray-400 cursor-not-allowed"
                : "bg-white text-black hover:bg-transparent hover:text-white border-white"
            }`}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <p className="text-sm text-center text-gray-400 mt-4">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="underline text-white hover:text-gray-300"
            >
              Register
            </button>
          </p>
        </form>
      </FrostedCard>
    </div>
  );
};

export default LoginForm;
