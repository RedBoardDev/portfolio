import React, { useMemo } from 'react';
import { Tooltip } from 'antd';
import styles from './Competences.module.css';

const icons = import.meta.glob('/src/assets/icons/dev/*.svg', { eager: true });

const getFileName = (path: string) => {
  const parts = path.split('/');
  const fileName = parts[parts.length - 1];
  return fileName.replace('.svg', '');
};

const Competences: React.FC = () => {
  const iconPaths = useMemo(() => Object.values(icons).map((mod: any) => mod.default), []);

  return (
    <div className={styles.competencesBox}>
      <div className={styles.iconCarousel}>
        {iconPaths.map((icon, index) => {
          const fileName = getFileName(icon);
          return (
            <Tooltip key={icon} title={fileName} placement="left">
              <img
                src={icon}
                alt={`Icon ${index}`}
                className={styles.competenceIcon}
                loading="lazy"
              />
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default Competences;
