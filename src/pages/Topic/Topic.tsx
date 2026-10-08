import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostsByCategory, getCachedPostsByCategory } from '../../services/api';
import { Post } from '../../types/post';
import { categoryFromSlug } from '../../utils/slugify';
import { getTopicBySlug, getTopicByName } from '../../config/topics';
import { ArticleListItem } from '../../components/ArticleListItem/ArticleListItem';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import styles from './Topic.module.css';

export const Topic: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const matchedTopic = slug ? getTopicBySlug(slug) : undefined;
  const categoryName = matchedTopic ? matchedTopic.name : slug ? categoryFromSlug(slug) : 'All';
  const description =
    matchedTopic?.description ||
    getTopicByName(categoryName)?.description ||
    `Articles and technical guides in ${categoryName}.`;

  const [posts, setPosts] = useState<Post[]>(() => getCachedPostsByCategory(categoryName));
  const [isLoading, setIsLoading] = useState(
    () => getCachedPostsByCategory(categoryName).length === 0
  );

  useEffect(() => {
    let isMounted = true;
    const cached = getCachedPostsByCategory(categoryName);
    if (cached.length === 0) {
      setIsLoading(true);
    }

    getPostsByCategory(categoryName).then((fetched) => {
      if (!isMounted) return;
      setPosts(fetched);
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [categoryName]);

  return (
    <div className={`band ${styles.container}`}>
      <Helmet>
        <title>{`${categoryName} - Nightwatch Tech`}</title>
        <meta name="description" content={description} />
      </Helmet>

      <Link to="/" className={styles.backLink}>
        &larr; Back to all articles
      </Link>

      <header className={styles.header}>
        <h1 className={styles.title}>{categoryName}</h1>
        <p className={styles.description}>{description}</p>
      </header>

      <section aria-label={`${categoryName} articles`}>
        {isLoading ? (
          <Skeleton count={4} />
        ) : posts.length > 0 ? (
          posts.map((post) => <ArticleListItem key={post.id} post={post} />)
        ) : (
          <p className={styles.empty}>No articles in this topic yet. Check back soon.</p>
        )}
      </section>
    </div>
  );
};

export default Topic;
