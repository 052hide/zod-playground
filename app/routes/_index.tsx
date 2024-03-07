import type { MetaFunction } from '@remix-run/node'
import { SampleForm } from '~/features/sample/SampleForm'

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ]
}

export default function Index() {
  return (
    <div className={'tw-flex tw-justify-center'}>
      <div className={'tw-w-full tw-max-w-[640px]'}>
        <SampleForm />
      </div>
    </div>
  )
}
