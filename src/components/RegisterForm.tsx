import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.config";
import { Eye, EyeOff } from "lucide-react";

interface RegisterFormProps {
  onSuccess?: (uid: string) => void;
  onSwitchToLogin?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({
  onSuccess,
  onSwitchToLogin,
}) => {
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

  const togglePasswordVisibility = () => setShowPassword((p) => !p);
  const toggleConfirmVisibility = () => setShowConfirm((p) => !p);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!firstName.trim() || !lastName.trim())
      return setError("Please enter your first and last name.");

    if (password.length < 8)
      return setError("Password must be at least 8 characters long.");

    if (password !== confirm)
      return setError("Passwords do not match.");

    setLoading(true);

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      await updateProfile(user, {
        displayName: `${firstName.trim()} ${lastName.trim()}`,
      });

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
      await signOut(auth);
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
          msg = "Network error. Please check your connection.";
          break;
        default:
          msg = err.message || "Unexpected error occurred.";
          break;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.04)]"
    >
      <h1 className="text-2xl font-semibold mb-6 text-center text-green-200">
        Register
      </h1>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <input
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="p-3 rounded bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500"
          required
        />
        <input
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="p-3 rounded bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500"
          required
        />
      </div>

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4 rounded bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500"
        required
      />

      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 pr-10 rounded bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500"
          required
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-3 top-3 text-gray-400 hover:text-green-300"
          aria-label="Toggle password visibility"
        >
          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type={showConfirm ? "text" : "password"}
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-3 pr-10 rounded bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500"
          required
        />
        <button
          type="button"
          onClick={toggleConfirmVisibility}
          className="absolute right-3 top-3 text-gray-400 hover:text-green-300"
          aria-label="Toggle confirm password visibility"
        >
          {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>

      {error && <div className="text-red-400 mb-4 text-sm text-center">{error}</div>}
      {info && <div className="text-green-400 mb-4 text-sm text-center">{info}</div>}

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

      <div className="flex justify-center mt-4 text-sm text-gray-400">
        <span>Already have an account?&nbsp;</span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="underline text-green-400 hover:text-green-300"
        >
          Log in
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
