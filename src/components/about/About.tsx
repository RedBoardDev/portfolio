/* eslint-disable max-len */
import React from 'react';
import styles from './About.module.css';
import styleSubtitle from './Subtitle.module.css';

const About: React.FC = () => {
  const goTo = () => {
    console.log('soon');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>About</h1>
        <div
          tabIndex={0}
          className={styleSubtitle.subtitle}
          onClick={goTo}
          onKeyDown={(e) => {
            if (e.key === 'Enter') goTo();
          }}
          role="button"
        >
          Resume
        </div>
      </header>
      <div className={styles.content}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa.
        </p>
      </div>
    </div>
  );
};

export default About;
