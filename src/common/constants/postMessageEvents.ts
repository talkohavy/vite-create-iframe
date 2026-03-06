export const IncomingMessageEvents = {
  GetHostOrigin: 'get-host-origin',
  LogMessage: 'log-message',
  HelloFromHost: 'say-hi',
} as const;

export type IncomingMessageEventValues = (typeof IncomingMessageEvents)[keyof typeof IncomingMessageEvents];

export const PostMessageEvents = {
  RequestHostOrigin: 'request-origin',
} as const;

export type PostMessageEventValues = (typeof PostMessageEvents)[keyof typeof PostMessageEvents];
