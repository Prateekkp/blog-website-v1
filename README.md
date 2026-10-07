# Nightwatch Tech

> A production-ready, mobile-first tech publication built with React 18, TypeScript, and Vite. Designed with a dark, Gotham-inspired visual identity, high performance, and accessible interactions.

---

## 1. Overview & Visual Identity

**Nightwatch Tech** is an engineering, AI, and security blog built for software practitioners. It features a bold visual identity with blood red accents (`#e8262b`), deep soot blacks (`#140809`), Barlow Condensed display typography, and Source Serif 4 body text.

This application was engineered by inverting the desktop-first static prototype into an accessible, mobile-first React single-page application (SPA).

---

## 2. Tech Stack

- **Framework**: React 18 + TypeScript (strict mode enabled)
- **Build Tool**: Vite 5 with Rollup code-splitting
- **Routing**: React Router v6 (declarative SPA routing with code-splitting via `React.lazy` and `<Suspense>`)
- **Styling**: CSS Modules + Global CSS Custom Properties (`src/styles/tokens.css`). Pure CSS with zero external UI kits or utility CSS dependencies.
- **Head & SEO**: `react-helmet-async` for per-route dynamic `<title>`, `<meta>`, and OpenGraph tags.
- **Typography**: Self-hosted `@fontsource/barlow-condensed` (600, 700, 800) and `@fontsource/source-serif-4` (400, 400-italic, 600, 700).
- **Testing**: Vitest + React Testing Library + `@testing-library/user-event`
- **Quality & Linting**: ESLint 9 (flat config) + Prettier

---

## 3. Mobile-First Architecture & Design Principles

All component and layout styles are written mobile-first for a base viewport of ~360px width. Progressive enhancements are added using `@media (min-width: ...)` queries at defined breakpoints:

- **Base (<600px)**: 1-column layouts, full-width content gutters (`--gutter: 1.25rem`), accessible hamburger navigation overlay, touch targets >= 44x44px.
- **Tablet (600px)**: 2-column related cards and footer legal row alignment.
- **Desktop (900px)**: Sticky topic filter bar, 2-column Top Stories grid (1 lead + 2 secondary), 2-column layout (articles list + 340px sidebar), 3-column About band, and visible desktop navigation links.
- **Large Desktop (1200px+)**: Cap line lengths to ~70ch (`--max-text-width`) for optimal readability without constraining the background or gutters.

### Mobile Enhancements
1. **Hero Viewport Height**: Styled with `min-height: 100svh` with a `100vh` fallback.
2. **Hero Image Framing**: Using responsive WebP and AVIF image sets (`640w`, `1024w`, `1920w`), the hero background position is tuned to `62% 20%` on mobile so Batman's face remains clearly visible right-of-center.
3. **Safe Area Insets**: Handled via `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)` with `viewport-fit=cover`.
4. **Accessible Mobile Menu**: Full-screen modal with an active focus trap (`useFocusTrap`), body scroll locking (`useScrollLock`), `aria-expanded` and `aria-controls` bindings, and closing on `Escape`, link click, or route change.

---

## 4. Getting Started

### Prerequisites
- Node.js >= 18 (Node 20+ or 22+ recommended)
- npm >= 9

### Installation
```bash
git clone <repo-url>
cd blog-website-v1
npm install
```

---

## 5. Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts Vite local dev server at `http://localhost:5173/` |
| `npm run build` | Runs TypeScript type checking (`tsc -b`) and Vite production bundle |
| `npm run preview` | Previews the production build locally |
| `npm run test` | Runs all Vitest unit and integration test suites |
| `npm run test:watch` | Runs Vitest in interactive watch mode |
| `npm run lint` | Runs ESLint 9 across all source files |
| `npm run format` | Formats source files using Prettier |

---

## 6. Project Structure

```
src/
├── assets/                  # Hero image variants (WebP, AVIF, original JPG)
├── components/              # Modular UI components (each with component.tsx & component.module.css)
│   ├── AboutBand/           # 3-column editorial values section
│   ├── ArticleListItem/     # Post list card with semantic time & tags
│   ├── ErrorState/          # Accessible error container with retry action
│   ├── Footer/              # 4-column desktop / 2-column mobile footer
│   ├── Hero/                # Viewport hero with responsive image-set & CTA
│   ├── Layout/              # Skip-link, Navbar, main landmark, Footer wrapper
│   ├── MarkdownRenderer/    # Custom markdown parser for article bodies
│   ├── MobileMenu/          # Accessible full-screen modal menu with focus trap
│   ├── Navbar/              # Transparent hero nav & solid inner page header
│   ├── NewsletterForm/      # Validated newsletter subscription with status
│   ├── PopularList/         # Ordered "Most read this month" list
│   ├── Sidebar/             # Aside containing newsletter and popular list
│   ├── Skeleton/            # Zero-CLS loading skeleton placeholder
│   ├── TopicFilter/         # Sticky topic filter bar with aria-pressed chips
│   └── TopStories/          # Lead article and secondary highlight grid
├── data/
│   └── posts.ts             # Typed sample dataset with 10 detailed technical essays
├── hooks/
│   ├── useFocusTrap.ts      # Traps Tab focus inside modals and handles Escape
│   └── useScrollLock.ts     # Locks background scrolling when modal is active
├── pages/                   # Code-split page routes
│   ├── About/               # Expanded editorial manifest and contributor pitch
│   ├── Article/             # Full article reader, metadata, share & related posts
│   ├── Home/                # Main console with hero, topic filter & sidebar
│   ├── NotFound/            # 404 page with return link
│   └── Topic/               # Topic-specific archive view
├── services/
│   └── api.ts               # Async promise-based API abstraction layer
├── styles/
│   ├── tokens.css           # CSS design tokens (colors, spacing, fonts, shadows)
│   └── global.css           # Mobile-first reset, typography, and utility classes
├── test/
│   └── setup.ts             # Vitest test setup with @testing-library/jest-dom
├── types/
│   └── post.ts              # TypeScript interfaces (Post, Author, TopicCategory)
└── utils/
    ├── formatDate.ts        # Date formatting matching prototype format
    └── slugify.ts           # URL slug and category normalization
```

---

## 7. How to Add a New Post

All posts are defined with strict types in `src/data/posts.ts`. To publish a new article:

1. Open `src/data/posts.ts`.
2. Append a new object complying with the `Post` interface:

```typescript
{
  id: 'post-11',
  slug: 'scaling-sqlite-for-edge-analytics',
  title: 'Scaling SQLite for edge analytics',
  category: 'Data', // 'AI & ML' | 'Security' | 'Data' | 'Cloud & DevOps' | 'Web'
  publishedAt: '2026-10-08',
  readingTimeMin: 8,
  excerpt: 'Embedded databases running on edge runtimes provide sub-millisecond latencies when paired with WAL mode and LiteFS replication.',
  featured: false, // set to true if it should appear in the Top Stories grid
  author: {
    name: 'Devon Chen',
    role: 'Principal Infrastructure Engineer',
  },
  body: `### The Edge Database Paradox
Deploying monolithic database clusters close to global edge users introduces synchronization latency...
  `
}
```

3. The article will automatically be indexed by topic, rendered on the homepage, listed in related posts, and given a route at `/post/scaling-sqlite-for-edge-analytics`.

---

## 8. Replacing the Data Service with a Real API

The application accesses all content and newsletter endpoints through `src/services/api.ts`. Components never import `posts.ts` directly.

To connect a headless CMS (Contentful, Sanity, Strapi) or a REST / GraphQL backend:

1. Open `src/services/api.ts`.
2. Replace the local data reads with `fetch()` calls:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.nightwatch.tech';

export async function getPosts(): Promise<Post[]> {
  const res = await fetch(`${API_BASE_URL}/articles`);
  if (!res.ok) throw new Error('Failed to fetch articles');
  return res.json();
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const res = await fetch(`${API_BASE_URL}/articles/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Failed to fetch article');
  return res.json();
}

export async function subscribe(email: string): Promise<SubscribeResponse> {
  const res = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  return res.json();
}
```

Because all components consume `Promise<Post>` and `Promise<Post[]>`, no changes to components or pages are needed.

---

## 9. Accessibility & Performance

- **WCAG AA Compliance**: High-contrast ratios across all text elements (4.5:1+ for body text, 3:1+ for large titles).
- **Focus Indicators**: 2px white solid outline with 3px offset (`:focus-visible`).
- **Reduced Motion**: Complete disabling of transitions and smooth scroll when `prefers-reduced-motion: reduce` is enabled.
- **Hero Image Optimization**: Self-hosted responsive WebP and AVIF assets with `<link rel="preload">` in the document head for optimal Largest Contentful Paint (LCP).
- **Zero CLS**: Strict skeleton layout placeholders matching real article dimensions to prevent Cumulative Layout Shift.
