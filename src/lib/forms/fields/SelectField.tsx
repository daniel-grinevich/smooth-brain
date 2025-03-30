import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '~/hooks/form-context'

interface SelectFieldProps {
  label: string;
  options: { value: string; label: string }[];
  divStyle?: string;
  labelStyle?: string;
  selectStyle?: string;
  errorStyle?: string;
}

export default function SelectField({
  label,
  options,
  divStyle = "mb-4",
  labelStyle = "block text-sm font-medium text-gray-700 mb-1",
  selectStyle = "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500",
  errorStyle = "mt-1 text-sm text-red-500",
}: SelectFieldProps) {
  const field = useFieldContext<string>()

  const value = useStore(field.store, (state) => state.value)
  const errors = useStore(field.store, (state) => state.meta.errors)
  const touched = useStore(field.store, (state) => state.meta.isTouched)

  return (
    <div className={divStyle}>
      <label className={labelStyle}>{label}</label>
      <select
        className={selectStyle}
        value={value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      >
        <option value="">-- Select an option --</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {touched && errors.length > 0 && (
        <em className={errorStyle}>{errors[0]}</em>
      )}
    </div>
  )
}