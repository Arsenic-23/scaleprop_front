import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import FrostedCard from "../components/FrostedCard";

interface RegisterFormProps {
  onSuccess?: (uid: string) => void;
  onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess, onSwitchToLogin }) => {
  // form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  // ui state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // post-registration state
  const [stage, setStage] = useState<"form" | "verify">("form");
  const [resending, setResending] = useState(false);
  const [checking, setChecking] = useState(false);
  const [createdUid, setCreatedUid] = useState<string | null>(null);

  const navigate = useNavigate();

  // mapping firebase errors to user-friendly
  const firebaseErrorMessage = (code?: string, fallback?: string) => {
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Invalid email format.";
      case "auth/weak-password":
        return "Password is too weak.";
      case "auth/network-request-failed":
        return "Network error. Check your connection.";
      case "auth/user-not-found":
        return "Account not found. Please register.";
      case "auth/wrong-password":
        return "Incorrect password.";
      default:
        return fallback || "An unexpected error occurred.";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!firstName.trim() || !lastName.trim()) {
      setError("Please enter your first and last name.");
      return;
    }
    if (!email.trim()) {
      setError("Email is required.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // create user
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      const user = cred.user;

      // update profile displayName
      await updateProfile(user, { displayName: `${firstName.trim()} ${lastName.trim()}` });

      // save to firestore
      await setDoc(
        doc(db, "users", user.uid),
        {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          uid: user.uid,
          verified: false,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      // send verification mail
      await sendEmailVerification(user);
      setInfo("Verification email sent. Check your inbox (and spam).");

      // remember created uid (for optional logging or references)
      setCreatedUid(user.uid);

      // sign out user to prevent immediate access to protected routes
      await signOut(auth);

      // move UI to verification stage
      setStage("verify");

      if (onSuccess) onSuccess(user.uid);

      // NOTE: we intentionally keep password in state only temporarily so user can use
      // "Resend" and "I have verified — Sign me in" flows. If you prefer to force
      // manual login after verification, clear password here and remove resend logic.
    } catch (err: any) {
      setError(firebaseErrorMessage(err?.code, err?.message));
    } finally {
      setLoading(false);
    }
  };

  // Resend verification flow:
  // sign in with email+password (to obtain a User object), send verification, then sign out.
  const handleResendEmail = async () => {
    setError(null);
    setInfo(null);

    if (!email.trim() || !password) {
      setError("Email and password are required to resend verification.");
      return;
    }

    setResending(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user: User = cred.user;

      // immediate check: if already verified, inform and sign out
      await user.reload();
      if (user.emailVerified) {
        await signOut(auth);
        setInfo("Email already verified. You can sign in.");
        return;
      }

      await sendEmailVerification(user);
      setInfo("Verification email resent. Check your inbox (and spam).");
      await signOut(auth);
    } catch (err: any) {
      setError(firebaseErrorMessage(err?.code, err?.message));
      try { await signOut(auth); } catch {}
    } finally {
      setResending(false);
    }
  };

  // "I have verified — Sign me in" flow:
  // sign in, reload user, confirm emailVerified, update Firestore verified flag, navigate.
  const handleCheckVerifiedAndEnter = async () => {
    setError(null);
    setInfo(null);

    if (!email.trim() || !password) {
      setError("Email and password are required to sign in.");
      return;
    }

    setChecking(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user: User = cred.user;

      // force reload to get latest emailVerified status
      await user.reload();

      if (!user.emailVerified) {
        // not verified yet
        await signOut(auth);
        setError("Email not verified yet. Check your inbox or resend the verification email.");
        return;
      }

      // mark verified in Firestore (non-blocking)
      try {
        await setDoc(doc(db, "users", user.uid), { verified: true }, { merge: true });
      } catch {
        // ignore firestore failures here
      }

      // clear sensitive state
      setPassword("");
      setConfirm("");

      // navigate to home
      navigate("/home");
    } catch (err: any) {
      setError(firebaseErrorMessage(err?.code, err?.message));
      try { await signOut(auth); } catch {}
    } finally {
      setChecking(false);
    }
  };

  // UI: registration form
  if (stage === "form") {
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
              minLength={8}
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
              minLength={8}
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
            disabled={loading}
            className={`w-full p-3 rounded-xl font-medium transition-all ${
              loading
                ? "bg-[rgba(0,255,0,0.2)] text-gray-400 cursor-not-allowed"
                : "bg-[rgba(0,255,0,0.15)] hover:bg-[rgba(0,255,0,0.25)] text-green-200"
            }`}
          >
            {loading ? "Creating account..." : "Create account"}
          </button>

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
  }

  // UI: verification stage
  return (
    <FrostedCard>
      <div className="flex flex-col space-y-3">
        <h1 className="text-2xl font-semibold text-center text-green-200 mb-2">Verify your email</h1>

        <p className="text-sm text-gray-300 text-center">
          A verification email was sent to <span className="text-green-200">{email}</span>.
          You must verify your email before you can access the app.
        </p>

        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        {info && <div className="text-green-400 text-sm text-center">{info}</div>}

        <button
          type="button"
          onClick={handleResendEmail}
          disabled={resending}
          className={`w-full p-3 rounded-xl font-medium transition-all ${
            resending
              ? "bg-[rgba(0,255,0,0.2)] text-gray-400 cursor-not-allowed"
              : "bg-[rgba(0,255,0,0.1)] hover:bg-[rgba(0,255,0,0.2)] text-green-300"
          }`}
        >
          {resending ? "Resending..." : "Resend verification email"}
        </button>

        <button
          type="button"
          onClick={handleCheckVerifiedAndEnter}
          disabled={checking}
          className={`w-full p-3 rounded-xl font-medium transition-all ${
            checking
              ? "bg-[rgba(0,255,0,0.2)] text-gray-400 cursor-not-allowed"
              : "bg-[rgba(0,255,0,0.15)] hover:bg-[rgba(0,255,0,0.25)] text-green-200"
          }`}
        >
          {checking ? "Checking..." : "I have verified — Sign me in"}
        </button>

        <div className="text-sm text-gray-400 text-center mt-3">
          Or{" "}
          <button
            type="button"
            onClick={() => {
              if (onSwitchToLogin) onSwitchToLogin();
              else navigate("/login");
            }}
            className="underline text-green-400 hover:text-green-300"
          >
            go to login
          </button>
        </div>
      </div>
    </FrostedCard>
  );
};

export default RegisterForm;
