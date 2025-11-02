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

  useEffect(() => {
    setFormError(null);
  }, [email, password]);

  const resetErrors = () => {
    setEmailError(null);
    setPasswordError(null);
    setFormError(null);
  };

  const validateInputs = (): boolean => {
    resetErrors();
    let ok = true;

    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setEmailError("Email is required.");
      emailRef.current?.focus();
      ok = false;
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      setEmailError("Enter a valid email address.");
      emailRef.current?.focus();
      ok = false;
    }

    if (!password) {
      if (ok) passwordRef.current?.focus();
      setPasswordError("Password is required.");
      ok = false;
    } else if (password.length < 6) {
      if (ok) passwordRef.current?.focus();
      setPasswordError("Password must be at least 6 characters.");
      ok = false;
    }

    return ok;
  };

  const mapFirebaseError = (code: string | undefined) => {
    switch (code) {
      case "auth/user-not-found":
        return "No account found for this email. Register first.";
      case "auth/wrong-password":
        return "Email or password is incorrect.";
      case "auth/invalid-email":
        return "Invalid email address format.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Try again later.";
      case "auth/network-request-failed":
        return "Network error. Check your connection.";
      case "auth/user-disabled":
        return "This account has been disabled. Contact support.";
      case "auth/operation-not-allowed":
        return "Email/password sign-in is not enabled in Firebase.";
      default:
        return "Sign in failed. Try again.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!validateInputs()) return;

    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password
      );
      const user = userCred.user;

      if (!user) {
        setFormError("Authentication failed. No user returned.");
        return;
      }

      if (!user.emailVerified) {
        await signOut(auth);
        setFormError(
          "Email not verified. Open the verification link sent to your inbox. Resend from registration if needed."
        );
        return;
      }

      localStorage.setItem("user_id", user.uid);
      onSuccess?.(user.uid);
    } catch (err: any) {
      console.error("Login error:", err);
      const code = err?.code ?? err?.message;
      const friendly = mapFirebaseError(code);
      if (code === "auth/wrong-password") {
        setPasswordError(friendly);
        passwordRef.current?.focus();
      } else if (code === "auth/user-not-found") {
        setEmailError(friendly);
        emailRef.current?.focus();
      } else {
        setFormError(friendly);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-describedby={formError ? "login-form-error" : undefined}
      className="w-full max-w-md p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.05)]"
    >
      <h1 className="text-2xl font-semibold mb-6 text-center text-green-200">
        Login
      </h1>

      <label className="block mb-2 text-sm text-gray-300">Email</label>
      <input
        ref={emailRef}
        type="email"
        inputMode="email"
        placeholder="you@domain.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setEmailError(null);
        }}
        aria-invalid={!!emailError}
        aria-describedby={emailError ? "email-error" : undefined}
        className={`w-full p-3 mb-2 rounded-lg bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500 ${
          emailError ? "border border-red-500" : ""
        }`}
        required
      />
      {emailError && (
        <div id="email-error" className="text-red-400 mb-2 text-sm">
          {emailError}
        </div>
      )}

      <label className="block mb-2 text-sm text-gray-300">Password</label>
      <div className="relative mb-2">
        <input
          ref={passwordRef}
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setPasswordError(null);
          }}
          aria-invalid={!!passwordError}
          aria-describedby={passwordError ? "password-error" : undefined}
          className={`w-full p-3 rounded-lg bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500 pr-10 ${
            passwordError ? "border border-red-500" : ""
          }`}
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((s) => !s)}
          className="absolute right-3 top-3 text-gray-400 hover:text-green-300"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="w-5 h-5" />
          ) : (
            <Eye className="w-5 h-5" />
          )}
        </button>
      </div>
      {passwordError && (
        <div id="password-error" className="text-red-400 mb-2 text-sm">
          {passwordError}
        </div>
      )}

      {formError && (
        <div
          id="login-form-error"
          role="alert"
          className="text-red-400 mb-4 text-sm text-center font-medium"
        >
          {formError}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full p-3 rounded-xl font-medium transition-all duration-200 ${
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
