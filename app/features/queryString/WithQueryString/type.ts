import { z } from 'zod'
import { QUERY_STRING_SCHEMA } from './const'

type ParsedQuery = z.output<typeof QUERY_STRING_SCHEMA>

export type ValidatedQueryStringResult =
  | {
      success: true
      data: ParsedQuery
    }
  | {
      success: false
    }
