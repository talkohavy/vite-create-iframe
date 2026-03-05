import { useEffect } from 'react';
import { allMessageHandlers } from './handlers';
import { isValidMessage } from './logic/utils/isValidMessage';
import type { PostMessageRequest } from './types';

const MESSAGE_EVENT = 'message';

export function useCommunicationWithHost() {
  useEffect(() => {
    function handleIncomingMessageFromHost(eventMessage: MessageEvent<PostMessageRequest>) {
      const { data: message, origin: eventOrigin } = eventMessage;
      const messageType = message.type;

      // Reject 1: Invalid message
      if (!isValidMessage(message)) return;

      const messageHandler = allMessageHandlers[messageType];

      if (!messageHandler) return;

      const response = messageHandler(message);

      // Respond back to iframe if a response exists
      if (response) {
        window.parent?.postMessage(response, eventOrigin);
      }
    }

    window.addEventListener(MESSAGE_EVENT, handleIncomingMessageFromHost);

    return () => window.removeEventListener(MESSAGE_EVENT, handleIncomingMessageFromHost);
  }, []);
}
