import Button from '@src/components/controls/Button';
import LineOfCode from '@src/components/LineOfCode';
import Arrow from '@src/components/StoryTelling/Arrow';
import FlowStep from '@src/components/StoryTelling/FlowStep';
import MessageBox from '@src/components/StoryTelling/MessageBox';
import Scene from '@src/components/StoryTelling/Scene';
import { useRequestResponseLogic } from './logic/useRequestResponseLogic';

export default function RequestResponse() {
  const { hostOrigin, requestHostOrigin } = useRequestResponseLogic();

  return (
    <div className='flex flex-col gap-4 p-6'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-bold'>Request-response: iframe asks, host replies</h2>

        <p className='text-gray-600 dark:text-gray-400'>
          The iframe sends a request (e.g. <LineOfCode text='request-origin' />) via{' '}
          <LineOfCode text='window.parent.postMessage' />. The host listens for that event and responds with another{' '}
          <LineOfCode text='postMessage' /> (e.g. with its origin). Optional: use a <LineOfCode text='requestId' /> to
          match responses to requests.
        </p>
      </div>

      <Scene badge='Flow' title='Iframe requests → host responds'>
        <FlowStep
          label='1. Iframe sends request'
          detail={
            <>
              Iframe calls <LineOfCode text='window.parent.postMessage({ type: "request-origin" }, "*")' />. It can
              include requestId for correlation.
            </>
          }
          variant='default'
        />

        <Arrow />

        <FlowStep
          label='2. Host receives and handles'
          detail={
            <>
              Host message listener sees type <LineOfCode text='"request-origin"' />, reads{' '}
              <LineOfCode text='window.location.origin' />, and prepares a response.
            </>
          }
          variant='default'
        />

        <Arrow />

        <FlowStep
          label='3. Host posts response to iframe'
          detail={
            <>
              Host calls{' '}
              <LineOfCode text='iframeRef.contentWindow.postMessage({ type: "get-host-origin", payload: { origin } }, event.origin)' />
              .
            </>
          }
          variant='default'
        />

        <Arrow />

        <FlowStep
          label='4. Iframe receives and uses response'
          detail={
            <>
              Iframe listener handles <LineOfCode text='"get-host-origin"' />, updates state with{' '}
              <LineOfCode text='payload.origin' />, and can use it in links or logic.
            </>
          }
          variant='success'
        />
      </Scene>

      <MessageBox title='When to use'>
        When the iframe needs data from the host on demand (e.g. origin, user id, feature flags). The iframe initiates;
        the host replies. Use requestId if you have multiple in-flight requests.
      </MessageBox>

      <div className='flex flex-col gap-2 p-4 border-t border-gray-200 dark:border-gray-600'>
        <div className='text-sm text-gray-500'>Host origin: {hostOrigin}</div>

        <Button onClick={requestHostOrigin} className='w-fit'>
          Request host origin
        </Button>
      </div>
    </div>
  );
}
