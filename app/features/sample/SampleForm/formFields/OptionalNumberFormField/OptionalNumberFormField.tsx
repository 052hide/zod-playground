import type { ComponentProps } from 'react'
import type { FieldValues, Context, TransformedValues } from '../../type'

import { useFormContext } from 'react-hook-form'
import { formattedString, validatedNumberString } from '~/lib/zod/form'
import { FormFieldWrapper } from '~/components/FormFieldWrapper'
import { InputTextField } from '~/components/InputTextField'
import { FIELD_KEY, FIELD_NAME, NUMBER_STRING_SCHEMA } from './const'

export const OptionalNumberFormField = () => {
  const { formState, register, setValue } = useFormContext<
    FieldValues,
    Context,
    TransformedValues
  >()

  const { onBlur, ...registration } = register(FIELD_KEY)

  const handleFocus: ComponentProps<typeof InputTextField>['onFocus'] = (e) => {
    const x = validatedNumberString({
      event: e,
      fieldSchema: NUMBER_STRING_SCHEMA,
    })
    if (x) {
      setValue(FIELD_KEY, x)
    }
  }

  const handleBlur: ComponentProps<typeof InputTextField>['onBlur'] = (e) => {
    const x = formattedString({
      event: e,
      fieldSchema: NUMBER_STRING_SCHEMA,
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
