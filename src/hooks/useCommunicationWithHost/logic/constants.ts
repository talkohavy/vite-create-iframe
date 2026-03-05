export const PostMessageTypes = {
  Response: 'response',
} as const;

export type PostMessageTypeValues = (typeof PostMessageTypes)[keyof typeof PostMessageTypes];
