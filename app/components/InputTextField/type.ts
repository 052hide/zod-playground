import type { ComponentProps, Ref } from 'react'

export type InputTextFieldProps = Omit<
  ComponentProps<'input'>,
  'type' | 'value' | 'onChange' | 'className'
>

export type InputTextFieldRef = Ref<HTMLInputElement>
