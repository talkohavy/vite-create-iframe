import { useCallback, useMemo, useState } from 'react';
import { IncomingMessageEvents } from '@src/common/constants';
import { useCommunicationWithHost } from '@src/hooks/useCommunicationWithHost';
import type { HelloFromHostPayload } from '../types';

export function useRenderMessageLogic() {
  const [helloMessage, setHelloMessage] = useState('');

  const helloFromHostHandler = useCallback((eventMessage: HelloFromHostPayload) => {
    setHelloMessage(eventMessage.payload.message);
  }, []);

  const incomingMessageHandlers = useMemo(() => {
    return {
      [IncomingMessageEvents.HelloFromHost]: helloFromHostHandler,
    };
  }, [helloFromHostHandler]);

  useCommunicationWithHost({ incomingMessageHandlers });

  return { helloMessage };
}
