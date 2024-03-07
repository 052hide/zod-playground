import { z } from 'zod'
import { REQUIRED_NUMBER_SCHEMA } from './formFields/RequiredNumberFormField/const'
import { OPTIONAL_NUMBER_SCHEMA } from './formFields/OptionalNumberFormField/const'

export const FORM_SCHEMA = z.object({
  requiredNumber: REQUIRED_NUMBER_SCHEMA,
  optionalNumber: OPTIONAL_NUMBER_SCHEMA,
})
