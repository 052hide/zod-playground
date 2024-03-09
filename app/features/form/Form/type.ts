import type { FORM_SCHEMA } from './const'
import type { z } from 'zod'

export type I = z.input<typeof FORM_SCHEMA>
export type C = unknown
export type O = z.output<typeof FORM_SCHEMA>
