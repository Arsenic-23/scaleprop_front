import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
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
      const cred = await signInWithEmailAndPassword(auth, email, password);
      if (cred.user) {
        localStorage.setItem("user_id", cred.user.uid);
        navigate("/LandingPage");
      }
    } catch (err: any) {
      console.error("Login error:", err);
      const display = err?.code ? `${err.code}: ${err.message || ""}` : err?.message || String(err);
      setError(display);
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
        <h1 className="text-2xl font-semibold mb-6">ScaleFund — Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-[rgba(255,255,255,0.02)]"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-[rgba(255,255,255,0.02)]"
          required
        />

        {error && <div className="text-red-400 mb-4 whitespace-pre-wrap">{error}</div>}

        <button type="submit" disabled={loading} className="w-full p-3 rounded-xl font-medium glass-cta mb-3">
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <div className="flex justify-between text-sm text-gray-400">
          <button type="button" onClick={() => navigate("/register")} className="underline">
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
