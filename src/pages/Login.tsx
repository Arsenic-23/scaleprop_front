import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import { auth, db } from "../firebase.config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Eye, EyeOff } from "lucide-react";
import FrostedCard from "../components/FrostedCard";

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
      return "Email not registered. Please sign up first.";
    case "auth/wrong-password":
      return "Incorrect password. Try again.";
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

const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const snap = await getDocs(q);
    return !snap.empty;
  } catch {
    return false;
  }
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [forgotLoading, setForgotLoading] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const resetErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setFormError(null);
    setSuccessMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    resetErrors();

    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setEmailError("Email is required.");
      emailRef.current?.focus();
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setEmailError("Enter a valid email address.");
      emailRef.current?.focus();
      return;
    }
    if (!password) {
      setPasswordError("Password is required.");
      passwordRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      const exists = await checkEmailExists(trimmedEmail);
      if (!exists) {
        setEmailError("Email not registered. Please sign up first.");
        setLoading(false);
        return;
      }

      const cred = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      const user = cred.user;

      if (!user.emailVerified) {
        await signOut(auth);
        setFormError("Email not verified. Check your inbox for the verification link.");
        setLoading(false);
        return;
      }

      localStorage.setItem("user_id", user.uid);
      navigate("/landing");
    } catch (err: any) {
      const code = extractErrorCode(err);
      const msg = mapErrorToMessage(code);

      if (code === "auth/wrong-password" || /wrong-password|invalid-credential/.test(code)) {
        setPasswordError(msg);
        passwordRef.current?.focus();
      } else if (code === "auth/user-not-found" || /user-not-found/.test(code)) {
        setEmailError(msg);
        emailRef.current?.focus();
      } else {
        setFormError(msg);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    resetErrors();
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError("Please enter your email first.");
      emailRef.current?.focus();
      return;
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setEmailError("Enter a valid email address.");
      emailRef.current?.focus();
      return;
    }

    setForgotLoading(true);
    try {
      const exists = await checkEmailExists(trimmedEmail);
      if (!exists) {
        setEmailError("Email not registered. Please sign up first.");
        setForgotLoading(false);
        return;
      }

      await sendPasswordResetEmail(auth, trimmedEmail);
      setSuccessMessage("Password reset email sent. Check your inbox.");
    } catch (err: any) {
      const msg = mapErrorToMessage(extractErrorCode(err));
      setFormError(msg);
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050507] text-gray-200 px-4">
      <FrostedCard>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-3 w-full">
          <h1 className="text-2xl font-semibold text-center text-green-200 mb-4">
            ScaleFund — Login
          </h1>

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
              aria-label={showPassword ? "Hide password" : "Show password"}
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

          {successMessage && (
            <div className="text-green-400 text-sm text-center">{successMessage}</div>
          )}

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

          <button
            type="button"
            onClick={handleForgotPassword}
            disabled={forgotLoading}
            className="text-sm text-green-400 hover:text-green-300 text-center underline"
          >
            {forgotLoading ? "Sending reset link..." : "Forgot Password?"}
          </button>

          <div className="text-sm text-gray-400 text-center mt-3">
            Don’t have an account?{" "}
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="underline text-green-400 hover:text-green-300"
            >
              Register
            </button>
          </div>
        </form>
      </FrostedCard>
    </div>
  );
};

export default Login;
