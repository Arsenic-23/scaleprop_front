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

const extractErrorCode = (err: any): string => {
  if (!err) return "unknown";
  if (typeof err === "string") return err.toLowerCase();
  if (typeof err.code === "string") return err.code;
  if (typeof err.status === "string") return err.status;
  if (typeof err.message === "string") return err.message;
  return "unknown";
};

const mapErrorToMessage = (code: string): string => {
  switch (code) {
    case "auth/user-not-found":
      return "Email not registered.";
    case "auth/wrong-password":
      return "Incorrect password.";
    case "auth/invalid-email":
      return "Invalid email format.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Try again later.";
    case "auth/network-request-failed":
      return "Network error. Check your connection.";
    default:
      return "Something went wrong. Try again.";
  }
};

const checkEmailExists = async (email: string): Promise<{ exists: boolean; error?: any }> => {
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

    const trimmedEmail = email.trim();
    if (!trimmedEmail) return setEmailError("Email is required.");
    if (!EMAIL_REGEX.test(trimmedEmail)) return setEmailError("Invalid email format.");
    if (!password) return setPasswordError("Password is required.");

    setLoading(true);
    const { exists, error: fsErr } = await checkEmailExists(trimmedEmail);
    if (fsErr) {
      setFormError("Error accessing user data.");
      setLoading(false);
      return;
    }
    if (!exists) {
      setEmailError("Email not registered.");
      setLoading(false);
      return;
    }

    try {
      const cred = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      const user = cred.user;

      if (!user.emailVerified) {
        await signOut(auth);
        setFormError("Please verify your email before logging in.");
        setLoading(false);
        return;
      }

      localStorage.setItem("user_id", user.uid);
      onSuccess?.(user.uid);
    } catch (authErr: any) {
      const code = extractErrorCode(authErr);
      const msg = mapErrorToMessage(code);
      if (code.includes("wrong-password")) setPasswordError(msg);
      else if (code.includes("user-not-found")) setEmailError(msg);
      else setFormError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FrostedCard className="w-full max-w-md mx-auto p-6 bg-[rgba(0,0,0,0.6)] backdrop-blur-lg border border-[rgba(255,255,255,0.1)] rounded-2xl shadow-lg">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <h1 className="text-2xl font-normal text-center text-white tracking-wide">
          Login
        </h1>

        <input
          ref={emailRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-3 rounded-md bg-[rgba(255,255,255,0.08)] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-400 ${
            emailError ? "border border-red-500" : "border border-transparent"
          }`}
        />
        {emailError && <div className="text-red-400 text-sm text-center">{emailError}</div>}

        <div className="relative">
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 pr-10 rounded-md bg-[rgba(255,255,255,0.08)] text-gray-100 placeholder-gray-400 focus:ring-2 focus:ring-green-400 ${
              passwordError ? "border border-red-500" : "border border-transparent"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-3 text-gray-400 hover:text-green-400"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {passwordError && <div className="text-red-400 text-sm text-center">{passwordError}</div>}

        {formError && <div className="text-red-400 text-sm text-center">{formError}</div>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-md text-white font-medium transition-all ${
            loading
              ? "bg-green-900 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700 active:bg-green-800"
          }`}
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <div className="text-sm text-gray-400 text-center mt-3">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-green-400 hover:text-green-300 underline"
          >
            Register
          </button>
        </div>
      </form>
    </FrostedCard>
  );
};

export default LoginForm;
