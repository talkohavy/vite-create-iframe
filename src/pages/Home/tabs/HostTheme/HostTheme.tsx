import LineOfCode from '@src/components/LineOfCode';
import Arrow from '@src/components/StoryTelling/Arrow';
import FlowStep from '@src/components/StoryTelling/FlowStep';
import MessageBox from '@src/components/StoryTelling/MessageBox';
import Scene from '@src/components/StoryTelling/Scene';
import { useHostThemeLogic } from './logic/useHostThemeLogic';

export default function HostTheme() {
  useHostThemeLogic();

  return (
    <div className='flex flex-col gap-4 p-6'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-bold'>Host sends theme → iframe updates body class</h2>

        <p className='text-gray-600 dark:text-gray-400'>
          The host sends its current theme state (<LineOfCode text='isDarkMode' className='text-xs' />) via{' '}
          <LineOfCode text='postMessage' className='text-xs' />. The iframe toggles the "dark" class on the body using{' '}
          <LineOfCode text="document.body.classList.toggle('dark', isDarkMode);" className='text-xs' />, so that the
          iframe app matches the host's appearance.
        </p>
      </div>

      <Scene badge='Flow' title='Host sends theme, iframe updates body'>
        <FlowStep
          label='1. Host sends theme'
          detail={
            <>
              Host calls{' '}
              <LineOfCode text='iframeRef.contentWindow.postMessage({ type: "get-host-theme", payload: { isDarkMode: true } }, targetOrigin)' />
              .
            </>
          }
          variant='default'
        />

        <Arrow />

        <FlowStep
          label='2. Iframe receives and updates body'
          detail={
            <>
              Message handler reads <LineOfCode text='event.data.payload.isDarkMode' /> and sets{' '}
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
        When the iframe should follow the host's light/dark mode without implementing its own theme toggle. The host
        owns the theme; the iframe stays in sync by updating the body class on each theme message.
      </MessageBox>
    </div>
  );
}
