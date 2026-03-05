import type { PostMessageResponse } from '../types';

export function responseHandler(message: PostMessageResponse) {
  console.log('message is:', message);
}
