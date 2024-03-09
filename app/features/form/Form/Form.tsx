import type { I, C, O } from './type'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { InputSubmitButton } from '~/components/InputSubmitButton'
import { FORM_SCHEMA } from './const'
import { OptionalNumberFormField, RequiredNumberFormField } from './formFields'

export const Form = () => {
  const [submittedValue, setSubmittedValue] = useState<O | null>(null)

  const formMethods = useForm<I, C, O>({
    resolver: zodResolver(FORM_SCHEMA),
  })

  const submitHandler = (data: O) => {
    setSubmittedValue(data)
  }

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={formMethods.handleSubmit(submitHandler)}
        className={'tw-flex tw-flex-col tw-py-8'}
      >
        <div className={'tw-flex tw-flex-col tw-gap-4'}>
          <RequiredNumberFormField />
          <OptionalNumberFormField />
        </div>
        <div className={'tw-mt-6'}>
          <InputSubmitButton>{'Submit'}</InputSubmitButton>
        </div>
        {submittedValue && (
          <div className={'tw-mt-10'}>
            <pre className={'tw-bg-neutral-200 tw-p-4'}>
              {JSON.stringify(submittedValue, null, 2)}
            </pre>
          </div>
        )}
      </form>
    </FormProvider>
  )
}
