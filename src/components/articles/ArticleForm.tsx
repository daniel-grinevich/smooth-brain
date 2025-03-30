import { useAppForm } from "~/hooks/form"
import { articleFormOptions } from "~/lib/forms/options/articleForm"
import { createArticle } from "~/utils/articles"
export const ArticleForm = () => {

  const form = useAppForm({
    ...articleFormOptions,
    validators: {

    },
    onSubmit: async ({ value }) => {
      return createArticle({data: value})
        .then(response => {
          console.log("Article created successfully:", response)
          return response
        })
        .catch(error => {
          console.error("Error creating article:", error)
          throw error
        })
    },
  })
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      className="space-y-4 min-w-[50vw]"
    > 
      <form.AppField 
        name="title"
        validators={{
          onBlur: ({ value }) => {
            // Collect multiple errors in an array
            const errors = [];
            
            if (!value) {
              errors.push('Title is required');
            }
            
            if (value && value.length < 9) {
              errors.push('Title must be at least 9 characters');
            }

            if (value && !/^[A-Z]/.test(value)) {
              errors.push('Title must start with a capital letter');
            }
            // Return the array if there are errors, otherwise undefined
            return errors.length > 0 ? errors : undefined;
          }
        }}
      >
        {(field) => (
          <div>
            <field.TextField 
              label="Title"
              divStyle="mb-3"
              labelStyle="block text-sm font-medium text-white-700 mb-1"
              inputStyle="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              errorStyle="mt-1 text-sm text-red-500"
            />
          </div>
        )}
      </form.AppField>
      
      <form.AppField name="category">
        {(field) => (
          <div>
            <field.SelectField 
              label="Category" 
              options={[
                { value: 'new', label: 'New' }, 
                { value: 'existing', label: 'Existing' }
              ]}
              divStyle="mb-6"
              labelStyle="block text-sm font-medium text-white-700 mb-1"
              selectStyle="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              errorStyle="mt-1 text-sm text-red-500"
            />
          </div>
        )}
      </form.AppField>
      
      <form.AppField name="content">
        {(field) => (
          <div>
            <field.TextAreaField 
              label="Content"
              divStyle="mb-6"
              labelStyle="block text-sm font-medium text-white-700 mb-1"
              textAreaStyle="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              errorStyle="mt-1 text-sm text-red-500"
            />
          </div>
        )}
      </form.AppField>
      
      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  )
}