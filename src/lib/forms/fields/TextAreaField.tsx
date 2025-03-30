import { useFieldContext } from '~/hooks/form-context'
import { useStore } from '@tanstack/react-form'

interface TextAreaFieldProps {
  label: string
  divStyle?: string
  labelStyle?: string
  textAreaStyle?: string
  errorStyle?: string
}

export default function TextAreaField({
  label,
  divStyle = "mb-4",
  labelStyle = "block text-sm font-medium text-gray-700 mb-1",
  textAreaStyle = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500",
  errorStyle = "mt-1 text-sm text-red-500",
}: TextAreaFieldProps) {
  const field = useFieldContext<string>()
  const errors = useStore(field.store, (state) => state.meta.errors)

  return (
    <div className={divStyle}>
      <label className={labelStyle}>{label}</label>
      <textarea
        className={textAreaStyle}
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
      {errors.map((error: string) => (
        <div className={errorStyle} key={error}>
          {error}
        </div>
      ))}
    </div>
  )
}