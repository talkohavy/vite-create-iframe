import type { IncomingMessageEvents } from '@src/common/constants';

export type HelloFromHostPayload = {
  type: typeof IncomingMessageEvents.HelloFromHost;
  payload: {
    message: string;
  };
};
