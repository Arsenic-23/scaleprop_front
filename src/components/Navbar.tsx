import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path ? 'text-blue-600 font-bold' : 'text-gray-600';

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t shadow-md flex justify-around py-2 z-50">
      <Link to="/home" className={isActive('/home')}>Home</Link>
      <Link to="/plans" className={isActive('/plans')}>Plans</Link>
      <Link to="/account" className={isActive('/account')}>Account</Link>
      <Link to="/announcements" className={isActive('/announcements')}>News</Link>
      <Link to="/profile" className={isActive('/profile')}>Profile</Link>
    </nav>
  );
};

export default Navbar;