import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_authed/article/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_authed/documents/"!</div>
}
