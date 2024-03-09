import { type ZodType, z } from 'zod'
import { TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA } from '~/lib/zod/form/util'

export const parseValidNumberString = (value: string) => {
  return value
    .replace(/[０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    })
    .replaceAll(',', '')
    .trim()
}

export const parseNumberStringWithValidation = ({
  v,
  fieldSchema,
}: {
  v: string
  fieldSchema: ZodType<
    z.output<ReturnType<typeof TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA>>,
    z.ZodTypeDef,
    z.input<ReturnType<typeof TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA>>
  >
}) => {
  const safeParsed = fieldSchema.safeParse(v)

  if (safeParsed.success && !!safeParsed.data) {
    return safeParsed.data.toLocaleString()
  }
  return undefined
}

export const parseValidNumberStringWithValidation = ({
  v,
  fieldSchema,
}: {
  v: string
  fieldSchema: ZodType<
    z.output<ReturnType<typeof TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA>>,
    z.ZodTypeDef,
    z.input<ReturnType<typeof TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA>>
  >
}) => {
  const safeParsed = fieldSchema.safeParse(v)
  if (safeParsed.success && !!safeParsed.data) {
    return `${safeParsed.data}`
  }
  return undefined
}
