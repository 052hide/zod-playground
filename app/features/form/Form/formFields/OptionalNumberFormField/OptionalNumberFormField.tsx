import { useFormContext } from 'react-hook-form'

import type { I, C, O } from '../../type'
import type { ComponentProps } from 'react'

import { FormFieldWrapper } from '~/components/FormFieldWrapper'
import { InputTextField } from '~/components/InputTextField'
import {
  parseNumberStringWithValidation,
  parseValidNumberStringWithValidation,
} from '~/utils/form'

import {
  FIELD_KEY,
  FIELD_NAME,
  TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA,
} from './const'

export const OptionalNumberFormField = () => {
  const { formState, register, setValue } = useFormContext<I, C, O>()

  const { onBlur, ...registration } = register(FIELD_KEY)

  const handleFocus: ComponentProps<typeof InputTextField>['onFocus'] = (e) => {
    const x = parseValidNumberStringWithValidation({
      v: e.target.value,
      fieldSchema: TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA,
    })
    if (x) {
      setValue(FIELD_KEY, x)
    }
  }

  const handleBlur: ComponentProps<typeof InputTextField>['onBlur'] = (e) => {
    const x = parseNumberStringWithValidation({
      v: e.target.value,
      fieldSchema: TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA,
    })
    if (x) {
      setValue(FIELD_KEY, x)
    }

    onBlur(e)
  }

  return (
    <FormFieldWrapper
      label={FIELD_NAME}
      inputNode={
        <InputTextField
          {...registration}
          inputMode={'numeric'}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      }
      errorMessage={formState.errors[FIELD_KEY]?.message}
    />
  )
}
