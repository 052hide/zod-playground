import { z } from 'zod'
import type { FORM_SCHEMA } from './const'

export type FieldValues = z.input<typeof FORM_SCHEMA>
export type Context = unknown
export type TransformedValues = z.output<typeof FORM_SCHEMA>
