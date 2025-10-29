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
      // Attempt login
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Email verification check
      if (!user.emailVerified) {
        await signOut(auth);
        setError(
          "Email not verified. Please check your inbox to verify your account."
        );
        return;
      }

      // Save UID & navigate
      localStorage.setItem("user_id", user.uid);
      navigate("/landing");
    } catch (err: any) {
      console.error("Login error:", err);
      let msg = "Login failed. Please try again.";

      switch (err.code) {
        case "auth/user-not-found":
          msg = "Email not registered. Please register to continue.";
          break;
        case "auth/wrong-password":
          msg = "Incorrect password. Please try again.";
          break;
        case "auth/invalid-email":
          msg = "Invalid email address format.";
          break;
        case "auth/too-many-requests":
          msg = "Too many failed attempts. Try again later.";
          break;
        case "auth/network-request-failed":
          msg = "Network error. Please check your connection.";
          break;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050507] text-gray-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.05)] shadow-[0_0_20px_rgba(0,255,0,0.05)]"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center text-green-200">
          ScaleFund — Login
        </h1>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded-lg bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400 text-gray-100 placeholder-gray-500"
          required
        />

        {/* Password Input with Eye Icon */}
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
            className="absolute right-3 top-3 text-gray-400 hover:text-green-300 transition"
            aria-label="Toggle password visibility"
          >
            {showPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-400 mb-4 text-sm text-center font-medium">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-xl font-medium transition-all duration-300 ${
            loading
              ? "bg-[rgba(0,255,0,0.2)] text-gray-400 cursor-not-allowed"
              : "bg-[rgba(0,255,0,0.15)] hover:bg-[rgba(0,255,0,0.25)] text-green-200"
          }`}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        {/* Register Link */}
        <div className="flex justify-center mt-5 text-sm text-gray-400">
          <span>Don’t have an account?&nbsp;</span>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="underline text-green-400 hover:text-green-300 transition"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
