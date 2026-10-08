import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Layout } from './components/Layout/Layout';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { APP_ROUTES } from './config/routes';

const PageLoader: React.FC = () => (
  <div
    className="band"
    style={{
      minHeight: '40vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <div
      style={{
        width: '28px',
        height: '28px',
        border: '3px solid var(--line)',
        borderTopColor: 'var(--blood)',
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
      }}
    />
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
