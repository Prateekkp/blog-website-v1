import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostsByCategory } from '../../services/api';
import { Post } from '../../types/post';
import { categoryFromSlug } from '../../utils/slugify';
import { ArticleListItem } from '../../components/ArticleListItem/ArticleListItem';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import styles from './Topic.module.css';

const topicDescriptions: Record<string, string> = {
  'AI & ML':
    'Retrieval-augmented systems, evaluation frameworks, practical LLM deployments, and production machine learning.',
  Security:
    'Zero-trust rollouts, cloud security postures, incident response runbooks, and vulnerability mitigations.',
  Data:
    'Distributed queries, database scaling, modern schema design, and high-throughput pipelines.',
  'Cloud & DevOps':
    'CI/CD speed optimization, infrastructure-as-code reliability, Kubernetes operations, and observability.',
  Web:
    'Frontend architecture, Core Web Vitals optimization, React server components, and browser runtime performance.',
};

export const Topic: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryName = slug ? categoryFromSlug(slug) : 'All';
  const description =
    topicDescriptions[categoryName] ||
    `Articles and technical guides in ${categoryName}.`;

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

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
