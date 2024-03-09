import { forwardRef } from 'react'

import type { InputTextFieldProps, InputTextFieldRef } from './type'

const Base = ({ ...props }: InputTextFieldProps, ref: InputTextFieldRef) => {
  return (
    <input
      ref={ref}
      type={'text'}
      {...props}
      className={'tw-h-[40px] tw-w-full tw-border tw-border-black tw-px-2'}
    />
  )
}

export const InputTextField = forwardRef(Base)
