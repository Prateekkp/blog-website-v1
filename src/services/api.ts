import { POSTS } from '../data/posts';
import { Post } from '../types/post';

/**
 * Simulates network latency for realistic async behavior.
 */
const delay = (ms = 40): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getPosts(): Promise<Post[]> {
  await delay();
  return [...POSTS];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await delay();
  const post = POSTS.find((p) => p.slug === slug);
  return post ? { ...post } : null;
}

export async function getPostsByCategory(category: string): Promise<Post[]> {
  await delay();
  if (category === 'All') {
    return [...POSTS];
  }
  return POSTS.filter((p) => p.category.toLowerCase() === category.toLowerCase());
}

export async function getPopularPosts(count = 5): Promise<Post[]> {
  await delay();
  return POSTS.slice(0, count).map((p) => ({ ...p }));
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
