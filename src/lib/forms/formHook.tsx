import { createFormHook } from '@tanstack/react-form'
import { fieldContext, formContext } from './formContext'
import { TextField } from './fields/TextField'
import { TextAreaField } from './fields/TextAreaField'
import { SelectField } from './fields/SelectField'
import { SubmitButton } from './components/SubmitButton'

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    TextField,
    TextAreaField,
    SelectField,
  },
  formComponents: {
    SubmitButton,
  },
  fieldContext,
  formContext,
})