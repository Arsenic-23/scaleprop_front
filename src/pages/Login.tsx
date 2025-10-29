import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase.config";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const user = userCred.user;

      // Email verification check
      if (!user.emailVerified) {
        await signOut(auth);
        setError("Email not verified. Please check your inbox and verify your account.");
        return;
      }

      // Save user session
      localStorage.setItem("user_id", user.uid);
      navigate("/landing");
    } catch (err: any) {
      console.error("Login error:", err);
      let msg = "Login failed. Please try again.";

      switch (err.code) {
        case "auth/user-not-found":
          msg = "No account found with that email.";
          break;
        case "auth/wrong-password":
          msg = "Incorrect password.";
          break;
        case "auth/invalid-email":
          msg = "Invalid email address.";
          break;
        case "auth/too-many-requests":
          msg = "Too many failed attempts. Please try again later.";
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
    <div className="min-h-screen flex items-center justify-center bg-[#050507] text-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.04)]"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">ScaleFund — Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        {error && (
          <div className="text-red-400 mb-4 text-sm text-center whitespace-pre-wrap">{error}</div>
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

        <div className="flex justify-center mt-4 text-sm text-gray-400">
          <span>Don't have an account?&nbsp;</span>
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="underline text-green-400 hover:text-green-300"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
