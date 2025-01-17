import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authService from '../../services/auth';

const Header = () => {
  const history = useNavigate();
  const currentUser = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    history.push('/login');
  };

  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {currentUser ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;