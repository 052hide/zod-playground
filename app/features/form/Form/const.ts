import { z } from 'zod'

import { OPTIONAL_NUMBER_SCHEMA } from './formFields/OptionalNumberFormField/const'
import { REQUIRED_NUMBER_SCHEMA } from './formFields/RequiredNumberFormField/const'

export const FORM_SCHEMA = z.object({
  requiredNumber: REQUIRED_NUMBER_SCHEMA,
  optionalNumber: OPTIONAL_NUMBER_SCHEMA,
})
