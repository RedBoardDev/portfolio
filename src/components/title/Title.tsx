import React from 'react';
import WavingHand from '@icons/waving-hand.png';
import style from './Title.module.css';
import styleButton from './Button.module.scss';

const Title: React.FC = () => (
  <div className={style.wrapper}>
    <div className={style.textContainer}>
      <p>Bringing your ideas to life through UI Design</p>
    </div>
    <div className={styleButton.buttonEffect}>
      <span className={styleButton.mas}>
        Hire Me
        <img src={WavingHand} alt="Waving hand icon" className={styleButton.icon} />
      </span>
      <button id="work" type="button" name="Hover">
        Hire Me
        <img src={WavingHand} alt="Waving hand icon" className={styleButton.icon} />
      </button>
    </div>

  </div>
);

export default Title;
