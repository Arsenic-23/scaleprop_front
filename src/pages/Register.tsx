import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  sendEmailVerification,
  signOut,
  User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.config";

async function waitForAuthReady(timeout = 5000): Promise<User | null> {
  return new Promise((resolve) => {
    const t = setTimeout(() => resolve(auth.currentUser), timeout);
    const unsub = onAuthStateChanged(auth, (user) => {
      clearTimeout(t);
      unsub();
      resolve(user ?? auth.currentUser);
    });
  });
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (user && user.emailVerified) navigate("/LandingPage");
    });
    return () => unsub();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!firstName || !lastName) return setError("Enter first and last name.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });

      const settledUser = await waitForAuthReady();
      if (!settledUser) throw new Error("Auth state not ready after signup.");

      await setDoc(
        doc(db, "users", settledUser.uid),
        {
          firstName,
          lastName,
          email,
          createdAt: serverTimestamp(),
          uid: settledUser.uid,
          verified: false,
        },
        { merge: true }
      );

      await sendEmailVerification(settledUser);
      setInfo("Verification email sent. Please check your inbox and verify your email.");
      const checkVerified = setInterval(async () => {
        await settledUser.reload();
        if (settledUser.emailVerified) {
          clearInterval(checkVerified);
          await setDoc(doc(db, "users", settledUser.uid), { verified: true }, { merge: true });
          localStorage.setItem("user_id", settledUser.uid);
          navigate("/LandingPage");
        }
      }, 3000);
    } catch (err: any) {
      console.error("Registration error:", err);
      const msg =
        err?.code === "permission-denied"
          ? "Insufficient Firestore permissions. Check your Firestore rules."
          : err?.message || "Failed to create account.";
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
        <h1 className="text-2xl font-semibold mb-6">ScaleFund — Register</h1>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 rounded bg-[rgba(255,255,255,0.02)]"
            required
          />
          <input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 rounded bg-[rgba(255,255,255,0.02)]"
            required
          />
        </div>

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

        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-[rgba(255,255,255,0.02)]"
          required
        />

        {error && <div className="text-red-400 mb-4 whitespace-pre-wrap">{error}</div>}
        {info && <div className="text-green-400 mb-4">{info}</div>}

        <button type="submit" disabled={loading} className="w-full p-3 rounded-xl font-medium glass-cta mb-3">
          {loading ? "Creating account..." : "Create account"}
        </button>

        <div className="text-sm text-gray-400">
          Already have an account?{" "}
          <button type="button" onClick={() => navigate("/login")} className="underline">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
