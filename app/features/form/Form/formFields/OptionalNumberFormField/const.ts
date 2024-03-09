import { z } from 'zod'

import {
  DEFAULT_NUMBER_SCHEMA,
  DEFAULT_OPTIONAL_STRING_SCHEMA,
} from '~/lib/zod/form/primitive'
import { TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA as TRANSFORM_SCHEMA } from '~/lib/zod/form/util'
import { parseValidNumberString } from '~/utils/form'

export const FIELD_KEY = 'optionalNumber'
export const FIELD_NAME = '数値（任意）'

const RANGE = {
  min: 10_000,
  max: 1_000_000_000,
} as const

export const TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA = TRANSFORM_SCHEMA({
  inputSchema: DEFAULT_OPTIONAL_STRING_SCHEMA({
    invalidTypeErrorMessage: `${FIELD_NAME}は数値で入力してください`,
  }),
  parseValidNumberString,
})

export const OPTIONAL_NUMBER_SCHEMA =
  TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA.pipe<
    z.ZodType<z.output<typeof TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA>>
  >(
    z.optional(
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
  )
