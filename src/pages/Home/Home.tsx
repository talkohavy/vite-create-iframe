import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';
import { BASE_URL } from '@src/common/constants';
import RadioTabs from '@src/components/controls/RadioTabs';
import { getInitialTabValue } from './logic/utils/getInitialValue';

const Tabs = {
  LogMessage: '',
  RenderMessage: 'render-message',
  HostOriginLink: 'host-origin-link',
  RequestResponse: 'request-response',
  HostTheme: 'host-theme',
} as const;

const tabOptions = [
  { value: Tabs.LogMessage, label: 'Log message' },
  { value: Tabs.RenderMessage, label: 'Render message' },
  { value: Tabs.HostOriginLink, label: 'Host origin & Link' },
  { value: Tabs.RequestResponse, label: 'Request-response' },
  { value: Tabs.HostTheme, label: 'Host theme' },
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
      </div>
    </div>
  );
}
