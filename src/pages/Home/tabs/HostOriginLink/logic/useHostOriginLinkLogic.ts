import { useCallback, useState } from 'react';
import { IncomingMessageEvents } from '@src/common/constants';
import { useCommunicationWithHost } from '@src/hooks/useCommunicationWithHost';
import type { GetHostOriginPayload } from '../types';

export function useHostOriginLinkLogic() {
  const [hostOrigin, setHostOrigin] = useState('');

  const getHostOriginHandler = useCallback((eventMessage: GetHostOriginPayload) => {
    setHostOrigin(eventMessage.payload.origin);
  }, []);

  useCommunicationWithHost({
    incomingMessageHandlers: { [IncomingMessageEvents.GetHostOrigin]: getHostOriginHandler },
  });

  return { hostOrigin };
}
