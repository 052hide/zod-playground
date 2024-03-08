import { z, ZodType } from 'zod'

import type { FocusEvent } from 'react'

export const REQUIRED_NUMBER_STRING_SCHEMA = ({
  fieldName,
  formatFn,
}: {
  fieldName: string
  formatFn: (v: string) => string
}) =>
  z
    .string({
      required_error: `${fieldName}は必須です`,
    })
    .min(1, `${fieldName}は必須です`)
    .transform((v) => {
      return Number(formatFn(v))
    })
    .refine(
      (v) => {
        return !isNaN(v)
      },
      {
        message: `${fieldName}は数値を入力してください`,
      }
    )

export const OPTIONAL_NUMBER_STRING_SCHEMA = ({
  fieldName,
  formatFn,
}: {
  fieldName: string
  formatFn: (v: string) => string
}) =>
  z
    .string({})
    .optional()
    .transform((v) => {
      if (!v) {
        return undefined
      }
      return Number(formatFn(v))
    })
    .refine(
      (v) => {
        if (v === undefined) {
          return true
        }

        return !isNaN(v)
      },
      {
        message: `${fieldName}は数値を入力してください`,
      }
    )

export const formattedString = ({
  event,
  fieldSchema,
}: {
  event: FocusEvent<HTMLInputElement, Element>
  fieldSchema: ZodType<
    z.output<ReturnType<typeof OPTIONAL_NUMBER_STRING_SCHEMA>>,
    z.ZodTypeDef,
    z.input<ReturnType<typeof OPTIONAL_NUMBER_STRING_SCHEMA>>
  >
}) => {
  const safeParsed = fieldSchema.safeParse(event.target.value)

  if (safeParsed.success && !!safeParsed.data) {
    return safeParsed.data.toLocaleString()
  }
  return undefined
}

export const validatedNumberString = ({
  event,
  fieldSchema,
}: {
  event: FocusEvent<HTMLInputElement, Element>
  fieldSchema: ZodType<
    z.output<ReturnType<typeof OPTIONAL_NUMBER_STRING_SCHEMA>>,
    z.ZodTypeDef,
    z.input<ReturnType<typeof OPTIONAL_NUMBER_STRING_SCHEMA>>
  >
}) => {
  const safeParsed = fieldSchema.safeParse(event.target.value)
  if (safeParsed.success && !!safeParsed.data) {
    return `${safeParsed.data}`
  }
  return undefined
}
