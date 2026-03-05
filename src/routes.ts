import { lazy } from 'react';
import { BASE_URL } from './common/constants';
import type { Route } from './common/types';

// Main pages
const RedirectToHome = lazy(() => import('./pages/RedirectToHome'));
const HomePage = lazy(() => import('./pages/Home'));

// Home tabs:
const OverviewTab = lazy(() => import('./pages/Home/tabs/Overview'));
const AnalyticsTab = lazy(() => import('./pages/Home/tabs/Analytics'));
const SettingsTab = lazy(() => import('./pages/Home/tabs/Settings'));

export const routes: Array<Route> = [
  {
    to: '/',
    hideFromSidebar: true,
    Component: RedirectToHome,
  } as Route,
  {
    to: `${BASE_URL}/home`,
    text: 'Home',
    activeNames: [BASE_URL, `${BASE_URL}/home/`, `${BASE_URL}/home/analytics`, `${BASE_URL}/home/settings`],
    Component: HomePage,
    children: [
      {
        to: '',
        text: 'Overview',
        activeNames: [],
        Component: OverviewTab,
      },
      {
        to: 'analytics',
        text: 'Analytics',
        activeNames: [],
        Component: AnalyticsTab,
      },
      {
        to: 'settings',
        text: 'Settings',
        activeNames: [],
        Component: SettingsTab,
      },
    ],
  },
];
