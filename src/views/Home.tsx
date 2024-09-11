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

const VIEW_PC = [
  { key: 'stat-one', className: style.div1, component: <StatOne /> },
  { key: 'stat-two', className: style.div2, component: <StatTwo /> },
  { key: 'stat-three', className: style.div3, component: <StatThree /> },
  { key: 'title', className: style.div4, component: <Title /> },
  { key: 'introduction', className: style.div5, component: <Introduction /> },
  { key: 'avatar', className: style.div6, component: <Avatar /> },
  { key: 'name', className: style.div7, component: <Name /> },
  { key: 'location', className: style.div8, component: <Location /> },
  { key: 'social-networks', className: style.div9, component: <SocialNetworks /> },
  { key: 'projects', className: style.div10, component: <Projects /> },
  { key: 'about', className: style.div11, component: <About /> },
  { key: 'competences', className: style.div12, component: <Competences /> },
];

const Home: React.FC = () => (
  <div className={style.parent}>
    {VIEW_PC.map((item) => (
      <div key={item.key} className={item.className}>
        {item.component}
      </div>
    ))}
  </div>
);

export default Home;
