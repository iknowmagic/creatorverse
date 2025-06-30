// components/ProtectedRoute.tsx
import React from 'react'
import AdminLogin from './AdminLogin'
import { useAuth } from './useAuth'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return <div>Loading...</div>
  if (!user) return <AdminLogin />

  return <>{children}</>
}
