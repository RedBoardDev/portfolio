import React from 'react';
import style from './Stats.module.css';

const StatOne: React.FC = () => (
  <div className={style.wrapper}>
    <div className={style.statContainer}>
      <div className={style.title}>2+</div>
      <div className={style.description}>Years Experience</div>
    </div>
  </div>
);

export default StatOne;
