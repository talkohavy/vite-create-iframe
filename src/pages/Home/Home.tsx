import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
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

type HomeProps = {
  children?: ReactNode;
};

export default function Home({ children }: HomeProps) {
  const history = useHistory();
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
    history.push(targetPath);
  }

  return (
    <div className='size-full flex flex-col overflow-auto'>
      <div className='border-b border-gray-200 dark:border-gray-600 px-6 pt-6'>
        <RadioTabs
          value={currentTabValue}
          setValue={handleTabChange}
          options={tabOptions}
          className='flex space-x-1 mb-4'
        />
      </div>

      <div className='size-full'>{children}</div>
    </div>
  );
}
