import React from 'react';
import Avatar from '@components/avatar/Avatar';
import StatOne from '@components/stats/StatOne';
import StatTwo from '@components/stats/StatTwo';
import StatThree from '@components/stats/StatThree';
import SocialNetworks from '@components/socialNetworks/SocialNetworks';
import Title from '@components/title/Title';
import Competences from '@components/competences/Competences';
import About from '@components/about/About';
import Projects from '@components/projects/Projects';
import Name from '@components/name/Name';
import Location from '@components/Location/Location';
import Introduction from '@components/introduction/Introduction';
import style from './Home.module.css';

const Home: React.FC = () => (
  <div className={style.parent}>
    <div className={style.statsGroup}>
      <div className={style.div1}>
        <StatOne />
      </div>
      <div className={style.div2}>
        <StatTwo />
      </div>
      <div className={style.div3}>
        <StatThree />
      </div>
    </div>
    <div className={style.div4}>
      <Title />
    </div>
    <div className={style.div5}>
      <Introduction />
    </div>
    <div className={style.div6}>
      <Avatar />
    </div>
    <div className={style.meGroup}>
      <div className={style.div7}>
        <Name />
      </div>
      <div className={style.div8}>
        <Location />
      </div>
      <div className={style.div9}>
        <SocialNetworks />
      </div>
    </div>
    <div className={style.div10}>
      <Projects />
    </div>
    <div className={style.div11}>
      <About />
    </div>
    <div className={style.div12}>
      <Competences />
    </div>
  </div>
);

export default Home;
