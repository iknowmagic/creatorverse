import Admin from '../pages/admin'

export function meta() {
  return [
    { title: 'Admin - creatorverse' },
    { name: 'description', content: 'Admin panel for managing content creators.' }
  ]
}

export default function AdminRoute() {
  return <Admin />
}
