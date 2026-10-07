export interface Author {
  name: string;
  avatar?: string;
  role?: string;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  publishedAt: string; // ISO date string
  readingTimeMin: number;
  author: Author;
  featured: boolean;
  coverImage?: string;
}

export type TopicCategory = 'All' | 'AI & ML' | 'Security' | 'Data' | 'Cloud & DevOps' | 'Web';
