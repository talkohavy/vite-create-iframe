import LineOfCode from '@src/components/LineOfCode';
import Arrow from '@src/components/StoryTelling/Arrow';
import FlowStep from '@src/components/StoryTelling/FlowStep';
import MessageBox from '@src/components/StoryTelling/MessageBox';
import Scene from '@src/components/StoryTelling/Scene';
import { useLogMessageLogic } from './logic/useLogMessageLogic';

export default function LogMessage() {
  useLogMessageLogic();

  return (
    <div className='p-6 space-y-6'>
      <div>
        <h2 className='text-2xl font-bold mb-2'>Host → iframe: log in console</h2>

        <p className='text-gray-600 dark:text-gray-400'>
          The host page sends a <LineOfCode text='postMessage' /> with a payload. The iframe listens with{' '}
          <LineOfCode text="window.addEventListener('message', ...)" /> and logs the message to the console. Useful for
          debugging, logging, or one-way notifications.
        </p>
      </div>

      <Scene badge='Flow' title='Host sends, iframe logs'>
        <FlowStep
          label='1. Host sends postMessage'
          detail={
            <>
              Host calls{' '}
              <LineOfCode text='iframeRef.contentWindow.postMessage({ type: "log-message", payload: { log: "Hello from host" } }, targetOrigin)' />
            </>
          }
          variant='default'
        />

        <Arrow />

        <FlowStep
          label='2. Iframe receives message'
          detail='Iframe message handler receives the event; it checks event.data.type and runs the handler for "log-message".'
          variant='default'
        />

        <Arrow />

        <FlowStep
          label='3. Iframe logs to console'
          detail={
            <>
              Handler runs <LineOfCode text='console.log(event.data.payload.log)' />. Open DevTools (F12) and trigger
              the message from the host to see it.
            </>
          }
          variant='success'
        />
      </Scene>

      <MessageBox title='When to use'>
        One-way logging or notifications from host to iframe: analytics events, debug output, or simple “host did
        something” signals without needing a response.
      </MessageBox>
    </div>
  );
}
