import type { ComponentProps, Ref } from 'react'

export type InputSubmitButtonProps = Omit<
  ComponentProps<'button'>,
  'type' | 'className'
>

export type InputSubmitButtonRef = Ref<HTMLButtonElement>
