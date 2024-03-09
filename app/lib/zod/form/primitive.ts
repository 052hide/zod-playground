import { z } from 'zod'

const BASE_STRING_SCHEMA = ({
  invalidTypeErrorMessage,
}: {
  invalidTypeErrorMessage: string
}) =>
  z
    .string({
      invalid_type_error: invalidTypeErrorMessage,
    })
    .trim()

export const DEFAULT_STRING_SCHEMA = ({
  requiredErrorMessage,
  ...baseStringParams
}: Parameters<typeof BASE_STRING_SCHEMA>[0] & {
  requiredErrorMessage: string
}) =>
  BASE_STRING_SCHEMA({ ...baseStringParams }).min(1, {
    message: requiredErrorMessage,
  })

export const DEFAULT_OPTIONAL_STRING_SCHEMA = ({
  ...baseStringParams
}: Parameters<typeof BASE_STRING_SCHEMA>[0]) =>
  z.optional(BASE_STRING_SCHEMA({ ...baseStringParams }))

export const DEFAULT_NUMBER_SCHEMA = ({
  invalidTypeErrorMessage,
  safeErrorMessage,
}: {
  invalidTypeErrorMessage: string
  safeErrorMessage: string
}) =>
  z
    .number({ invalid_type_error: invalidTypeErrorMessage })
    .safe({ message: safeErrorMessage })
