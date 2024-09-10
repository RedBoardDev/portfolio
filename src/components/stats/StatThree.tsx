import React from 'react';
import style from './Stats.module.css';

const StatThree: React.FC = () => (
  <div className={style.wrapper}>
    <div className={style.statContainer}>
      <div className={style.title}>40+</div>
      <div className={style.description}>Clients</div>
    </div>
  </div>
);

export default StatThree;
