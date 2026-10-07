export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[\s\W-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function categoryFromSlug(slug: string): string {
  const map: Record<string, string> = {
    'ai-and-ml': 'AI & ML',
    'ai-ml': 'AI & ML',
    security: 'Security',
    'cloud-and-devops': 'Cloud & DevOps',
    'cloud-devops': 'Cloud & DevOps',
    web: 'Web',
    data: 'Data',
  };
  return map[slug.toLowerCase()] || slug;
}
