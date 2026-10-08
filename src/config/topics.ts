/**
 * Topic & Category Registry
 * Adding a topic here automatically updates topic pages, descriptions, filters, and footer links.
 */
export interface TopicDefinition {
  name: string;
  slug: string;
  description: string;
}

export const TOPICS: TopicDefinition[] = [
  {
    name: 'AI & ML',
    slug: 'ai-ml',
    description:
      'Retrieval-augmented systems, evaluation frameworks, practical LLM deployments, and production machine learning.',
  },
  {
    name: 'Security',
    slug: 'security',
    description:
      'Zero-trust rollouts, cloud security postures, incident response runbooks, and vulnerability mitigations.',
  },
  {
    name: 'Data',
    slug: 'data',
    description:
      'Distributed queries, database scaling, modern schema design, and high-throughput pipelines.',
  },
  {
    name: 'Cloud & DevOps',
    slug: 'cloud-devops',
    description:
      'CI/CD speed optimization, infrastructure-as-code reliability, Kubernetes operations, and observability.',
  },
  {
    name: 'Web',
    slug: 'web',
    description:
      'Frontend architecture, Core Web Vitals optimization, React server components, and browser runtime performance.',
  },
];

export function getTopicBySlug(slug: string): TopicDefinition | undefined {
  return TOPICS.find((t) => t.slug.toLowerCase() === slug.toLowerCase());
}

export function getTopicByName(name: string): TopicDefinition | undefined {
  return TOPICS.find((t) => t.name.toLowerCase() === name.toLowerCase());
}

export function getAllTopicNames(): string[] {
  return ['All', ...TOPICS.map((t) => t.name)];
}

export default TOPICS;
