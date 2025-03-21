import { formOptions } from '@tanstack/react-form'
import { z } from 'zod'

// Article schema
export const articleSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  categoryId: z.string().optional(),
})

// Reusable options for article forms
export const articleFormOptions = formOptions({
  defaultValues: {
    title: '',
    content: '',
    categoryId: '',
  },
  validators: {
    onChange: articleSchema,
  }
})