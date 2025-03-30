import { formOptions } from '@tanstack/react-form'


export const articleFormOptions = formOptions({
  defaultValues: {
    title: '',
    category: '',
    content: '',
  }
})