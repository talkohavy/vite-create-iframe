import type { IncomingMessageEvents } from '@src/common/constants';

export type GetHostOriginPayload = {
  type: typeof IncomingMessageEvents.GetHostOrigin;
  payload: {
    origin: string;
  };
};
