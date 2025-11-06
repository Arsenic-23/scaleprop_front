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

  // form
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [confirm, setConfirm]     = useState("");

  // ui state
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [info, setInfo]         = useState<string | null>(null);
  const [verified, setVerified] = useState(false);
  const [checking, setChecking] = useState(false);
  const [verificationSent, setVerificationSent] = useState(false);

  // poll control
  const pollRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const destroyed = useRef(false);

  // util: clear active poll
  const stopPoll = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  // util: check and sync verified state safely
  const checkVerification = async () => {
    const u = auth.currentUser;
    if (!u) return false;
    try {
      await u.reload(); // refresh from server
      const fresh = auth.currentUser; // may differ after reload
      const isVerified = !!fresh?.emailVerified;
      setVerified(isVerified);
      if (isVerified) {
        stopPoll();
        setChecking(false);
        setInfo(null);
        // mark Firestore
        await setDoc(
          doc(db, "users", fresh!.uid),
          { verified: true },
          { merge: true }
        );
        localStorage.setItem("user_id", fresh!.uid);
      }
      return isVerified;
    } catch {
      return false;
    }
  };

  // start polling every 4s (idempotent)
  const startPoll = () => {
    if (pollRef.current) return;
    setChecking(true);
    pollRef.current = setInterval(checkVerification, 4000);
  };

  // mount: watch auth + initial check
  useEffect(() => {
    destroyed.current = false;
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) {
        setVerified(false);
        stopPoll();
        return;
      }
      await checkVerification();
      if (!u.emailVerified) startPoll();
    });

    // also re-check on tab focus or when user returns
    const onFocus = () => checkVerification();
    const onVisible = () => {
      if (document.visibilityState === "visible") checkVerification();
    };
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      destroyed.current = true;
      unsub();
      stopPoll();
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  // submit: create account, send email, begin polling
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);

    if (!firstName || !lastName)  return setError("Enter first and last name.");
    if (password.length < 8)      return setError("Password must be at least 8 characters.");
    if (password !== confirm)     return setError("Passwords do not match.");

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

      await sendEmailVerification(readyUser);
      setVerificationSent(true);
      setInfo("Verification email sent. Check your inbox.");
      startPoll();
    } catch (err: any) {
      console.error("Register error:", err);
      let msg = "Registration failed.";
      if (err?.code === "auth/email-already-in-use") msg = "Email already registered.";
      else if (err?.code === "auth/invalid-email")   msg = "Invalid email address.";
      else if (err?.code === "auth/weak-password")   msg = "Password too weak.";
      else if (err?.code === "permission-denied")    msg = "Insufficient Firestore permissions.";
      setError(msg);
      await signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  const handleManualCheck = async () => {
    setChecking(true);
    const ok = await checkVerification();
    if (!ok) setChecking(false);
  };

  const handleProceed = () => {
    navigate("/home"); // change to "/landing" if that is your target
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050507] text-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-2xl bg-[rgba(255,255,255,0.03)] backdrop-blur-md border border-[rgba(255,255,255,0.04)]"
      >
        <h1 className="text-2xl font-semibold mb-6 text-center">ScaleFund — Register</h1>

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

            {verificationSent && (
              <button
                type="button"
                onClick={handleManualCheck}
                className="w-full mt-3 p-3 rounded-xl font-medium bg-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.1)] text-gray-200"
              >
                I’ve verified. Check again
              </button>
            )}

            {checking && (
              <div className="text-gray-400 mt-2 text-sm text-center animate-pulse">
                Checking verification…
              </div>
            )}

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
            <h2 className="text-lg text-green-400 mb-3">Email verified</h2>
            <button
              onClick={handleProceed}
              type="button"
              className="w-full p-3 rounded-xl bg-[rgba(0,255,0,0.15)] hover:bg-[rgba(0,255,0,0.25)] text-green-200 font-medium transition-all"
            >
              Register
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Register;
