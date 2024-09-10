import React from 'react';
import avatarImg from '@images/profil_on.png';
// faire que la lumière s'allume ou s'éteigne selon s'il fait jour ou nuit à Mulhouse. Voir https://www.cassie.codes pour l'effet

// import avatarImg from '@images/profil.png';
// import avatarImg from '@images/avatar.png';
import style from './Avatar.module.css';

const Avatar: React.FC = () => (
  <div className={style.wrapper}>
    <img src={avatarImg} alt="Avatar" className={style.avatar} />
  </div>
);

export default Avatar;
