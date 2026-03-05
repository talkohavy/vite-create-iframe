import { PostMessageTypes, type PostMessageTypeValues } from '../logic/constants';
import { responseHandler } from './responseHandler';

export const allMessageHandlers: Record<PostMessageTypeValues, (props: any) => any> = {
  [PostMessageTypes.Response]: responseHandler,
};
