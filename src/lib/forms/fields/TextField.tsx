import { useStore } from '@tanstack/react-form'
import { useFieldContext } from '~/hooks/form-context'

export default function TextField(
  { 
    label, 
    divStyle, 
    labelStyle,
    inputStyle,
    errorStyle 
  }: { label: string, divStyle: string, labelStyle: string, inputStyle: string, errorStyle: string}) {
  const field = useFieldContext<string>()

  const errors = useStore(field.store, (state) => state.meta.errors)
  const touched = useStore(field.store, (state) => state.meta.isTouched)

  return (
    <div className={divStyle}>
      <label className={labelStyle}>
        <div>{label}</div>
        <input
          className={inputStyle}
          value={field.state.value}
          onChange={(e) => field.handleChange(e.target.value)}
          onBlur={field.handleBlur}
        />
      </label>
      {touched && errors.map((error: string) => (
        <div className={errorStyle} key={error}>
          {error}
        </div>
      ))}
    </div>
  )
}