import { Navigate, useParams } from 'react-router'

export default function CatchallRedirect() {
  const route = useParams<{ route: string }>()['route']
  return <Navigate to={'/p/' + route} />
}
