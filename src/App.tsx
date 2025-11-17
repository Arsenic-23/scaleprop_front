import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import { useEffect } from "react";
import { useUser, UserProvider } from "./context/UserContext";
import { HashRouter as Router } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Plans from "./pages/Plans";
import Payment from "./pages/Payment";
import Account from "./pages/Account";
import Rules from "./pages/Rules";
import Passed from "./pages/Passed";
import Payout from "./pages/Payout";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import Announcements from "./pages/Announcements";
import Support from "./pages/Support";
import Notifications from "./pages/Notifications";
import LiveSupport from "./pages/LiveSupport";

import FAQs from "./pages/support/FAQs";
import KnowledgeBase from "./pages/support/KnowledgeBase";
import CommunityForum from "./pages/support/CommunityForum";
import ContactSupport from "./pages/support/ContactSupport";

import BottomNav from "./components/BottomNav";

function PrivateRoute({ children }: { children: JSX.Element }) {
  const userId = localStorage.getItem("user_id");
  return userId ? children : <Navigate to="/" replace />;
}

function AppWrapper() {
  const location = useLocation();
  const { user, setUser } = useUser();

  const showBottomNavRoutes = [
    "/home",
    "/account",
    "/profile",
    "/plans",
  ];

  const showBottomNav = showBottomNavRoutes.includes(location.pathname);

  useEffect(() => {
    const cachedUser = localStorage.getItem("tg_user");
    if (cachedUser && !user) {
      setUser(JSON.parse(cachedUser));
    }
  }, [user, setUser]);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Main App Pages */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/plans"
          element={
            <PrivateRoute>
              <Plans />
            </PrivateRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        />

        <Route
          path="/account"
          element={
            <PrivateRoute>
              <Account />
            </PrivateRoute>
          }
        />

        <Route
          path="/rules"
          element={
            <PrivateRoute>
              <Rules />
            </PrivateRoute>
          }
        />

        <Route
          path="/passed"
          element={
            <PrivateRoute>
              <Passed />
            </PrivateRoute>
          }
        />

        <Route
          path="/payout"
          element={
            <PrivateRoute>
              <Payout />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />

        <Route
          path="/announcements"
          element={
            <PrivateRoute>
              <Announcements />
            </PrivateRoute>
          }
        />

        {/* Support Home */}
        <Route
          path="/support"
          element={
            <PrivateRoute>
              <Support />
            </PrivateRoute>
          }
        />

        {/* NEW — Support Subpages */}
        <Route
          path="/support/faqs"
          element={
            <PrivateRoute>
              <FAQs />
            </PrivateRoute>
          }
        />
        <Route
          path="/support/knowledge"
          element={
            <PrivateRoute>
              <KnowledgeBase />
            </PrivateRoute>
          }
        />
        <Route
          path="/support/community"
          element={
            <PrivateRoute>
              <CommunityForum />
            </PrivateRoute>
          }
        />
        <Route
          path="/support/contact"
          element={
            <PrivateRoute>
              <ContactSupport />
            </PrivateRoute>
          }
        />

        {/* Live Chat */}
        <Route
          path="/live-support"
          element={
            <PrivateRoute>
              <LiveSupport />
            </PrivateRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />
      </Routes>

      {showBottomNav && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <UserProvider>
      <Router>
        <AppWrapper />
      </Router>
    </UserProvider>
  );
}
