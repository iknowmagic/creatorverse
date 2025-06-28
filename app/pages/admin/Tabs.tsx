import { type ReactNode, useState } from 'react'

interface Tab {
  id: string
  label: string
  component: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function Tabs({ tabs, defaultTab, className = '' }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '')

  const activeTabData = tabs.find(tab => tab.id === activeTab)

  return (
    <div className={className}>
      {/* Tab Navigation */}
      <div className="relative flex items-end gap-0">
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative px-6 py-3 font-chivo text-sm font-medium uppercase tracking-wide transition-all
              border-b-0
              ${index > 0 ? 'ml-[-2px]' : ''}
              ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-900 dark:border-gray-100 z-10 border-2'
                  : 'bg-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 border-gray-400 border-2'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content - No gap, connects directly */}
      <div className="bg-white dark:bg-gray-800 border-2 border-gray-900 dark:border-gray-100 min-h-[400px]">
        <div className="p-6">
          {activeTabData?.component || (
            <div className="text-gray-500 dark:text-gray-400">No content found for this tab</div>
          )}
        </div>
      </div>
    </div>
  )
}
