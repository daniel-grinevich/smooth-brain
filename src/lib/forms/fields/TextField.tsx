import React from 'react'
import { useFieldContext } from '../formContext'

export function TextField({ label }: { label: string }) {
  const field = useFieldContext<string>()
  const { meta } = field.state
  const hasError = meta.errors.length > 0
  
  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">{label}</label>
      <input
        value={field.state.value}
        onChange={(e) => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
        className={`w-full p-2 border rounded bg-white text-black ${
          hasError && meta.isTouched ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {hasError && meta.isTouched && (
        <div className="text-red-500 text-sm mt-1">{meta.errors[0]}</div>
      )}
    </div>
  )
}