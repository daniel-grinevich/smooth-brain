import { createFormHook } from '@tanstack/react-form'
import { lazy } from 'react'
import { fieldContext, formContext, useFormContext } from './form-context'

const TextField = lazy(() => import('~/lib/forms/fields/TextField'))
const SelectField = lazy(() => import('~/lib/forms/fields/SelectField'))
const TextAreaField = lazy(() => import('~/lib/forms/fields/TextAreaField'))

function SubscribeButton({ label }: { label: string }) {
    const form = useFormContext()
    return (
        <form.Subscribe selector={(state) => state.isSubmitting}>
            {(isSubmitting) => <button className='p-3 bg-blue-700 rounded-md'disabled={isSubmitting}>{label}</button>}
        </form.Subscribe>
    )
}

export const { useAppForm, withForm } = createFormHook({
    fieldComponents: {
        TextField,
        SelectField,
        TextAreaField,
    },
    formComponents: {
        SubscribeButton,
    },
    fieldContext,
    formContext,
})
