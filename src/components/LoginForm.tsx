import React, { useRef, useState, useEffect } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onSuccess?: (uid: string) => void;
  onSwitchToRegister?: () => void;
}

const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToRegister,
}) => {
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
      case "auth/user-not-found":
        return "No account found for this email. Register first.";
      case "auth/wrong-password":
        return "Incorrect password.";
      case "auth/invalid-email":
        return "Invalid email address format.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Try again later.";
      case "auth/network-request-failed":
        return "Network error. Check your internet connection.";
      case "auth/user-disabled":
        return "This account has been disabled.";
      case "auth/invalid-credential":
        return "Invalid email or password.";
      default:
        return "Login failed. Try again.";
    }
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
      const userCred = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCred.user;

      if (!user.emailVerified) {
        await signOut(auth);
        setFormError("Email not verified. Check your inbox.");
        return;
      }

      localStorage.setItem("user_id", user.uid);
      onSuccess?.(user.uid);
    } catch (err: any) {
      const code =
        err?.code && typeof err.code === "string"
          ? err.code
          : err?.message || "unknown";
      if (process.env.NODE_ENV === "development") console.warn("Firebase error:", err);

      const message = mapFirebaseError(code);
      if (
        code === "auth/wrong-password" ||
        code === "auth/invalid-credential"
      ) {
        setPasswordError(message);
        passwordRef.current?.focus();
      } else if (code === "auth/user-not-found") {
        setEmailError(message);
        emailRef.current?.focus();
      } else {
        setFormError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.05)]"
    >
      <h1 className="text-2xl font-semibold mb-6 text-center text-green-200">
        Login
      </h1>

      <input
        ref={emailRef}
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={`w-full p-3 mb-2 rounded-lg bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500 ${
          emailError ? "border border-red-500" : ""
        }`}
      />
      {emailError && (
        <div className="text-red-400 mb-2 text-sm text-center">{emailError}</div>
      )}

      <div className="relative mb-2">
        <input
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`w-full p-3 rounded-lg bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500 pr-10 ${
            passwordError ? "border border-red-500" : ""
          }`}
        />
        <button
          type="button"
          onClick={() => setShowPassword((p) => !p)}
          className="absolute right-3 top-3 text-gray-400 hover:text-green-300"
          aria-label="Toggle password visibility"
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {passwordError && (
        <div className="text-red-400 mb-2 text-sm text-center">
          {passwordError}
        </div>
      )}

      {formError && (
        <div className="text-red-400 mb-3 text-sm text-center">{formError}</div>
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

      <div className="flex justify-center mt-5 text-sm text-gray-400">
        <span>Don’t have an account?&nbsp;</span>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="underline text-green-400 hover:text-green-300"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
