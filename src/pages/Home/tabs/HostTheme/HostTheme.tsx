import LineOfCode from '@src/components/LineOfCode';
import Arrow from '@src/components/StoryTelling/Arrow';
import FlowStep from '@src/components/StoryTelling/FlowStep';
import MessageBox from '@src/components/StoryTelling/MessageBox';
import Scene from '@src/components/StoryTelling/Scene';
import { useHostThemeLogic } from './logic/useHostThemeLogic';

export default function HostTheme() {
  useHostThemeLogic();

  return (
    <div className='p-6 space-y-6'>
      <div>
        <h2 className='text-2xl font-bold mb-2'>Host sends theme → iframe updates body class</h2>

        <p className='text-gray-600 dark:text-gray-400'>
          The host sends its current theme (<LineOfCode text='"light"' /> or <LineOfCode text='"dark"' />) via{' '}
          <LineOfCode text='postMessage' />. The iframe sets <LineOfCode text='document.body.className' /> to that value
          so the embedded app matches the host’s appearance (e.g. Tailwind’s <LineOfCode text='class="dark"' /> or{' '}
          <LineOfCode text='class="light"' />
          ).
        </p>
      </div>

      <Scene badge='Flow' title='Host sends theme, iframe updates body'>
        <FlowStep
          label='1. Host sends theme'
          detail={
            <>
              Host calls{' '}
              <LineOfCode text='iframeRef.contentWindow.postMessage({ type: "set-theme", payload: { theme: "dark" } }, targetOrigin)' />{' '}
              (or <LineOfCode text='"light"' />
              ).
            </>
          }
          variant='default'
        />

        <Arrow />

        <FlowStep
          label='2. Iframe receives and updates body'
          detail={
            <>
              Message handler reads <LineOfCode text='event.data.payload.theme' /> and sets{' '}
              <LineOfCode text='document.body.className = theme' />.
            </>
          }
          variant='default'
        />

        <Arrow />

        <FlowStep
          label='3. UI reflows with new theme'
          detail='Styles that depend on body class (e.g. Tailwind dark: variants) apply immediately, so the iframe matches the host.'
          variant='success'
        />
      </Scene>

      <MessageBox title='When to use'>
        When the iframe should follow the host’s light/dark mode without implementing its own theme toggle. The host
        owns the theme; the iframe stays in sync by updating the body class on each theme message.
      </MessageBox>
    </div>
  );
}
