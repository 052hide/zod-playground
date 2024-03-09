import type { MetaFunction } from '@remix-run/node'

import { WithQueryString } from '~/features/queryString/WithQueryString'

export const meta: MetaFunction = () => {
  return [{ title: 'Query String Page' }]
}

export default function Index() {
  return (
    <div className={'tw-flex tw-justify-center'}>
      <div className={'tw-w-full tw-max-w-[640px]'}>
        <WithQueryString />
      </div>
    </div>
  )
}
