import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => {
  return [{ title: 'Top Page' }]
}

export default function Index() {
  return (
    <div className={'tw-flex tw-justify-center'}>
      <div className={'tw-w-full tw-max-w-[640px]'}>
        <a href={'/sample_form'}>{'Sample Form'}</a>
        <a href={'/query_string'}>{'Query String'}</a>
      </div>
    </div>
  )
}
