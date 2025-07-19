// src/App.tsx
import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { viewport, init, isTMA } from '@telegram-apps/sdk';

import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import Plans from './pages/Plans';
import Payment from './pages/Payment';
import Account from './pages/Account';
import Rules from './pages/Rules';
import Passed from './pages/Passed';
import Payout from './pages/Payout';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Announcements from './pages/Announcements';
import Support from './pages/Support';

import BottomNav from './components/BottomNav'; // ✅ Make sure you’ve created this

function AppWrapper() {
  const location = useLocation();

  // ✅ Define routes where nav bar should appear
  const showBottomNavRoutes = [
    '/home',
    '/account',
    '/profile',
    '/plans',
    '/support',
  ];

  const showBottomNav = showBottomNavRoutes.includes(location.pathname);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/account" element={<Account />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/passed" element={<Passed />} />
        <Route path="/payout" element={<Payout />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/announcements" element={<Announcements />} />
        <Route path="/support" element={<Support />} />
      </Routes>

      {showBottomNav && <BottomNav />} {/* ✅ Conditionally show */}
    </>
  );
}

function App() {
  useEffect(() => {
    const initTelegram = async () => {
      if (await isTMA()) {
        init();

        if (viewport.mount.isAvailable()) {
          await viewport.mount();
          viewport.expand();
        }

        if (viewport.requestFullscreen.isAvailable()) {
          await viewport.requestFullscreen();
        }
      }
    };

    initTelegram();
  }, []);

  return (
    <Router>
      <AppWrapper /> {/* Wrap routes and navigation */}
    </Router>
  );
}

export default App;