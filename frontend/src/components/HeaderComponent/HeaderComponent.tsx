import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeaderComponent.module.css';


const HeaderComponent = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.navLink}>Home</Link>
      </nav>
    </header>
  );
};

export default HeaderComponent;