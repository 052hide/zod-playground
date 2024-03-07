import type { FormFieldWrapperProps } from './type'

export const FormFieldWrapper = ({
  label,
  inputNode,
  errorMessage,
}: FormFieldWrapperProps) => {
  return (
    <div>
      <label className={'tw-text-sm'}>{label}</label>
      <div className={'tw-mt-1'}>{inputNode}</div>
      <div className={'tw-mt-1 tw-min-h-[20px]'}>
        {errorMessage && (
          <p className={'tw-text-sm tw-text-red-500'}>{errorMessage}</p>
        )}
      </div>
    </div>
  )
}
