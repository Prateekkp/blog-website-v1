import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigationType } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getPostBySlug, getPostsByCategory } from '../../services/api';
import { Post } from '../../types/post';
import { formatDateFull } from '../../utils/formatDate';
import { slugify } from '../../utils/slugify';
import { MarkdownRenderer } from '../../components/MarkdownRenderer/MarkdownRenderer';
import { ArticleListItem } from '../../components/ArticleListItem/ArticleListItem';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { NotFound } from '../NotFound/NotFound';
import styles from './Article.module.css';

export const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navType = useNavigationType();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Ensure scroll is at the very top (beginning of hero) on new article navigation
  useEffect(() => {
    if (navType !== 'POP') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [slug, isLoading, navType]);

  if (isLoading) {
    return (
      <div className={`band ${styles.skeletonContainer}`}>
        <Skeleton count={6} />
      </div>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const categorySlug = slugify(post.category);
  const initials = post.author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2);

  return (
    <article className={styles.page} aria-labelledby="article-title">
      <Helmet>
        <title>{`${post.title} - Nightwatch Tech`}</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:author" content={post.author.name} />
        <meta property="article:section" content={post.category} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
      </Helmet>

      {/* Hero Section with Batman background and article heading at bottom */}
      <header className={styles.hero} aria-label="Article Hero">
        <div className={`band ${styles.heroInner}`}>
          <div className={styles.heroBottom}>
            <div className={styles.badgeWrapper}>
              <Link to={`/topic/${categorySlug}`} className={styles.categoryBadge}>
                <span className={`tag ${styles.category}`}>{post.category}</span>
              </Link>
            </div>

            <h1 id="article-title" className={styles.title}>
              {post.title}
            </h1>

            <div className={styles.metaRow}>
              <div className={styles.authorMeta}>
                <div className={styles.avatarCircle} aria-hidden="true">
                  {initials}
                </div>
                <div className={styles.authorDetails}>
                  <div className={styles.authorNameRow}>
                    <span className={styles.author}>{post.author.name}</span>
                    {post.author.role && (
                      <span className={styles.authorRole}>({post.author.role})</span>
                    )}
                  </div>
                  <div className={styles.postMetaSub}>
                    <time dateTime={post.publishedAt}>{formatDateFull(post.publishedAt)}</time>
                    <span className={styles.bullet}>&middot;</span>
                    <span>{post.readingTimeMin} min read</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Article Content */}
      <div className={styles.contentBand}>
        <div className={`band ${styles.mainContainer}`}>
          <div className={styles.body}>
            <MarkdownRenderer content={post.body} />
          </div>

          {/* Author Card Footer */}
          <div className={styles.authorCard}>
            <div className={styles.authorCardAvatar} aria-hidden="true">
              {initials}
            </div>
            <div className={styles.authorCardContent}>
              <h3 className={styles.authorCardName}>{post.author.name}</h3>
              {post.author.role && (
                <p className={styles.authorCardRole}>{post.author.role} &middot; Nightwatch Tech</p>
              )}
              <p className={styles.authorCardBio}>
                Writes on high-throughput backend architecture, resilient cloud platforms, and security engineering.
              </p>
            </div>
          </div>

          {/* Related Articles */}
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
        </div>
      </div>
    </article>
  );
};

export default Article;
