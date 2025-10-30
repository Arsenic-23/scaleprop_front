import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  User,
} from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../firebase.config";

async function waitForAuthReady(timeout = 4000): Promise<User | null> {
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
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) navigate("/landing");
    });
    return () => unsub();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!firstName || !lastName)
      return setError("Enter both first and last names.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== confirm)
      return setError("Passwords do not match.");

    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const user = cred.user;
      await updateProfile(user, { displayName: `${firstName} ${lastName}` });

      const readyUser = await waitForAuthReady();
      if (!readyUser) throw new Error("Authentication not ready.");

      await setDoc(doc(db, "users", readyUser.uid), {
        firstName,
        lastName,
        email,
        uid: readyUser.uid,
        verified: false,
        createdAt: serverTimestamp(),
      });

      await sendEmailVerification(readyUser);
      setInfo("Verification email sent. Please check your inbox.");

      const verifyInterval = setInterval(async () => {
        await readyUser.reload();
        if (readyUser.emailVerified) {
          clearInterval(verifyInterval);
          await setDoc(
            doc(db, "users", readyUser.uid),
            { verified: true },
            { merge: true }
          );
          localStorage.setItem("user_id", readyUser.uid);
          navigate("/landing");
        }
      }, 4000);
    } catch (err: any) {
      console.error("Register error:", err);
      let msg = "Registration failed.";
      if (err.code === "auth/email-already-in-use")
        msg = "Email already registered.";
      else if (err.code === "auth/invalid-email")
        msg = "Invalid email address.";
      else if (err.code === "auth/weak-password")
        msg = "Password too weak.";
      setError(msg);
      await signOut(auth);
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
          ScaleFund — Register
        </h1>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <input
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="p-3 rounded bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400"
            required
          />
          <input
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="p-3 rounded bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

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

        <input
          type="password"
          placeholder="Confirm password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="w-full p-3 mb-4 rounded bg-[rgba(255,255,255,0.05)] outline-none focus:ring-2 focus:ring-green-400"
          required
        />

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}
        {info && <p className="text-green-400 text-sm mb-4 text-center">{info}</p>}

        <button
          type="submit"
          disabled={loading}
          className={`w-full p-3 rounded-xl font-medium transition-all ${
            loading
              ? "bg-[rgba(0,255,0,0.15)] text-gray-400 cursor-not-allowed"
              : "bg-[rgba(0,255,0,0.25)] hover:bg-[rgba(0,255,0,0.35)] text-green-200"
          }`}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="mt-5 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="underline text-green-400 hover:text-green-300"
          >
            Log in
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;