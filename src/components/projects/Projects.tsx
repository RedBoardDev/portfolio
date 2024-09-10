import React from 'react';
import styleSubtitle from '@components/about/Subtitle.module.css';
import Picture1 from '@images/projects/1.png';
import Picture2 from '@images/projects/2.png';
import Picture3 from '@images/projects/3.jpg';
import Picture4 from '@images/projects/4.png';

import styles from './Projects.module.css';

const Projects: React.FC = () => {
  const goTo = () => {
    window.open('https://github.com/redBoardDev', '_blank');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>My portfolio</h1>
        <div
          tabIndex={0}
          className={styleSubtitle.subtitle}
          onClick={goTo}
          onKeyDown={(e) => {
            if (e.key === 'Enter') goTo();
          }}
          role="button"
        >
          See all
        </div>
      </header>
      <div className={styles.content}>
        <div className={styles.square}>
          <img src={Picture1} alt="Project preview" className={styles.image} />
          <div className={styles.overlay}>
            <p className={styles.text}>Project</p>
          </div>
        </div>

        <div className={styles.square}>
          <img src={Picture2} alt="Project preview" className={styles.image} />
          <div className={styles.overlay}>
            <p className={styles.text}>Project</p>
          </div>
        </div>

        <div className={styles.square}>
          <img src={Picture3} alt="Project preview" className={styles.image} />
          <div className={styles.overlay}>
            <p className={styles.text}>Project</p>
          </div>
        </div>

        <div className={styles.square}>
          <img src={Picture4} alt="Project preview" className={styles.image} />
          <div className={styles.overlay}>
            <p className={styles.text}>Project</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
