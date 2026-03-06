import type { IncomingMessageEvents } from '@src/common/constants';

export type LogMessagePayload = {
  type: typeof IncomingMessageEvents.LogMessage;
  payload: {
    log: string;
  };
};
