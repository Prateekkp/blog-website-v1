import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout/Layout';
import { Skeleton } from './components/Skeleton/Skeleton';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { APP_ROUTES } from './config/routes';

const PageLoader: React.FC = () => (
  <div className="band" style={{ padding: '3rem 0' }}>
    <Skeleton count={4} />
  </div>
);

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              {APP_ROUTES.map((route) => {
                const Component = route.component;
                return (
                  <Route
                    key={route.path}
                    path={route.path}
                    element={<Component />}
                  />
                );
              })}
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
