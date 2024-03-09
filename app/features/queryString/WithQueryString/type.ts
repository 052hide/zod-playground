import type { QUERY_STRING_SCHEMA } from './const'
import type { z } from 'zod'

type ParsedQuery = z.output<typeof QUERY_STRING_SCHEMA>

export type ValidatedQueryStringResult =
  | {
      success: true
      data: ParsedQuery
    }
  | {
      success: false
    }
