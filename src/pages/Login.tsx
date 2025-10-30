import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { Eye, EyeOff } from "lucide-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      if (!user.emailVerified) {
        await signOut(auth);
        setError("Email not verified. Please verify your account.");
        return;
      }

      localStorage.setItem("user_id", user.uid);
      navigate("/landing");
    } catch (err: any) {
      console.error("Login error:", err);
      let msg = "Login failed. Please try again.";

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
          msg = "Too many attempts. Try again later.";
          break;
        case "auth/network-request-failed":
          msg = "Network error. Check your connection.";
          break;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] text-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.05)] shadow-[0_0_25px_rgba(0,255,0,0.05)]"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-green-200">
          ScaleFund — Login
        </h1>

        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 placeholder-gray-500 pr-10"
            required
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-3 text-gray-400 hover:text-green-300 transition"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-xl font-medium transition-all ${
            loading
              ? "bg-[rgba(0,255,0,0.15)] text-gray-400 cursor-not-allowed"
              : "bg-[rgba(0,255,0,0.25)] hover:bg-[rgba(0,255,0,0.35)] text-green-200"
          }`}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="mt-5 text-sm text-center text-gray-400">
          Don’t have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="underline text-green-400 hover:text-green-300"
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;