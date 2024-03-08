import queryString from 'query-string'
import { z } from 'zod'
import {
  OPTIONAL_NUMBER_SCHEMA,
  OPTIONAL_STRING_ARRAY_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  REQUIRED_NUMBER_SCHEMA,
  REQUIRED_STRING_ARRAY_SCHEMA,
  REQUIRED_STRING_SCHEMA,
} from '~/lib/zod/queryString'

type ParsedQuery = {
  [x: string]:
    | z.output<typeof OPTIONAL_NUMBER_SCHEMA>
    | z.output<typeof OPTIONAL_STRING_ARRAY_SCHEMA>
    | z.output<typeof OPTIONAL_STRING_SCHEMA>
    | z.output<typeof REQUIRED_NUMBER_SCHEMA>
    | z.output<typeof REQUIRED_STRING_ARRAY_SCHEMA>
    | z.output<typeof REQUIRED_STRING_SCHEMA>
}

const OPTIONS = {
  arrayFormat: 'bracket',
  skipEmptyString: false,
} as const

export const parse = ({ searchParams }: { searchParams: string }) => {
  return queryString.parse(searchParams, OPTIONS)
}

export const stringify = ({ parsedQuery }: { parsedQuery: ParsedQuery }) => {
  return queryString.stringify(parsedQuery, OPTIONS)
}
