import React from 'react';
import styles from './Header.module.css';
import { Navigation } from '../Navigation';

const Header = () => {
  return (
    <div className={styles.header}>
      <h1 className={styles.title}>Instant Messaging App</h1>
      <Navigation />
    </div>
  );
};

export default Header;
