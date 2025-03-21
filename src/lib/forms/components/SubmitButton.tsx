import React from 'react'
import { useFormContext } from '../formContext'

export function SubmitButton({ 
  children,
  isLoading
}: { 
  children?: React.ReactNode;
  isLoading?: boolean;
}) {
  const form = useFormContext()
  
  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
    >
      {([canSubmit, isSubmitting]) => (
        <button
          type="submit"
          disabled={!canSubmit || isSubmitting || isLoading}
          className={`px-4 py-2 rounded ${
            !canSubmit || isSubmitting || isLoading
              ? 'bg-blue-300 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white`}
        >
          {isSubmitting || isLoading ? 'Saving...' : children || 'Submit'}
        </button>
      )}
    </form.Subscribe>
  )
}