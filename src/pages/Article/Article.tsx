import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug, getPostsByCategory } from '../../services/api';
import { Post } from '../../types/post';
import { formatDateFull } from '../../utils/formatDate';
import { MarkdownRenderer } from '../../components/MarkdownRenderer/MarkdownRenderer';
import { ArticleListItem } from '../../components/ArticleListItem/ArticleListItem';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { NotFound } from '../NotFound/NotFound';
import styles from './Article.module.css';

export const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);

    if (!slug) {
      setIsLoading(false);
      return;
    }

    getPostBySlug(slug).then((fetchedPost) => {
      if (!isMounted) return;
      setPost(fetchedPost);

      if (fetchedPost) {
        getPostsByCategory(fetchedPost.category).then((categoryPosts) => {
          if (!isMounted) return;
          const filtered = categoryPosts.filter((p) => p.slug !== fetchedPost.slug).slice(0, 2);
          setRelatedPosts(filtered);
        });
      }
      setIsLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className={`band ${styles.container}`}>
        <Skeleton count={5} />
      </div>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  return (
    <article className={`band ${styles.container}`} aria-labelledby="article-title">
      <Helmet>
        <title>{`${post.title} - Nightwatch Tech`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
      </Helmet>

      <Link to="/" className={styles.backLink}>
        &larr; Back to articles
      </Link>

      <header className={styles.header}>
        <Link to={`/topic/${post.category.toLowerCase().replace(/[\s&]+/g, '-')}`}>
          <span className={`tag ${styles.category}`}>{post.category}</span>
        </Link>
        <h1 id="article-title" className={styles.title}>
          {post.title}
        </h1>

        <div className={styles.metaRow}>
          <div className={styles.metaInfo}>
            <span className={styles.author}>{post.author.name}</span>
            {post.author.role && <span>({post.author.role})</span>}
            <span>&middot;</span>
            <time dateTime={post.publishedAt}>{formatDateFull(post.publishedAt)}</time>
            <span>&middot;</span>
            <span>{post.readingTimeMin} min read</span>
          </div>

          <button
            type="button"
            className={styles.shareBtn}
            onClick={handleCopyLink}
            aria-label="Copy article link to clipboard"
          >
            {copied ? (
              <span className={styles.shareFeedback} aria-live="polite">
                &check; Link Copied
              </span>
            ) : (
              <span>Share Link</span>
            )}
          </button>
        </div>
      </header>

      <div className={styles.body}>
        <MarkdownRenderer content={post.body} />
      </div>

      {relatedPosts.length > 0 && (
        <section className={styles.related} aria-label="Related Articles">
          <h2 className={styles.relatedHeading}>Related in {post.category}</h2>
          <div className={styles.relatedGrid}>
            {relatedPosts.map((related) => (
              <ArticleListItem key={related.id} post={related} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
};

export default Article;
