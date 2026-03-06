import { useCallback, useState } from 'react';
import { IncomingMessageEvents, PostMessageEvents } from '@src/common/constants';
import { useCommunicationWithHost } from '@src/hooks/useCommunicationWithHost';
import type { GetHostOriginPayload } from '../../HostOriginLink/types';

export function useRequestResponseLogic() {
  const [hostOrigin, setHostOrigin] = useState('');

  const getHostOriginHandler = useCallback((eventMessage: GetHostOriginPayload) => {
    setHostOrigin(eventMessage.payload.origin);
  }, []);

  useCommunicationWithHost({
    incomingMessageHandlers: { [IncomingMessageEvents.GetHostOrigin]: getHostOriginHandler },
  });

  const requestHostOrigin = useCallback(() => {
    const message = {
      type: PostMessageEvents.RequestHostOrigin,
    };

    window.parent.postMessage(message, '*');
  }, []);

  // Request host origin on-mount
  // useEffect(() => {
  //   requestHostOrigin();
  // }, [requestHostOrigin]);

  return { hostOrigin, requestHostOrigin };
}
