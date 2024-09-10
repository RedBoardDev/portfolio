import React from 'react';
import styles from './Name.module.css';

const Name: React.FC = () => (
  <div className={styles.container}>
    <span className={styles.label}>Name:</span>
    <span className={styles.name}>Thomas OTT</span>
  </div>
);

export default Name;
