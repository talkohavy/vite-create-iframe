import { useCallback, useMemo } from 'react';
import { IncomingMessageEvents } from '@src/common/constants';
import { useCommunicationWithHost } from '@src/hooks/useCommunicationWithHost';
import type { LogMessagePayload } from '../types';

export function useLogMessageLogic() {
  const logMessageHandler = useCallback((eventMessage: LogMessagePayload) => {
    console.log('log message is:', eventMessage.payload.log);
  }, []);

  const incomingMessageHandlers = useMemo(() => {
    return {
      [IncomingMessageEvents.LogMessage]: logMessageHandler,
    };
  }, [logMessageHandler]);

  useCommunicationWithHost({ incomingMessageHandlers });

  return null;
}
