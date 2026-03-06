import { lazy } from 'react';
import { BASE_URL } from './common/constants';
import type { Route } from './common/types';

// Main pages
const RedirectToHome = lazy(() => import('./pages/RedirectToHome'));
const HomePage = lazy(() => import('./pages/Home'));

// Home tabs (postMessage tutorials)
const LogMessageTab = lazy(() => import('./pages/Home/tabs/LogMessage'));
const RenderMessageTab = lazy(() => import('./pages/Home/tabs/RenderMessage'));
const HostOriginLinkTab = lazy(() => import('./pages/Home/tabs/HostOriginLink'));
const RequestResponseTab = lazy(() => import('./pages/Home/tabs/RequestResponse'));

export const routes: Array<Route> = [
  {
    to: '/',
    hideFromSidebar: true,
    Component: RedirectToHome,
  } as Route,
  {
    to: `${BASE_URL}/home`,
    text: 'Home',
    activeNames: [
      BASE_URL,
      `${BASE_URL}/home/`,
      `${BASE_URL}/home/log-message`,
      `${BASE_URL}/home/render-message`,
      `${BASE_URL}/home/host-origin-link`,
      `${BASE_URL}/home/request-response`,
    ],
    Component: HomePage,
    children: [
      {
        to: '',
        text: 'Log message',
        activeNames: [],
        Component: LogMessageTab,
      },
      {
        to: 'render-message',
        text: 'Render message',
        activeNames: [],
        Component: RenderMessageTab,
      },
      {
        to: 'host-origin-link',
        text: 'Host origin & Link',
        activeNames: [],
        Component: HostOriginLinkTab,
      },
      {
        to: 'request-response',
        text: 'Request-response',
        activeNames: [],
        Component: RequestResponseTab,
      },
    ],
  },
];
