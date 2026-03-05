import type { IncomingMessageEvents } from '../../common/constants';

export type GetHostOriginPayload = {
  type: typeof IncomingMessageEvents.GetHostOrigin;
  payload: {
    origin: string;
  };
};

export type PrintMessagePayload = {
  type: typeof IncomingMessageEvents.PrintMessage;
  payload: {
    message: string;
  };
};
