import React from 'react';
import styles from './Skeleton.module.css';

export interface SkeletonProps {
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ count = 3 }) => {
  return (
    <div aria-busy="true" aria-label="Loading content">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={styles.item}>
          <div className={`${styles.skeleton} ${styles.lineTitle}`} />
          <div className={`${styles.skeleton} ${styles.lineText}`} />
          <div className={`${styles.skeleton} ${styles.lineMeta}`} />
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
