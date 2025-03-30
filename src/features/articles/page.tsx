// import { useAppForm } from '../../hooks/form.tsx'
// import { AddressFields } from './address-fields.tsx'
// import { peopleFormOpts } from './shared-form.tsx'

import { useAppForm } from "~/hooks/form"
import { articleFormOptions } from "~/lib/forms/options/articleForm"

export const ArticleForm = () => {
  const form = useAppForm({
    ...articleFormOptions,
    validators: {
      onChange: ({ value }) => {
        const errors = {
          fields: {},
        } as {
          fields: Record<string, string>
        }
        if (!value.title) {
          errors.fields.title = 'Title name is required'
        }
        return errors
      },
    },
    onSubmit: ({ value }) => {
      alert(JSON.stringify(value, null, 2))
    },
  })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
    >
      <h1>Article</h1>
      <form.AppField
        name="title"
        children={(field) => <field.TextField label="Title" />}
      />
      <form.AppForm>
        <form.SubscribeButton label="Submit" />
      </form.AppForm>
    </form>
  )
}
