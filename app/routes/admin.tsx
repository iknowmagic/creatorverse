import { AdminDashboard } from '../pages/admin/AdminDashboard'
import { ProtectedRoute } from '../pages/admin/ProtectedRoute'

export function meta() {
  return [
    { title: 'Admin - creatorverse' },
    { name: 'description', content: 'Admin panel for managing content creators.' }
  ]
}

export default function AdminRoute() {
  return (
    <ProtectedRoute>
      <AdminDashboard />
    </ProtectedRoute>
  )
}
