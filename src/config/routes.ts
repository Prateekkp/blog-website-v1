import React, { lazy } from 'react';

/**
 * Dynamic Route Registry
 * Allows any engineering team to add or modify routes in a single isolated config
 * without modifying App.tsx or core layout wrappers.
 */
export interface RouteConfig {
  path: string;
  component: React.ComponentType;
  title?: string;
}

// Primary landing route is eagerly loaded for instantaneous first paint
import { Home } from '../pages/Home/Home';

// Secondary routes remain code-split
const Article = lazy(() => import('../pages/Article/Article'));
const Topic = lazy(() => import('../pages/Topic/Topic'));
const About = lazy(() => import('../pages/About/About'));
const Privacy = lazy(() => import('../pages/Privacy/Privacy'));
const Terms = lazy(() => import('../pages/Terms/Terms'));
const NotFound = lazy(() => import('../pages/NotFound/NotFound'));

export const APP_ROUTES: RouteConfig[] = [
  { path: '/', component: Home },
  { path: '/post/:slug', component: Article },
  { path: '/topic/:slug', component: Topic },
  { path: '/about', component: About },
  { path: '/privacy', component: Privacy },
  { path: '/terms', component: Terms },
  { path: '*', component: NotFound },
];

export default APP_ROUTES;
