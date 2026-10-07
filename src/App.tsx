import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout/Layout';
import { Skeleton } from './components/Skeleton/Skeleton';

// Code-split routes with React.lazy
const Home = lazy(() => import('./pages/Home/Home'));
const Article = lazy(() => import('./pages/Article/Article'));
const Topic = lazy(() => import('./pages/Topic/Topic'));
const About = lazy(() => import('./pages/About/About'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

const PageLoader: React.FC = () => (
  <div className="band" style={{ padding: '3rem 0' }}>
    <Skeleton count={4} />
  </div>
);

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/post/:slug" element={<Article />} />
              <Route path="/topic/:slug" element={<Topic />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
