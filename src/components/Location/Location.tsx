import React from 'react';
import MapsImage from '@images/maps.png';
import styles from './Location.module.css';

const Location: React.FC = () => (
  <div className={styles.container}>
    <header className={styles.header}>
      <span className={styles.label}>Based in:</span>
      <span className={styles.name}>Mulhouse, FR</span>
    </header>
    <div className={styles.content}>
      <img src={MapsImage} alt="Maps illustration" />
    </div>
  </div>
);

export default Location;
