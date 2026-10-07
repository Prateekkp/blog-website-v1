import { Post } from '../types/post';

export const POSTS: Post[] = [
  {
    id: 'post-1',
    slug: 'why-your-rag-pipeline-returns-confident-wrong-answers',
    title: 'Why your RAG pipeline returns confident wrong answers',
    category: 'AI & ML',
    publishedAt: '2026-10-05',
    readingTimeMin: 9,
    excerpt:
      'Retrieval fails quietly. We walk through chunking, reranking and evaluation sets that catch bad answers before users do.',
    featured: true,
    author: {
      name: 'Elena Rostova',
      role: 'Staff ML Engineer',
    },
    body: `Retrieval-Augmented Generation (RAG) has become the default architecture for enterprise generative AI, but it introduces a distinct failure mode: **silent hallucination under high semantic confidence**. When an embedding model finds chunks that are semantically adjacent but factually irrelevant or out of date, the LLM synthesizes a polished, authoritative answer that is entirely incorrect.

### The Chunking Trap

Most initial implementations start with naive chunking—arbitrary splits at 500 tokens with a 50-token sliding window. This breaks semantic units cleanly in half. A policy clause stating an exception to a primary rule will end up in chunk B, while chunk A contains only the primary rule. When the query asks about the exception, vector search retrieves chunk A due to direct keyword and topic overlap, omitting the critical qualifier.

To solve this, structured chunking based on semantic boundaries (such as document ASTs or Markdown headers) must replace fixed windows. Each chunk should carry contextual metadata, including document hierarchy and breadcrumbs, prepended directly into the embedded text.

### Why Reranking is Mandatory

Bi-encoder embeddings compress thousands of words into fixed-dimension vectors, discarding subtle nuances in favour of high-level topic clustering. Cross-encoder rerankers, while computationally heavier, score query-document pairs jointly with full cross-attention.

\`\`\`python
# Example evaluation with cross-encoder reranking
from sentence_transformers import CrossEncoder

reranker = CrossEncoder('cross-encoder/ms-marco-MiniLM-L-6-v2')
scores = reranker.predict([(query, doc) for doc in candidate_chunks])
top_chunks = [doc for _, doc in sorted(zip(scores, candidate_chunks), reverse=True)[:3]]
\`\`\`

Introducing a cross-encoder to rerank the top 25 retrieved candidates down to the top 3-5 candidates typically increases precision by 25-35% without requiring vector store re-indexing.

### Continuous Evaluation with Golden Sets

You cannot fix what you do not measure. Automated regression testing for RAG pipelines requires a curated dataset of at least 100 domain questions with verified ground-truth contexts and expected assertions. Automated metrics such as context precision, context recall, and faithfulness must run against every pull request touching embedding models or chunking parameters.`,
  },
  {
    id: 'post-2',
    slug: 'a-practical-zero-trust-rollout-for-a-50-person-company',
    title: 'A practical zero-trust rollout for a 50-person company',
    category: 'Security',
    publishedAt: '2026-10-03',
    readingTimeMin: 11,
    excerpt:
      'Start with identity and device checks, not a six-figure platform. A staged plan with what to do in the first 30 days.',
    featured: true,
    author: {
      name: 'Marcus Vance',
      role: 'Head of Security Operations',
    },
    body: `Zero-trust architecture is often sold by enterprise vendors as an all-or-nothing digital transformation requiring six-figure subscriptions and dedicated security operations centers. For a 50-person engineering startup, this advice is actively harmful. It leads to analysis paralysis, shelfware, and frustrated developers bypassing controls.

In reality, zero trust is a guiding principle: **never trust, always verify, and assume breach**. You can implement 80% of its real-world protection using standard identity providers and endpoint management tooling that most teams already pay for.

### Week 1: Identity Hardening & Phishing-Resistant MFA

The perimeter is dead; the identity provider is the only firewall that matters. The single most effective action in month one is deprecating SMS and push-notification MFA in favour of FIDO2 WebAuthn hardware keys or platform authenticators (Touch ID, Windows Hello).

Push fatigue attacks and SIM swaps remain the leading vectors for initial compromise. By enforcing WebAuthn across your IdP (Okta, Google Workspace, or Entra ID), credential phishing becomes virtually impossible.

### Week 2: Device Health Verification

A compromised laptop authenticated via legitimate credentials bypasses every traditional check. Implement basic Mobile Device Management (MDM) with compliance policies:

1. Disk encryption enabled (FileVault / BitLocker).
2. Operating system within N-1 patch level.
3. Screen lock timeout under 5 minutes.
4. Gate access to critical repositories and production clouds so that only compliant, MDM-enrolled devices are issued OAuth tokens.

### Weeks 3–4: Granular Infrastructure Access

Replace permanent SSH bastion hosts and shared VPN subnets with short-lived, role-based certificates (using tools like Tailscale or Teleport). Engineers should authenticate against the central IdP with session lifespans capped at 8 to 12 hours. Every access request is logged, scoped to a single node, and leaves a tamper-evident audit trail.`,
  },
  {
    id: 'post-3',
    slug: 'postgres-or-a-vector-database-start-with-postgres',
    title: 'Postgres or a vector database? Start with Postgres',
    category: 'Data',
    publishedAt: '2026-10-01',
    readingTimeMin: 7,
    excerpt:
      'For most apps under a few million embeddings, pgvector is enough. Where it stops being enough, and how to tell.',
    featured: true,
    author: {
      name: 'Devon Chen',
      role: 'Principal Infrastructure Engineer',
    },
    body: `Every wave of infrastructure innovation spawns specialized databases. Just as early NoSQL hype urged teams to abandon relational storage, the AI boom brought specialized vector databases promising billion-scale indexing. But for 95% of engineering teams, introducing a dedicated vector store is premature optimization that introduces operational overhead.

If you already operate PostgreSQL, the \`pgvector\` extension provides high-performance vector similarity search alongside your transactional data, ACID guarantees, and standard backup pipelines.

### The Problem with Distributed Vector Stores

When your embeddings live in a separate database from your relational entities (users, tenants, documents, permissions), every search query requires an awkward two-phase dance:

- Query the vector store for nearest neighbors.
- Filter the resulting IDs in PostgreSQL against tenancy and permission constraints.
- Or vice-versa, pulling thousands of IDs to filter downstream.

This leads to consistency lag, network latency between distributed clusters, and complex split-brain recovery procedures during failovers. With Postgres, metadata filtering and vector similarity happen in a single query planner pass using familiar SQL syntax.

\`\`\`sql
SELECT id, title, 1 - (embedding <=> $1) AS similarity
FROM documents
WHERE tenant_id = $2 AND archived = false
ORDER BY embedding <=> $1
LIMIT 10;
\`\`\`

### When pgvector Actually Breaks

Pgvector using HNSW indexes excels up to roughly 5 to 10 million vectors with 1536 dimensions, provided adequate RAM is allocated for the index to reside in memory. 

You only need a specialized vector database when you cross into tens of millions of records, require multi-region distributed sharding, or need specialized vector graph algorithms that exceed standard node memory limits. Until you hit those verified metrics, stay with Postgres.`,
  },
  {
    id: 'post-4',
    slug: 'cutting-ci-time-from-24-minutes-to-6',
    title: 'Cutting CI time from 24 minutes to 6',
    category: 'Cloud & DevOps',
    publishedAt: '2026-09-29',
    readingTimeMin: 8,
    excerpt:
      'Caching, test sharding and removing the slowest 5% of tests. Measurements from a real monorepo.',
    featured: false,
    author: {
      name: 'Siddharth Patel',
      role: 'Senior DevOps Architect',
    },
    body: `A 24-minute pull request build pipeline destroys developer velocity. It breaks flow state, encourages engineers to batch up massive risky changes, and causes git branch contention when multiple team members attempt to merge concurrently. Over six weeks, our team systematically profiled and refactored our monorepo CI, slashing total cycle time down to 6 minutes and 12 seconds.

### Step 1: Accurate Flamegraph Profiling

Before attempting optimizations, profile every step with microsecond granularity. In our pipeline, we discovered that 7 minutes were consumed by clean \`npm install\` operations that failed to hit remote cache keys due to dynamic lockfile timestamps. Switching to deterministic content-hashed lockfile caching immediately eliminated 5 minutes of dead waiting time.

### Step 2: Intelligent Test Sharding & Parallelism

Rather than running integration suites sequentially on a single runner, we implemented test runner sharding across 4 parallel compute instances. By balancing shard allocations based on historical test duration rather than simple file count, each worker completes within 10 seconds of one another.

### Step 3: Eliminating Flaky and Redundant Tests

We analyzed test execution telemetry over the past 90 days. The slowest 5% of end-to-end browser tests accounted for 48% of the suite's execution time and generated 90% of false-positive flakes. Replacing these bloated integration journeys with focused contract tests and unit tests restored predictability and delivered massive performance gains.`,
  },
  {
    id: 'post-5',
    slug: 'server-components-explained-without-the-hype',
    title: 'Server components, explained without the hype',
    category: 'Web',
    publishedAt: '2026-09-26',
    readingTimeMin: 10,
    excerpt:
      'What actually moves to the server, what stays in the browser, and the three mistakes teams make when migrating.',
    featured: false,
    author: {
      name: 'Sarah Lindqvist',
      role: 'Principal Frontend Engineer',
    },
    body: `React Server Components (RSC) represent the largest mental model shift in the React ecosystem since hooks debuted in 2018. Unfortunately, much of the discourse around RSC has oscillated between vendor marketing hype and reactionary skepticism. To make informed architectural decisions, engineers need to understand the underlying mechanics without the buzzwords.

At their core, Server Components never ship their JavaScript dependencies to the client browser. They execute exclusively on the server or during static build time, outputting a serialized JSON-like virtual DOM stream that reconciles seamlessly with interactive client components.

### What Stays and What Moves

Heavy libraries—markdown parsers, date formatters, syntax highlighters, and database query clients—can remain strictly on the server. Your client bundle size drops dramatically because zero bytes of those libraries download over the wire.

Conversely, any component that requires user interaction, browser APIs, local state (\`useState\`), or lifecycle hooks (\`useEffect\`) remains a traditional Client Component marked with \`"use client"\`.

### The Three Migration Gotchas

1. **Waterfalls in Component Trees**: Calling \`await db.query()\` sequentially inside deeply nested components recreates classical backend N+1 waterfalls. Data fetching must be hoisted or parallelized with \`Promise.all\`.
2. **Prop Serialization Boundaries**: Passing complex objects with methods or cyclic structures across the server-client boundary will fail at runtime.
3. **Overusing Client Directives**: Marking a root layout as \`"use client"\` inadvertently turns its entire subtree into client code, defeating the benefits of server rendering.`,
  },
  {
    id: 'post-6',
    slug: 'writing-prompts-you-can-unit-test',
    title: 'Writing prompts you can unit test',
    category: 'AI & ML',
    publishedAt: '2026-09-22',
    readingTimeMin: 6,
    excerpt:
      'Treat prompts like code: fixed inputs, expected properties, regression suites. A small harness you can copy.',
    featured: false,
    author: {
      name: 'Elena Rostova',
      role: 'Staff ML Engineer',
    },
    body: `Treating prompt engineering as an art form rather than software engineering is a recipe for catastrophic production regressions. A tweak that improves sentiment analysis in one edge case frequently degrades structured JSON parsing across a dozen others. Prompts must be version-controlled, parametrized, and verified with deterministic unit tests.

### Property-Based Testing for Probabilistic Systems

Because LLM outputs are stochastic, testing for exact string equality is impossible. Instead, test for invariants and structural properties:

- Did the response parse as valid schema-compliant JSON?
- Does the output array contain all IDs supplied in the input prompt?
- Are prohibited keywords or security secrets strictly absent?
- Is the word count bounded within acceptable operational limits?

\`\`\`typescript
describe('Prompt Evaluation: ExtractKeyPoints', () => {
  it('preserves all mandatory regulatory citations', async () => {
    const output = await runPrompt(extractKeyPointsPrompt, sampleArticle);
    const parsed = JSON.parse(output);
    expect(parsed.citations).toContain('ISO-27001');
    expect(parsed.citations).toContain('SOC-2');
  });
});
\`\`\`

### Isolating Prompt Versions with Golden Assertions

Store prompt templates alongside application code in Git. By establishing an automated test harness that executes against cached mock completions during routine PRs, you catch structural breakages before spending model tokens.`,
  },
  {
    id: 'post-7',
    slug: 'secrets-in-git-history-finding-and-rotating-them-fast',
    title: 'Secrets in Git history: finding and rotating them fast',
    category: 'Security',
    publishedAt: '2026-09-18',
    readingTimeMin: 7,
    excerpt:
      'A checklist for the first hour after a leaked key, and the tooling that prevents the next one.',
    featured: false,
    author: {
      name: 'Marcus Vance',
      role: 'Head of Security Operations',
    },
    body: `It happens to every organization eventually: a developer accidentally commits a \`.env\` file containing AWS access keys, Stripe private tokens, or database connection strings. Once committed and pushed to a remote repository, consider the secret compromised immediately. Crawlers scrape public GitHub commits in under 3 seconds.

### The Immediate First Hour Checklist

1. **Assume Active Exploitation**: Do not waste time trying to delete the commit or force-push history before revoking the credential. An attacker may already possess it.
2. **Revoke and Rotate First**: Invalidate the key at the provider console immediately and issue a replacement.
3. **Audit Access Logs**: Inspect CloudTrail, database query logs, or Stripe webhooks for unauthorized actions initiated during the exposure window.
4. **Purge Git History**: Use \`git-filter-repo\` or \`BFG Repo-Cleaner\` to purge the compromised artifact from all local and remote branches.

### Pre-Commit Prevention

Prevention is orders of magnitude cheaper than remediation. Enforce local pre-commit hooks using tools like \`gitleaks\` or \`trufflehog\`. Combined with secret-scanning push protection on your Git forge, leaked keys are blocked before they ever leave the developer's laptop.`,
  },
  {
    id: 'post-8',
    slug: 'designing-a-data-warehouse-schema-analysts-will-actually-use',
    title: 'Designing a data warehouse schema analysts will actually use',
    category: 'Data',
    publishedAt: '2026-09-14',
    readingTimeMin: 12,
    excerpt:
      'Naming, grain and slowly changing dimensions, with before-and-after examples from a retail dataset.',
    featured: false,
    author: {
      name: 'Devon Chen',
      role: 'Principal Infrastructure Engineer',
    },
    body: `A data warehouse filled with hundreds of normalized transactional tables is useless if business analysts cannot write queries without joining twelve tables together. Conversely, sprawling 300-column wide tables with inconsistent grain lead to duplicate calculations and conflicting metrics reported to executives.

Effective warehouse modeling balances dimensional clarity (Kimball methodology) with modern columnar storage characteristics.

### Establishing the Grain

Every dimensional fact table must have an explicitly defined and documented grain. Is a row one order line item, one completed order, or one billing invoice? When grain is ambiguous, downstream aggregations double-count revenue and erode stakeholder trust.

### Naming Conventions that Prevent Errors

Adopt strict naming conventions across dimensional models:
- Primary keys: \`dim_customer_key\`, \`dim_product_key\`
- Degenerate dimensions: \`order_number\`, \`tracking_code\`
- Timestamps: always suffix with \`_at\` (\`created_at\`, \`shipped_at\`)
- Booleans: prefix with \`is_\` or \`has_\` (\`is_active\`, \`has_churned\`)

Clear naming eliminates ambiguity and allows non-technical stakeholders to build reliable dashboards with confidence.`,
  },
  {
    id: 'post-9',
    slug: 'terraform-state-five-ways-teams-break-it',
    title: 'Terraform state: five ways teams break it',
    category: 'Cloud & DevOps',
    publishedAt: '2026-09-10',
    readingTimeMin: 8,
    excerpt:
      'Shared state, drift and manual edits. How to structure workspaces and locking so applies stay boring.',
    featured: false,
    author: {
      name: 'Siddharth Patel',
      role: 'Senior DevOps Architect',
    },
    body: `Terraform state is the single source of truth connecting your declarative code to physical cloud infrastructure. When state corrupts, routine deployments halt, resources risk unintended destruction, and engineering teams lose confidence in their automation.

### 1. Monolithic State Files

Putting your entire infrastructure—VPCs, Kubernetes clusters, databases, and DNS records—into a single Terraform state file is a ticking time bomb. A single apply takes 20 minutes, state locking blocks the entire company, and a single typo can cascade across the stack. Decouple by lifecycle: network rarely changes; application services change hourly.

### 2. Manual Console Drift

When an engineer fixes a production outage by manually tweaking a security group in the AWS management console, state drifts. The next automated Terraform run will silently revert the hotfix or fail with conflicting dependency errors. Enforce read-only console access for production.

### 3. Missing State Locking

Running concurrent applies without distributed locking (such as DynamoDB or cloud storage object locking) leads to race conditions where one apply overwrites the state metadata of another. Always configure strict backend locking.`,
  },
  {
    id: 'post-10',
    slug: 'core-web-vitals-in-practice-fixing-lcp-on-a-slow-mobile-network',
    title: 'Core Web Vitals in practice: fixing LCP on a slow mobile network',
    category: 'Web',
    publishedAt: '2026-09-05',
    readingTimeMin: 9,
    excerpt:
      'Image sizing, font loading and server timing changes that cut largest-contentful-paint by 40%.',
    featured: false,
    author: {
      name: 'Sarah Lindqvist',
      role: 'Principal Frontend Engineer',
    },
    body: `Largest Contentful Paint (LCP) accounts for 25% of Google's Core Web Vitals score and directly impacts user retention on mobile devices. While desktop lab scores often look pristine on high-speed fiber connections, real-world field metrics on 4G cellular connections tell a starkly different story.

### Preloading the Critical Hero Element

The most common LCP bottleneck is late image discovery. If your hero image is loaded via CSS \`background-image\` or buried inside client-side JavaScript components, the browser cannot begin downloading it until the stylesheet and bundle finish executing.

Declare high-priority \`<link rel="preload">\` tags in the HTML \`<head>\` with responsive \`media\` and \`type\` attributes. This allows the browser's speculative pre-parser to initiate the image request in parallel with stylesheet downloads.

### Self-Hosting Fonts with font-display: swap

Render-blocking web fonts delay first text paint and trigger layout shifts. By self-hosting optimized WOFF2 fonts and applying font-display fallback strategies, the layout stabilizes immediately, eliminating layout shift (CLS) while accelerating LCP.

### Responsive Image Sizing

Serving a 1920px desktop JPEG to a 390px mobile viewport wastes cellular bandwidth and saturates memory. Using modern formats like WebP or AVIF alongside responsive \`<picture>\` sources reduced our total hero payload by 78%, yielding an instant 1.2-second improvement in mobile LCP.`,
  },
];
