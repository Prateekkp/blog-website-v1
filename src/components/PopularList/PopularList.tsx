import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../types/post';
import styles from './PopularList.module.css';

export interface PopularListProps {
  posts: Post[];
}

export const PopularList: React.FC<PopularListProps> = ({ posts }) => {
  return (
    <div className={styles.box} aria-label="Most read this month">
      <h4 className={styles.heading}>Most read this month</h4>
      <ol className={styles.list}>
        {posts.map((post) => (
          <li key={post.id} className={styles.item}>
            <Link to={`/post/${post.slug}`} className={styles.link}>
              {post.title}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default PopularList;
