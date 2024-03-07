import { z } from 'zod'
import { OPTIONAL_NUMBER_INPUT_SCHEMA as COMMON_OPTIONAL_NUMBER_INPUT_SCHEMA } from '~/lib/zod'
import { formattedNumberString } from '~/utils/form'

export const FIELD_KEY = 'optionalNumber'
export const FIELD_NAME = '数値（任意）'

const RANGE = {
  min: 10_000,
  max: 1_000_000_000,
} as const

export const OPTIONAL_NUMBER_SCHEMA = COMMON_OPTIONAL_NUMBER_INPUT_SCHEMA({
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
    .optional()
)
