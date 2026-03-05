import { lazy } from 'react';
import { BASE_URL } from './common/constants';
import type { Route } from './common/types';

// Main pages
const RedirectToHome = lazy(() => import('./pages/RedirectToHome'));
const HomePage = lazy(() => import('./pages/Home'));
const ServerCallPage = lazy(() => import('./pages/ServerCallPage'));
const TabCommunicationPage = lazy(() => import('./pages/TabCommunication'));
const GetCookiesPage = lazy(() => import('./pages/GetCookiesPage'));
const OutletTabsPage = lazy(() => import('./pages/OutletTabsPage'));
const MediaCaptureApiPage = lazy(() => import('./pages/MediaCaptureApiPage'));

// OutletTabsPage tabs:
const OverviewTab = lazy(() => import('./pages/OutletTabsPage/tabs/Overview'));
const AnalyticsTab = lazy(() => import('./pages/OutletTabsPage/tabs/Analytics'));
const SettingsTab = lazy(() => import('./pages/OutletTabsPage/tabs/Settings'));

export const routes: Array<Route> = [
  {
    to: '/',
    hideFromSidebar: true,
    Component: RedirectToHome,
  } as Route,
  {
    to: `${BASE_URL}/home`,
    text: 'Home',
    activeNames: [BASE_URL, `${BASE_URL}/home/`],
    Component: HomePage,
  },
  {
    to: `${BASE_URL}/server-call`,
    text: 'Server Call',
    activeNames: [`${BASE_URL}/server-call`],
    Component: ServerCallPage,
  },
  {
    to: `${BASE_URL}/tab-communication`,
    text: 'Tab Communication',
    activeNames: [`${BASE_URL}/tab-communication`],
    Component: TabCommunicationPage,
  },
  {
    to: `${BASE_URL}/get-cookies`,
    text: 'Get Cookies',
    activeNames: [`${BASE_URL}/get-cookies`],
    Component: GetCookiesPage,
  },
  {
    to: `${BASE_URL}/outlet`,
    text: 'Outlet Tabs',
    activeNames: [`${BASE_URL}/outlet/`, `${BASE_URL}/outlet/analytics`, `${BASE_URL}/outlet/settings`],
    Component: OutletTabsPage,
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
  {
    to: `${BASE_URL}/media-capture-api`,
    text: 'Media Capture API',
    activeNames: [`${BASE_URL}/media-capture-api`],
    Component: MediaCaptureApiPage,
  },
];
