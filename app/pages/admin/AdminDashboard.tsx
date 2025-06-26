import { AdminTable } from './AdminTable'

// pages/AdminDashboard.tsx
export function AdminDashboard() {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-8 min-w-[360px] min-h-screen font-archivo">
      <AdminTable />
    </div>
  )
}
