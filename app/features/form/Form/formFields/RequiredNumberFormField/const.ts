import type { z } from 'zod'

import {
  DEFAULT_NUMBER_SCHEMA,
  DEFAULT_STRING_SCHEMA,
} from '~/lib/zod/form/primitive'
import { TRANSFORM_STRING_TO_NUMBER_SCHEMA as TRANSFORM_SCHEMA } from '~/lib/zod/form/util'
import { parseValidNumberString } from '~/utils/form'

export const FIELD_KEY = 'requiredNumber'
export const FIELD_NAME = '数値（必須）'

const RANGE = {
  min: 10_000,
  max: 1_000_000_000,
} as const

export const TRANSFORM_STRING_TO_NUMBER_SCHEMA = TRANSFORM_SCHEMA({
  inputSchema: DEFAULT_STRING_SCHEMA({
    invalidTypeErrorMessage: `${FIELD_NAME}は数値で入力してください`,
    requiredErrorMessage: `${FIELD_NAME}を入力してください`,
  }),
  parseValidNumberString,
})

export const REQUIRED_NUMBER_SCHEMA = TRANSFORM_STRING_TO_NUMBER_SCHEMA.pipe<
  z.ZodType<z.output<typeof TRANSFORM_STRING_TO_NUMBER_SCHEMA>>
>(
  DEFAULT_NUMBER_SCHEMA({
    invalidTypeErrorMessage: `${FIELD_NAME}は数値で入力してください`,
    safeErrorMessage: `${FIELD_NAME}は${RANGE.min}から${RANGE.max}を入力してください`,
  })
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
