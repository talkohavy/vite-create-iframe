import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { BASE_URL, IncomingMessageEvents, PostMessageEvents } from '@src/common/constants';
import RadioTabs from '@src/components/controls/RadioTabs';
import { useCommunicationWithHost } from '@src/hooks/useCommunicationWithHost';
import { getInitialTabValue } from './logic/utils/getInitialValue';
import type { GetHostOriginPayload, HelloFromHostPayload, LogMessagePayload } from './types';

const Tabs = {
  Overview: '',
  Analytics: 'analytics',
  Settings: 'settings',
} as const;

const tabOptions = [
  {
    value: Tabs.Overview,
    label: 'Overview',
  },
  {
    value: Tabs.Analytics,
    label: 'Analytics',
  },
  {
    value: Tabs.Settings,
    label: 'Settings',
  },
];

export default function Home() {
  const navigate = useNavigate();
  const location = useLocation();

  const [currentTabValue, setCurrentTabValue] = useState(getInitialTabValue);
  const [helloMessage, setHelloMessage] = useState('');

  // Update currentTabValue when the URL changes (e.g., browser back/forward)
  useEffect(() => {
    const newTabValue = getInitialTabValue();
    setCurrentTabValue(newTabValue);
  }, [location.pathname]);

  function handleTabChange(tabValue: string) {
    setCurrentTabValue(tabValue);

    const targetPath = `${BASE_URL}/home/${tabValue}`;
    navigate(targetPath);
  }

  const requestHostOrigin = useCallback(() => {
    const message = {
      type: PostMessageEvents.RequestHostOrigin,
    };

    window.parent.postMessage(message, '*');
  }, []);

  useEffect(() => {
    requestHostOrigin();
  }, [requestHostOrigin]);

  const [hostOrigin, setHostOrigin] = useState('unknown');

  const getHostOriginHandler = useCallback((eventMessage: GetHostOriginPayload) => {
    setHostOrigin(eventMessage.payload.origin as string);
  }, []);

  const logMessageHandler = useCallback((eventMessage: LogMessagePayload) => {
    console.log('log message is:', eventMessage.payload.log);
  }, []);

  const helloFromHostHandler = useCallback((eventMessage: HelloFromHostPayload) => {
    setHelloMessage(eventMessage.payload.message);
  }, []);

  const incomingMessageHandlers = useMemo(() => {
    return {
      [IncomingMessageEvents.GetHostOrigin]: getHostOriginHandler,
      [IncomingMessageEvents.LogMessage]: logMessageHandler,
      [IncomingMessageEvents.HelloFromHost]: helloFromHostHandler,
    };
  }, [getHostOriginHandler, logMessageHandler, helloFromHostHandler]);

  useCommunicationWithHost({ incomingMessageHandlers });

  return (
    <div className='size-full flex flex-col gap-6 overflow-auto'>
      <div className='border-b border-gray-200 dark:border-gray-600 px-6 pt-6'>
        <RadioTabs
          value={currentTabValue}
          setValue={handleTabChange}
          options={tabOptions}
          className='flex space-x-1 mb-4'
        />
      </div>

      <div className='size-full'>
        <Outlet />

        <div className='text-sm text-gray-500 p-6'>Host origin: {hostOrigin}</div>
        {helloMessage && <div className='text-sm text-gray-500 p-6'>Hello message: {helloMessage}</div>}
      </div>
    </div>
  );
}
