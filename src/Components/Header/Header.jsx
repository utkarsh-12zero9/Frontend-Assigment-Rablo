import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="header-title">Employee Management Dashboard</h1>
        <p className="header-description">
          Browse, search, and manage employee records efficiently
        </p>
      </div>
    </header>
  );
};

export default Header;