import React from 'react';
import emailIcon from '@icons/socialNetworks/email.png';
import linkedinIcon from '@icons/socialNetworks/linkedin.png';
import discordIcon from '@icons/socialNetworks/discord.png';
import githubIcon from '@icons/socialNetworks/github.png';
import { Tooltip } from 'antd';
import style from './SocialNetworks.module.css';

const SocialNetworks: React.FC = () => (
  <div className={style.wrapper}>
    <Tooltip title="LinkedIn">
      <a href="https://www.linkedin.com/in/thomas--ott/" target="_blank" rel="noreferrer">
        <img src={linkedinIcon} alt="LinkedIn" className={style.icon} />
      </a>
    </Tooltip>
    <Tooltip title="Email">
      <a href="mailto:thomas.ott@epitech.eu" target="_blank" rel="noreferrer">
        <img src={emailIcon} alt="Email" className={style.icon} />
      </a>
    </Tooltip>
    <Tooltip title="GitHub">
      <a href="https://github.com/RedBoardDev/" target="_blank" rel="noreferrer">
        <img src={githubIcon} alt="GitHub" className={style.icon} />
      </a>
    </Tooltip>
    <Tooltip title="Discord">
      <a href="https://discord.com/invite/m2TJx9gV" target="_blank" rel="noreferrer">
        <img src={discordIcon} alt="Discord" className={`${style.icon} ${style.discordIcon}`} />
      </a>
    </Tooltip>
  </div>
);

export default SocialNetworks;
