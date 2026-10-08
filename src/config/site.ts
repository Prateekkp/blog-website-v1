/**
 * Global Site Configuration
 * Central source of truth for site-wide metadata, branding, and contact details.
 */
export const SITE_CONFIG = {
  name: 'Nightwatch Tech',
  tagline: 'Engineering, AI and security writing for people who build and run software. One clear article at a time.',
  description:
    'Practical articles on AI, cloud, security, web development and data engineering. Written by working engineers.',
  url: 'https://nightwatch.tech',
  contactEmail: 'editor@nightwatch.tech',
  copyrightYear: 2026,
  newsletter: {
    title: 'The weekly build log',
    description: "One email every Friday with the week's best articles. No spam, unsubscribe any time.",
  },
} as const;

export default SITE_CONFIG;
