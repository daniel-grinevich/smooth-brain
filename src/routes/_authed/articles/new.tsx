// routes/_authed/articles/new.tsx
import { createFileRoute } from '@tanstack/react-router'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useAppForm } from '~/lib/forms/formHook'  // Missing import for useAppForm
import { articleFormOptions } from '~/lib/forms/options/articleForm'

export const Route = createFileRoute('/_authed/articles/new')({
  component: ArticleForm,
})

function ArticleForm() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetch('/api/categories').then(res => res.json())
  })
  
  const categoryOptions = categories.map(cat => ({
    value: cat.id,
    label: cat.name
  }))
  
  const createArticle = useMutation({
    mutationFn: (newArticle) => {
      return fetch('/api/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newArticle)
      }).then(res => {
        if (!res.ok) throw new Error('Failed to create article')
        return res.json()
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['articles'] })
      navigate({ to: '/articles' })
    }
  })
  
  const form = useAppForm({
    ...articleFormOptions,
    onSubmit: ({ value }) => {
      createArticle.mutate(value)
    },
  })

  return (
    <div className="max-w-4xl mx-auto p-6 border-white border">
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
      
      <form
        onSubmit={(e) => {
          e.preventDefault()
          form.handleSubmit()
        }}
      >
        <form.AppField
          name="title"
          children={(field) => <field.TextField label="Title" />}
        />
        
        <form.AppField
          name="categoryId"
          children={(field) => (
            <field.SelectField 
              label="Category" 
              options={categoryOptions}
            />
          )}
        />
        
        <form.AppField
          name="content"
          children={(field) => <field.TextareaField label="Content" />}
        />
        
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => navigate({ to: '/articles' })}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          
          <form.AppForm>
            <form.SubmitButton isLoading={createArticle.isPending}>
              Save Article
            </form.SubmitButton>
          </form.AppForm>
        </div>
        
        {createArticle.isError && (
          <div className="mt-4 p-2 bg-red-100 text-red-700 rounded">
            Error: {createArticle.error.message}
          </div>
        )}
      </form>
    </div>
  )
}