import { z } from 'zod'
import { REQUIRED_NUMBER_INPUT_SCHEMA as COMMON_REQUIRED_NUMBER_INPUT_SCHEMA } from '~/lib/zod'
import { formattedNumberString } from '~/utils/form'

export const FIELD_KEY = 'requiredNumber'
export const FIELD_NAME = '数値（必須）'

const RANGE = {
  min: 10_000,
  max: 1_000_000_000,
} as const

export const REQUIRED_NUMBER_SCHEMA = COMMON_REQUIRED_NUMBER_INPUT_SCHEMA({
  fieldName: FIELD_NAME,
  formatFn: formattedNumberString,
}).pipe(
  z.coerce
    .number()
    .int({
      message: `${FIELD_NAME}は整数で入力してください`,
    })
    .positive({
      message: `${FIELD_NAME}は正の数で入力してください`,
    })
    .min(RANGE.min, {
      message: `${FIELD_NAME}は${RANGE.min}以上を入力してください`,
    })
    .max(RANGE.max, {
      message: `${FIELD_NAME}は${RANGE.max}以下を入力してください`,
    })
)

export const formatFn = (value: string) => {
  return value
    .replace(/[０-９]/g, (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xfee0)
    })
    .replaceAll(',', '')
    .trim()
}
export const SCHEMA = z
  .string({
    required_error: `${FIELD_NAME}は必須です`,
  })
  .min(1, `${FIELD_NAME}は必須です`)
  .transform((v) => {
    return Number(formatFn(v))
  })
  .refine(
    (v) => {
      return !isNaN(v)
    },
    {
      message: `${FIELD_NAME}は数値を入力してください`,
    }
  )
  .pipe(
    z.coerce
      .number()
      .int({
        message: `${FIELD_NAME}は整数で入力してください`,
      })
      .positive({
        message: `${FIELD_NAME}は正の数で入力してください`,
      })
      .min(RANGE.min, {
        message: `${FIELD_NAME}は${RANGE.min}以上を入力してください`,
      })
      .max(RANGE.max, {
        message: `${FIELD_NAME}は${RANGE.max}以下を入力してください`,
      })
  )
