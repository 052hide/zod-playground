import { forwardRef } from 'react'

import type { InputSubmitButtonProps, InputSubmitButtonRef } from './type'

const Base = (
  { ...props }: InputSubmitButtonProps,
  ref: InputSubmitButtonRef
) => {
  return (
    <button
      ref={ref}
      type={'submit'}
      {...props}
      className={
        'tw-h-[40px] tw-w-full tw-border tw-border-black tw-bg-black tw-px-4 tw-text-white'
      }
    >
      {'Submit'}
    </button>
  )
}

export const InputSubmitButton = forwardRef(Base)
