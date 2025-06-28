import { LogOut } from 'lucide-react'
import { supabase } from '~/lib/client'
import { AdminTable } from './AdminTable'
import { Tabs } from './Tabs'

const handleLogout = async () => {
  await supabase.auth.signOut()
}

// Placeholder component for History tab
function HistoryPlaceholder() {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 border-2 border-gray-900 dark:border-gray-100 text-center">
      <div className="space-y-4">
        <h2 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-xl uppercase tracking-wide">
          History Management
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">
          HistoryTable component coming soon...
        </p>
        <div className="space-y-2 text-gray-500 dark:text-gray-500 text-xs">
          <div>• View all creator changes (create/update/delete)</div>
          <div>• Restore creators to previous states</div>
          <div>• Delete specific history entries</div>
          <div>• Clear all history with one click</div>
        </div>
      </div>
    </div>
  )
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
      component: <HistoryPlaceholder />
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
