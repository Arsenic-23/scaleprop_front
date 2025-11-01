import React, { useState } from "react";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { Eye, EyeOff } from "lucide-react";

interface LoginFormProps {
  onSuccess?: (uid: string) => void;
  onSwitchToRegister?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onSuccess,
  onSwitchToRegister,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((p) => !p);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      if (!user.emailVerified) {
        await signOut(auth);
        setError("Email not verified. Check your inbox.");
        return;
      }

      localStorage.setItem("user_id", user.uid);
      onSuccess?.(user.uid);
    } catch (err: any) {
      let msg = "Login failed.";
      switch (err.code) {
        case "auth/user-not-found":
          msg = "Email not registered.";
          break;
        case "auth/wrong-password":
          msg = "Incorrect password.";
          break;
        case "auth/invalid-email":
          msg = "Invalid email format.";
          break;
        case "auth/too-many-requests":
          msg = "Too many attempts. Try later.";
          break;
        case "auth/network-request-failed":
          msg = "Network error.";
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
      className="w-full max-w-md p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.05)]"
    >
      <h1 className="text-2xl font-semibold mb-6 text-center text-green-200">
        Login
      </h1>

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-3 mb-4 rounded-lg bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500"
        required
      />

      <div className="relative mb-4">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500 pr-10"
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

      {error && <div className="text-red-400 mb-4 text-sm text-center">{error}</div>}

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
