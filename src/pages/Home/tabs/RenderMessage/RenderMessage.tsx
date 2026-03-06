import LineOfCode from '@src/components/LineOfCode';
import Arrow from '@src/components/StoryTelling/Arrow';
import FlowStep from '@src/components/StoryTelling/FlowStep';
import MessageBox from '@src/components/StoryTelling/MessageBox';
import Scene from '@src/components/StoryTelling/Scene';
import { useRenderMessageLogic } from './logic/useRenderMessageLogic';

export default function RenderMessage() {
  const { helloMessage } = useRenderMessageLogic();

  return (
    <div className='p-6 space-y-6'>
      <div>
        <h2 className='text-2xl font-bold mb-2'>Host → iframe: render on screen</h2>

        <p className='text-gray-600 dark:text-gray-400'>
          Same as logging, but the iframe stores the message in state and renders it in the UI. The host can push
          content (e.g. labels, titles, or dynamic text) into the iframe without a full navigation.
        </p>
      </div>

      <Scene badge='Flow' title='Host sends, iframe renders'>
        <FlowStep
          label='1. Host sends postMessage'
          detail={
            <>
              Host sends <LineOfCode text='{ type: "say-hi", payload: { message: "Welcome!" } }' /> (or any string) to
              the iframe.
            </>
          }
          variant='default'
        />

        <Arrow />

        <FlowStep
          label='2. Iframe receives and updates state'
          detail={
            <>
              Message handler reads <LineOfCode text='event.data.payload.message' /> and calls{' '}
              <LineOfCode text='setState(message)' />.
            </>
          }
          variant='default'
        />

        <Arrow />

        <FlowStep
          label='3. Iframe re-renders with new content'
          detail='React re-renders; the message is shown in the UI (e.g. “Rendered message from host: Welcome!”).'
          variant='success'
        />
      </Scene>

      <MessageBox title='When to use'>
        Let the host control visible content inside the iframe: headings, labels, banners, or any text the iframe should
        display without implementing its own data fetching.
      </MessageBox>

      {helloMessage && (
        <div className='text-sm text-gray-500 p-4 border-t border-gray-200 dark:border-gray-600'>
          Rendered message from host: <strong>{helloMessage}</strong>
        </div>
      )}
    </div>
  );
}
