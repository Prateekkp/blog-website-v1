import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../../types/post';
import { formatDateShort } from '../../utils/formatDate';
import styles from './ArticleListItem.module.css';

export interface ArticleListItemProps {
  post: Post;
}

export const ArticleListItem: React.FC<ArticleListItemProps> = ({ post }) => {
  return (
    <article className={styles.post}>
      <time dateTime={post.publishedAt} className={styles.time}>
        {formatDateShort(post.publishedAt)}
      </time>
      <Link to={`/post/${post.slug}`} className={styles.content}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>{post.excerpt}</p>
        <div className={styles.footer}>
          <span className="tag">{post.category}</span>{' '}
          <span className="meta">&middot; {post.readingTimeMin} min read</span>
        </div>
      </Link>
    </article>
  );
};

export default ArticleListItem;
