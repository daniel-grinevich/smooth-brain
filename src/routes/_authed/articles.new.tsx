import { createFileRoute } from '@tanstack/react-router'
import { Suspense } from 'react'
import { ArticleForm } from '~/components/articles/ArticleForm'

export const Route = createFileRoute('/_authed/articles/new')({
  component: RouteComponent,
})

function RouteComponent() {

  return (
    <div className="flex items-center justify-center m-4">
      <div>
        <h1 className='text-xl font-bold'>Create a new Article!</h1>
        <Suspense fallback={'loading . . . '}>
          <ArticleForm />
        </Suspense>
      </div>
    </div>
  )
}
