import { Link } from 'react-router-dom';
import LineOfCode from '@src/components/LineOfCode';
import Arrow from '@src/components/StoryTelling/Arrow';
import FlowStep from '@src/components/StoryTelling/FlowStep';
import MessageBox from '@src/components/StoryTelling/MessageBox';
import Scene from '@src/components/StoryTelling/Scene';
import { useHostOriginLinkLogic } from './logic/useHostOriginLinkLogic';

export default function HostOriginLink() {
  const { hostOrigin } = useHostOriginLinkLogic();

  return (
    <div className='flex flex-col gap-4 p-6'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-2xl font-bold'>Host sends origin → iframe uses it in a Link</h2>

        <p className='text-gray-600 dark:text-gray-400'>
          The host sends its origin (e.g. <LineOfCode text='https://app.example.com' />) to the iframe. The iframe
          stores it and uses it in a <LineOfCode text='Link' /> or <LineOfCode text='<a href={...}>' /> so “Open in
          host” or “Back to app” links point to the correct host URL.
        </p>
      </div>

      <Scene badge='Flow' title='Host sends origin, iframe stores and links'>
        <FlowStep
          label='1. Host sends its origin'
          detail={
            <>
              Host posts <LineOfCode text='{ type: "get-host-origin", payload: { origin: window.location.origin } }' />{' '}
              so the iframe knows the host URL.
            </>
          }
          variant='default'
        />

        <Arrow />

        <FlowStep
          label='2. Iframe stores origin in state'
          detail={
            <>
              Iframe handler saves <LineOfCode text='payload.origin' /> (e.g.{' '}
              <LineOfCode text='setHostOrigin(origin)' />) so it can be used in links.
            </>
          }
          variant='default'
        />

        <Arrow />

        <FlowStep
          label='3. Iframe uses origin in a Link'
          detail={
            <>
              Render <LineOfCode text='<Link to={`${hostOrigin}/base/some-path`} target="_blank">' /> so users can open
              the host app at the right URL.
            </>
          }
          variant='success'
        />
      </Scene>

      <MessageBox title='When to use'>
        The iframe needs to link back to the host (e.g. “Open in main app”, “View on site”) without hardcoding the host
        URL. The host tells the iframe its origin once; the iframe reuses it for navigation.
      </MessageBox>

      <div className='flex flex-col gap-2 p-4 border-t border-gray-200 dark:border-gray-600'>
        <div className='text-sm text-gray-500'>Host origin: {hostOrigin}</div>

        <div className='flex items-center gap-2'>
          <Link to={`${hostOrigin}/base/svg-imports`} target='_blank' className='text-blue-500 hover:underline'>
            Open "{hostOrigin}/base/svg-imports" in new tab
          </Link>
        </div>
      </div>
    </div>
  );
}
