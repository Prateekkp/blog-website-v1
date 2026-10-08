import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../../components/Hero/Hero';
import { ManifestoQuote } from '../../components/ManifestoQuote/ManifestoQuote';
import { TopicFilter } from '../../components/TopicFilter/TopicFilter';
import { TopStories } from '../../components/TopStories/TopStories';
import { ArticleListItem } from '../../components/ArticleListItem/ArticleListItem';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { AboutBand } from '../../components/AboutBand/AboutBand';
import { Skeleton } from '../../components/Skeleton/Skeleton';
import { ErrorState } from '../../components/ErrorState/ErrorState';
import { getPosts, getPopularPosts, getCachedPosts, getCachedPopularPosts } from '../../services/api';
import { Post } from '../../types/post';
import { slugify, categoryFromSlug } from '../../utils/slugify';
import { getAllTopicNames } from '../../config/topics';
import styles from './Home.module.css';

const LATEST_POSTS_LIMIT = 5;

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [posts, setPosts] = useState<Post[]>(() => getCachedPosts());
  const [popularPosts, setPopularPosts] = useState<Post[]>(() => getCachedPopularPosts());
  const [isLoading, setIsLoading] = useState(() => getCachedPosts().length === 0);
  const [error, setError] = useState<string | null>(null);

  const categories = useMemo(() => {
    const configuredTopics = getAllTopicNames();
    const dynamicTopics = Array.from(new Set(posts.map((p) => p.category).filter(Boolean)));
    const combined = ['All'];
    for (const cat of [...configuredTopics.slice(1), ...dynamicTopics]) {
      if (!combined.includes(cat)) {
        combined.push(cat);
      }
    }
    return combined;
  }, [posts]);

  const topicParam = searchParams.get('topic');

  // Match URL param to category
  const selectedCategory = useMemo(() => {
    if (!topicParam) return 'All';
    const decoded = decodeURIComponent(topicParam);
    const resolved = categoryFromSlug(decoded);
    const matched = categories.find(
      (c) => c.toLowerCase() === resolved.toLowerCase() || slugify(c) === slugify(decoded)
    );
    return matched || 'All';
  }, [topicParam, categories]);

  const loadData = useCallback(async () => {
    if (getCachedPosts().length === 0) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const [fetchedPosts, fetchedPopular] = await Promise.all([
        getPosts(),
        getPopularPosts(5),
      ]);
      setPosts(fetchedPosts);
      setPopularPosts(fetchedPopular);
    } catch {
      setError('Could not connect to the article service. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleSelectCategory = (cat: string) => {
    const nextParams = new URLSearchParams(searchParams);
    if (cat === 'All') {
      nextParams.delete('topic');
    } else {
      nextParams.set('topic', slugify(cat));
    }
    setSearchParams(nextParams, { replace: true });
  };

  const handleHeroCta = () => {
    const topEl = document.getElementById('top') || document.getElementById('latest');
    topEl?.scrollIntoView({ behavior: 'smooth' });
  };

  // Filter logic matching the prototype exactly
  const { topPosts, listedPosts } = useMemo(() => {
    const filtered = posts.filter(
      (p) => selectedCategory === 'All' || p.category === selectedCategory
    );
    const tops = filtered.filter((p) => p.featured);
    const rest = filtered.filter((p) => !p.featured);

    if (selectedCategory === 'All') {
      return { topPosts: tops, listedPosts: rest.slice(0, LATEST_POSTS_LIMIT) };
    }
    // When filtered by topic, top stories grid is hidden, and all posts show in latest list
    return { topPosts: [], listedPosts: filtered };
  }, [posts, selectedCategory]);

  return (
    <>
      <Helmet>
        <title>Nightwatch Tech: Engineering, AI and security writing</title>
        <meta
          name="description"
          content="Practical articles on AI, cloud, security, web development and data engineering. Written by working engineers."
        />
        <meta property="og:title" content="Nightwatch Tech" />
        <meta
          property="og:description"
          content="Engineering, AI and security writing for people who build and run software."
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Nightwatch Tech" />
        <meta
          name="twitter:description"
          content="Engineering, AI and security writing for people who build and run software."
        />
      </Helmet>

      <Hero onCtaClick={handleHeroCta} />

      <ManifestoQuote />

      <TopicFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      {error ? (
        <div className="band">
          <ErrorState message={error} onRetry={loadData} />
        </div>
      ) : (
        <>
          {topPosts.length > 0 && <TopStories posts={topPosts} />}

          <section id="latest" className={`band ${styles.section}`} aria-label="Latest Articles">
            <div className={styles.layout}>
              <div>
                <h2 className={styles.heading}>Latest articles</h2>
                {isLoading ? (
                  <Skeleton count={4} />
                ) : listedPosts.length > 0 ? (
                  listedPosts.map((post) => <ArticleListItem key={post.id} post={post} />)
                ) : (
                  <p className={styles.empty}>
                    No articles in this topic yet. Check back soon.
                  </p>
                )}
              </div>

              <Sidebar popularPosts={popularPosts} />
            </div>
          </section>

          <AboutBand />
        </>
      )}
    </>
  );
};

export default Home;
