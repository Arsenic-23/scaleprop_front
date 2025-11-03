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

  const mapFirebaseError = (code: string): string => {
    switch (code) {
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/invalid-email":
        return "Invalid email address format.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Try again later.";
      case "auth/network-request-failed":
        return "Network error. Check your connection.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      case "auth/invalid-credential":
        return "Invalid email or password.";
      default:
        return "Login failed. Try again.";
    }
  };

  const checkEmailExists = async (email: string): Promise<boolean> => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();

    if (!EMAIL_REGEX.test(email.trim())) {
      setEmailError("Enter a valid email.");
      return;
    }
    if (!password.trim()) {
      setPasswordError("Password is required.");
      return;
    }

    setLoading(true);
    try {
    
      const emailExists = await checkEmailExists(email.trim());
      if (!emailExists) {
        setEmailError("Email not registered.");
        return;
      }

      const userCred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCred.user;

      if (!user.emailVerified) {
        await signOut(auth);
        setFormError("Email not verified. Check your inbox.");
        return;
      }

      localStorage.setItem("user_id", user.uid);
      onSuccess?.(user.uid);
    } catch (err: any) {
      const code = err?.code || "unknown";
      const message = mapFirebaseError(code);

      if (["auth/wrong-password", "auth/invalid-credential"].includes(code)) {
        setPasswordError(message);
        passwordRef.current?.focus();
      } else {
        setFormError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <FrostedCard>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-3 w-full">
        <h1 className="text-2xl font-semibold text-center text-green-200 mb-4">
          Login
        </h1>

        {/* Email Field */}
        <input
          ref={emailRef}
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`w-full p-3 rounded-lg bg-[rgba(255,255,255,0.05)] focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500 ${
            emailError ? "border border-red-500" : ""
          }`}
        />
        {emailError && (
          <div className="text-red-400 text-sm text-center">{emailError}</div>
        )}

        {/* Password Field */}
        <div className="relative">
          <input
            ref={passwordRef}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full p-3 rounded-lg bg-[rgba(255,255,255,0.05)] pr-10 focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500 ${
              passwordError ? "border border-red-500" : ""
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-3 top-3 text-gray-400 hover:text-green-300"
            aria-label="Toggle password visibility"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>
        {passwordError && (
          <div className="text-red-400 text-sm text-center">{passwordError}</div>
        )}

        {formError && (
          <div className="text-red-400 text-sm text-center">{formError}</div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-xl font-medium transition-all ${
            loading
              ? "bg-[rgba(0,255,0,0.2)] text-gray-400 cursor-not-allowed"
              : "bg-[rgba(0,255,0,0.15)] hover:bg-[rgba(0,255,0,0.25)] text-green-200"
          }`}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="text-sm text-gray-400 text-center mt-3">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="underline text-green-400 hover:text-green-300"
          >
            Register
          </button>
        </div>
      </form>
    </FrostedCard>
  );
};

export default LoginForm;
