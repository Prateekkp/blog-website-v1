import { POSTS } from '../data/posts';
import { Post } from '../types/post';

/**
 * Simulates network latency for realistic async behavior.
 */
const delay = (ms = 40): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

let postsCache: Post[] = [...POSTS];
let popularPostsCache: Post[] = POSTS.slice(0, 5).map((p) => ({ ...p }));

export function getCachedPosts(): Post[] {
  return [...postsCache];
}

export function getCachedPopularPosts(count = 5): Post[] {
  return popularPostsCache.slice(0, count).map((p) => ({ ...p }));
}

export function getCachedPostBySlug(slug: string): Post | null {
  const post = postsCache.find((p) => p.slug === slug);
  return post ? { ...post } : null;
}

export function getCachedPostsByCategory(category: string): Post[] {
  if (category === 'All') {
    return [...postsCache];
  }
  return postsCache.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getPosts(): Promise<Post[]> {
  return [...postsCache];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return getCachedPostBySlug(slug);
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  return getCachedPostsByCategory(category);
}

export async function getPopularPosts(count = 5): Promise<Post[]> {
  return getCachedPopularPosts(count);
}

/**
 * Dynamic Post Registry API
 * Enables teams or plug-and-play modules to register or add articles
 * without needing to modify existing codebase files.
 */
export function registerPost(newPost: Post): void {
  const existingIndex = POSTS.findIndex(
    (p) => p.slug === newPost.slug || p.id === newPost.id
  );
  if (existingIndex >= 0) {
    POSTS[existingIndex] = newPost;
  } else {
    POSTS.unshift(newPost);
  }
  // Refresh in-memory caches
  postsCache = [...POSTS];
  popularPostsCache = POSTS.slice(0, 5).map((p) => ({ ...p }));
}

export interface SubscribeResponse {
  success: boolean;
  message: string;
}

/**
 * Subscribes an email to the weekly build log newsletter.
 * TODO: Replace this simulation stub with a production endpoint (e.g., /api/newsletter/subscribe).
 */
export async function subscribe(email: string): Promise<SubscribeResponse> {
  await delay(150);

  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email.trim())) {
    return {
      success: false,
      message: 'Enter a valid email address, like you@company.com.',
    };
  }

  // Simulating successful network response
  return {
    success: true,
    message: "You're subscribed. Check your inbox to confirm.",
  };
}
