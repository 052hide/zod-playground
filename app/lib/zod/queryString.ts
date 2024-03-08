import { z } from 'zod'

/**
 * input:  string | null | undefined | (string | null)[]
 * output: string | null | (string | null)[]
 */
const QUERY_STRING_INPUT_SCHEMA = z
  .union([z.string(), z.array(z.string().nullable())])
  .nullable()
  .optional()

/**
 * input:  string | null | undefined | (string | null)[]
 * output: string
 */
export const REQUIRED_STRING_SCHEMA = QUERY_STRING_INPUT_SCHEMA.refine(
  (v) => typeof v === 'string',
  {
    message: '文字列以外が指定されています',
  }
).pipe<z.ZodType<z.output<typeof QUERY_STRING_INPUT_SCHEMA>>>(
  z.string().min(1, {
    message: '必須です',
  })
)

/**
 * input:  string | null | undefined | (string | null)[]
 * output: string | undefined
 */
export const OPTIONAL_STRING_SCHEMA = QUERY_STRING_INPUT_SCHEMA.refine(
  (v) => {
    return typeof v === 'string' || v === undefined || v === null
  },
  {
    message: '文字列以外が指定されています',
  }
)
  .pipe<z.ZodType<z.output<typeof QUERY_STRING_INPUT_SCHEMA>>>(
    z.string().nullable().optional()
  )
  .transform((v) => v || undefined)

/**
 * input:  string | null | undefined | (string | null)[]
 * output: number
 */
export const REQUIRED_NUMBER_SCHEMA = REQUIRED_STRING_SCHEMA.transform((v) => {
  return Number(v)
}).refine(
  (v) => {
    return !isNaN(v)
  },
  {
    message: '数値以外が指定されています',
  }
)

/**
 * input:  string | null | undefined | (string | null)[]
 * output: number | undefined
 */
export const OPTIONAL_NUMBER_SCHEMA = OPTIONAL_STRING_SCHEMA.transform((v) => {
  if (v === undefined) {
    return undefined
  }
  return Number(v)
}).refine(
  (v) => {
    if (v === undefined) {
      return true
    }
    return !isNaN(v)
  },
  {
    message: '数値以外が指定されています',
  }
)

/**
 * input:  string | null | undefined | (string | null)[]
 * output: string[]
 */
export const REQUIRED_STRING_ARRAY_SCHEMA = QUERY_STRING_INPUT_SCHEMA.refine(
  (v): v is (string | null)[] => {
    return (
      v !== undefined && v !== null && typeof v !== 'string' && Array.isArray(v)
    )
  },
  {
    message: '配列以外が指定されています',
  }
).transform((v) => {
  return v.filter((x): x is string => x !== null)
})

/**
 * input:  string | null | undefined | (string | null)[]
 * output: string[] | undefined
 */
export const OPTIONAL_STRING_ARRAY_SCHEMA = QUERY_STRING_INPUT_SCHEMA.refine(
  (v): v is (string | null)[] | null | undefined => {
    return (
      v === undefined ||
      v === null ||
      v === '' ||
      (typeof v !== 'string' && Array.isArray(v))
    )
  },
  {
    message: '配列以外が指定されています',
  }
).transform((v) => {
  if (v === null || v === undefined) {
    return undefined
  }
  return v.filter((x): x is string => x !== null)
})
