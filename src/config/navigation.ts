/**
 * Navigation Configuration
 * Defines header and footer navigation menus in a single decoupled location.
 */
export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const MAIN_NAV_ITEMS: NavItem[] = [
  { label: 'Top stories', href: '/#top' },
  { label: 'Latest', href: '/#latest' },
  { label: 'About', href: '/about' },
];

export const FOOTER_NAV_CONFIG = {
  siteLinks: [
    { label: 'About', href: '/about' },
    { label: 'Write for us', href: '/about' },
    { label: 'Contact', href: '/about' },
    { label: 'Newsletter feed', href: '/#subscribe' },
  ],
  legalLinks: [
    { label: 'Privacy policy', href: '/privacy' },
    { label: 'Terms of use', href: '/terms' },
    { label: 'Editorial standards', href: '/about' },
  ],
};
