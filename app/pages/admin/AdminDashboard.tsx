import { AdminTable } from './AdminTable'

// pages/AdminDashboard.tsx
export function AdminDashboard() {
  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-8 min-w-[360px] min-h-screen font-archivo">
      <div className="mb-4 font-bold text-gray-900 dark:text-white text-4xl">
        creatorverse :: admin dashboard
      </div>
      <AdminTable />
    </div>
  )
}
