import React from 'react';
import { Link } from 'react-router-dom';

const HeaderComponent = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
};

export default HeaderComponent;