import { type ZodString, type ZodOptional } from 'zod'

export const TRANSFORM_STRING_TO_NUMBER_SCHEMA = ({
  inputSchema,
  parseValidNumberString,
}: {
  inputSchema: ZodString
  parseValidNumberString: (v: string) => string
}) => inputSchema.transform((v) => Number(parseValidNumberString(v)))

export const TRANSFORM_OPTIONAL_STRING_TO_NUMBER_SCHEMA = ({
  inputSchema,
  parseValidNumberString,
}: {
  inputSchema: ZodOptional<ZodString>
  parseValidNumberString: (v: string) => string
}) =>
  inputSchema.transform((v) => {
    if (!v) {
      return undefined
    }
    return Number(parseValidNumberString(v))
  })
