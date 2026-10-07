import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../types/post';
import { formatDateFull } from '../../utils/formatDate';
import styles from './TopStories.module.css';

export interface TopStoriesProps {
  posts: Post[];
}

export const TopStories: React.FC<TopStoriesProps> = ({ posts }) => {
  if (posts.length === 0) return null;

  const lead = posts[0];
  const sideItems = posts.slice(1, 3);

  return (
    <section id="top" className={`band ${styles.section}`} aria-label="Top Stories">
      <h2 className={styles.heading}>Top stories</h2>
      <div className={styles.topGrid}>
        <article className={styles.lead}>
          <Link to={`/post/${lead.slug}`} className={styles.leadLink}>
            <span className="tag">{lead.category}</span>
            <h3 className={styles.leadTitle}>{lead.title}</h3>
          </Link>
          <p className={styles.leadExcerpt}>{lead.excerpt}</p>
          <div className="meta">
            {formatDateFull(lead.publishedAt)} &middot; {lead.readingTimeMin} min read
          </div>
        </article>

        <div className={styles.sideList}>
          {sideItems.map((post, idx) => (
            <article key={post.id} className={styles.item}>
              <div className={styles.itemHeader}>
                <span className={styles.badge}>0{idx + 1}</span>
                <span className="tag">{post.category}</span>
              </div>
              <Link to={`/post/${post.slug}`} className={styles.itemLink}>
                <h3 className={styles.itemTitle}>{post.title}</h3>
              </Link>
              <p className={styles.itemExcerpt}>{post.excerpt}</p>
              <div className={`meta ${styles.itemMeta}`}>
                {post.readingTimeMin} min read
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopStories;
