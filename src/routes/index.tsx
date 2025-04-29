import { lazy } from 'react';
import { Navigate, Route, Routes as RouteContainer } from 'react-router-dom';
import { WithGuard } from '../guards';
import { AuthGuard } from '../guards/AuthGuard';
import { NonLoginGuard } from '../guards/NonLoginGuard';
import { BaseLayout, MainLayout } from '../layouts';
import IndexPage from '../pages';
import AuthPage from '../pages/auth/AuthPage';
import ForbiddenPage from '../pages/errors/ForbiddenPage';
import NotFoundPage from '../pages/errors/NotFoundPage';
import { PageURLs, withPrefix } from '../utils/navigate';

const HomePage = lazy(() => import('../pages/home/HomePage'));
const SearchPage = lazy(() => import('../pages/search/SearchPage'));
const SearchResultPage = lazy(() => import('../pages/search/SearchResultPage'));

export default function Routes() {
  return (
    <RouteContainer>
      <Route path={withPrefix('')} Component={BaseLayout}>
        <Route
          path={PageURLs.ofIndex()}
          element={<WithGuard Page={IndexPage} Guard={AuthGuard} />}
        />
        <Route
          path={PageURLs.ofAuth()}
          element={<WithGuard Page={AuthPage} Guard={NonLoginGuard} />}
        />
        <Route path={PageURLs.of404()} Component={NotFoundPage} />
      </Route>
      <Route path={withPrefix('')} Component={MainLayout}>
        <Route
          path={PageURLs.ofHome()}
          element={<WithGuard Page={HomePage} Guard={NonLoginGuard} />}
        />
        <Route
          path={PageURLs.ofSearch()}
          element={<WithGuard Page={SearchPage} Guard={AuthGuard} />}
        />
        <Route
          path={PageURLs.ofSearchResult()}
          element={<WithGuard Page={SearchResultPage} Guard={AuthGuard} />}
        />
      </Route>

      <Route path={PageURLs.of403()} element={<ForbiddenPage />} />
      <Route path='*' element={<Navigate to={PageURLs.of404()} replace />} />
    </RouteContainer>
  );
}
