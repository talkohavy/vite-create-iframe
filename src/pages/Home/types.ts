import type { IncomingMessageEvents } from '../../common/constants';

export type GetHostOriginPayload = {
  type: typeof IncomingMessageEvents.GetHostOrigin;
  payload: {
    origin: string;
  };
};

export type LogMessagePayload = {
  type: typeof IncomingMessageEvents.LogMessage;
  payload: {
    log: string;
  };
};

export type HelloFromHostPayload = {
  type: typeof IncomingMessageEvents.HelloFromHost;
  payload: {
    message: string;
  };
};
