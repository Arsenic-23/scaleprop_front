import React, { useEffect, useRef, useState } from "react";
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
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopPoll = () => {
    if (pollRef.current) clearInterval(pollRef.current);
    pollRef.current = null;
  };

  const checkVerification = async () => {
    const u = auth.currentUser;
    if (!u) return;
    try {
      await u.reload();
      const refreshed = auth.currentUser;
      if (refreshed?.emailVerified) {
        stopPoll();
        setVerified(true);
        setInfo(null);
        setChecking(false);
        await setDoc(doc(db, "users", refreshed.uid), { verified: true }, { merge: true });
        localStorage.setItem("user_id", refreshed.uid);
        navigate("/home");
      }
    } catch {}
  };

  const startPoll = () => {
    if (pollRef.current) return;
    setChecking(true);
    pollRef.current = setInterval(checkVerification, 4000);
  };

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setVerified(false);
        stopPoll();
        return;
      }
      await checkVerification();
      if (!u.emailVerified) startPoll();
    });

    const handleFocus = () => checkVerification();
    window.addEventListener("focus", handleFocus);
    return () => {
      unsub();
      stopPoll();
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  // resend cooldown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [resendTimer]);

  const sendVerificationEmail = async (user: User) => {
    await sendEmailVerification(user);
    setInfo("Verification email sent. Check your inbox.");
    setResendTimer(60); // start 60s cooldown
    startPoll();
  };

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

      const readyUser = await waitForAuthReady();
      if (!readyUser) throw new Error("Authentication not ready.");

      await setDoc(
        doc(db, "users", readyUser.uid),
        {
          firstName,
          lastName,
          email,
          uid: readyUser.uid,
          verified: false,
          createdAt: serverTimestamp(),
        },
        { merge: true }
      );

      await sendVerificationEmail(readyUser);
    } catch (err: any) {
      console.error("Register error:", err);
      let msg = "Registration failed.";
      if (err?.code === "auth/email-already-in-use") msg = "Email already registered.";
      else if (err?.code === "auth/invalid-email") msg = "Invalid email address.";
      else if (err?.code === "auth/weak-password") msg = "Password too weak.";
      else if (err?.code === "permission-denied") msg = "Insufficient Firestore permissions.";
      setError(msg);
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await sendVerificationEmail(user);
    } catch {
      setError("Failed to resend verification. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050507] text-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.04)]"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">
          ScaleFund — Register
        </h1>

        {!verified ? (
          <>
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

            {error && (
              <div className="text-red-400 mb-4 text-sm text-center">{error}</div>
            )}
            {info && (
              <div className="text-green-400 mb-4 text-sm text-center">{info}</div>
            )}
            {checking && (
              <div className="text-gray-400 mb-3 text-sm text-center animate-pulse">
                Waiting for verification...
              </div>
            )}

            <button
              type={resendTimer > 0 ? "button" : "submit"}
              disabled={loading}
              onClick={resendTimer > 0 ? undefined : handleResend}
              className={`w-full p-3 rounded-xl font-medium transition-all ${
                loading || resendTimer > 0
                  ? "bg-[rgba(255,255,255,0.05)] text-gray-500 cursor-not-allowed"
                  : "bg-[rgba(0,255,0,0.15)] hover:bg-[rgba(0,255,0,0.25)] text-green-200"
              }`}
            >
              {loading
                ? "Processing..."
                : resendTimer > 0
                ? `Resend available in ${resendTimer}s`
                : "Register / Resend Verification"}
            </button>

            <div className="flex justify-center mt-4 text-sm text-gray-400">
              <span>Already have an account?&nbsp;</span>
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="underline text-green-400 hover:text-green-300"
              >
                Log in
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center text-center">
            <h2 className="text-lg text-green-400 mb-3">
              Email verified successfully!
            </h2>
            <button
              onClick={() => navigate("/home")}
              type="button"
              className="w-full p-3 rounded-xl bg-[rgba(0,255,0,0.15)] hover:bg-[rgba(0,255,0,0.25)] text-green-200 font-medium transition-all"
            >
              Continue
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
