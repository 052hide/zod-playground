import type { MetaFunction } from '@remix-run/node'

import { Form } from '~/features/form/Form'

export const meta: MetaFunction = () => {
  return [{ title: 'Form Page' }]
}

export default function Index() {
  return (
    <div className={'tw-flex tw-justify-center'}>
      <div className={'tw-w-full tw-max-w-[640px]'}>
        <Form />
      </div>
    </div>
  )
}
