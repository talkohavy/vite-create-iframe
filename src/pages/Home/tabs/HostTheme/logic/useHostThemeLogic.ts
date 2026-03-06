import { useCallback, useMemo } from 'react';
import { IncomingMessageEvents } from '@src/common/constants';
import { useCommunicationWithHost } from '@src/hooks/useCommunicationWithHost';
import type { GetHostThemePayload } from '../types';

export function useHostThemeLogic() {
  const getHostThemeHandler = useCallback((eventMessage: GetHostThemePayload) => {
    const { isDarkMode } = eventMessage.payload;

    document.body.classList.toggle('dark', isDarkMode);
  }, []);

  const incomingMessageHandlers = useMemo(
    () => ({
      [IncomingMessageEvents.GetHostTheme]: getHostThemeHandler,
    }),
    [getHostThemeHandler],
  );

  useCommunicationWithHost({ incomingMessageHandlers });
}
