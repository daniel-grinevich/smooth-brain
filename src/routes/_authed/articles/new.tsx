import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/articles/new')({
  component: ArticleForm,
})

function ArticleForm() {
  return (
  <div className="max-w-4xl mx-auto p-6">
    <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
  </div>
  )
}
