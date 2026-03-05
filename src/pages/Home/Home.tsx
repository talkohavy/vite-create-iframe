import { useCallback, useEffect, useMemo, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { BASE_URL, IncomingMessageEvents } from '../../common/constants';
import RadioTabs from '../../components/controls/RadioTabs';
import { useCommunicationWithHost } from '../../hooks/useCommunicationWithHost';
import { getInitialTabValue } from './logic/utils/getInitialValue';
import type { GetHostOriginPayload, PrintMessagePayload } from './types';

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

  useEffect(() => {
    const message = {
      type: 'request-origin',
      payload: { hello: 'world' },
    };
    window.parent.postMessage(message, '*');
  }, []);

  const [hostOrigin, setHostOrigin] = useState('unknown');

  const getHostOriginHandler = useCallback((eventMessage: GetHostOriginPayload) => {
    setHostOrigin(eventMessage.payload.origin as string);
  }, []);

  const printMessageHandler = useCallback((eventMessage: PrintMessagePayload) => {
    console.log('message is:', eventMessage.payload.message);
  }, []);

  const incomingMessageHandlers = useMemo(() => {
    return {
      [IncomingMessageEvents.GetHostOrigin]: getHostOriginHandler,
      [IncomingMessageEvents.PrintMessage]: printMessageHandler,
    };
  }, [getHostOriginHandler, printMessageHandler]);

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
      </div>
    </div>
  );
}
