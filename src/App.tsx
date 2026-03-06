import type { ComponentType, ReactNode } from 'react';
import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import { BASE_URL } from '@src/common/constants';
import Main from './components/Main';
import PageNotFound from './pages/PageNotFound';
import { routes } from './routes';

const redirectRoute = routes[0]!;
const homeRoute = routes[1]!;
const HomePage = homeRoute.Component as ComponentType<{ children?: ReactNode }>;

export default function App() {
  return (
    <Main>
      <Suspense>
        <Switch>
          <Route exact path={redirectRoute.to} component={redirectRoute.Component} />
          {homeRoute.children?.length ? (
            <Route
              path={`${BASE_URL}/home`}
              render={({ match }) => (
                <HomePage>
                  <Switch>
                    {homeRoute.children!.map((child, i) => (
                      <Route
                        key={i}
                        exact={child.to === ''}
                        path={child.to === '' ? match.path : `${match.path}/${child.to}`}
                        component={child.Component}
                      />
                    ))}
                  </Switch>
                </HomePage>
              )}
            />
          ) : null}
          <Route component={PageNotFound} />
        </Switch>
      </Suspense>
    </Main>
  );
}
