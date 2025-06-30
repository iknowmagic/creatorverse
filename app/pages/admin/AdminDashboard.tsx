import { LogOut } from 'lucide-react'
import { supabase } from '~/lib/client'
import { AdminTable } from './AdminTable'
import { HistoryTable } from './HistoryTable'
import { Tabs } from './Tabs'

const handleLogout = async () => {
  await supabase.auth.signOut()
}

// pages/AdminDashboard.tsx
export function AdminDashboard() {
  const tabs = [
    {
      id: 'data',
      label: 'Data',
      component: <AdminTable />
    },
    {
      id: 'history',
      label: 'History',
      component: <HistoryTable />
    }
  ]

  return (
    <div className="flex flex-col bg-gray-100 dark:bg-gray-900 p-8 min-w-[360px] min-h-screen font-archivo">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="font-bold text-gray-900 dark:text-white text-4xl">
          creatorverse :: admin dashboard
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 dark:hover:text-gray-100 dark:text-gray-400 cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabs} defaultTab="data" />
    </div>
  )
}
