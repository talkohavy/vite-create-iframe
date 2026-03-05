export const IncomingMessageEvents = {
  GetHostOrigin: 'get-host-origin',
  PrintMessage: 'print-message',
} as const;

export type IncomingMessageEventValues = (typeof IncomingMessageEvents)[keyof typeof IncomingMessageEvents];
