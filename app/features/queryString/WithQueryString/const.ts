import { z } from 'zod'

import {
  REQUIRED_NUMBER_SCHEMA,
  OPTIONAL_NUMBER_SCHEMA,
  REQUIRED_STRING_SCHEMA,
  OPTIONAL_STRING_SCHEMA,
  REQUIRED_STRING_ARRAY_SCHEMA,
  OPTIONAL_STRING_ARRAY_SCHEMA,
} from '~/lib/zod/queryString'

export const QUERY_STRING_SCHEMA = z.object({
  required_number: REQUIRED_NUMBER_SCHEMA,
  optional_number: OPTIONAL_NUMBER_SCHEMA,
  required_string: REQUIRED_STRING_SCHEMA,
  optional_string: OPTIONAL_STRING_SCHEMA,
  required_string_array: REQUIRED_STRING_ARRAY_SCHEMA,
  optional_string_array: OPTIONAL_STRING_ARRAY_SCHEMA,
})
