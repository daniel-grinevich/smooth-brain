import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/articles/$articleId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/articles/$articleId"!</div>
}
