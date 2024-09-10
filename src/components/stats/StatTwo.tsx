import React from 'react';
import style from './Stats.module.css';

const StatTwo: React.FC = () => (
  <div className={style.wrapper}>
    <div className={`${style.statContainer} ${style.black}`}>
      <div className={style.title}>54+</div>
      <div className={style.description}>Handled Project</div>
    </div>
  </div>
);

export default StatTwo;
