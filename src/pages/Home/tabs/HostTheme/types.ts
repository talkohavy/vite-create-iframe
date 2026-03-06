import type { IncomingMessageEvents } from '@src/common/constants';

export type GetHostThemePayload = {
  type: typeof IncomingMessageEvents.GetHostTheme;
  payload: {
    isDarkMode: boolean;
  };
};
