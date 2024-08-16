// src/components/Common/NavBar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const NavBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white p-4 shadow-md flex flex-col sm:flex-row justify-between items-center">
      <div className="flex items-center mb-4 sm:mb-0">
        <Link to="/dashboard">
          <img src="/HORIZUltopiaLogo.png" alt="Ultopia AI Logo" className="h-8 sm:h-10" />
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link to="/profile" className="text-blue-500 font-bold">Profile</Link>
        <button
          onClick={handleLogout}
          className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
