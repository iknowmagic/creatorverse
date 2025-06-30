// pages/admin/HistoryTable.tsx
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import { ChevronDown, ChevronUp, History, Trash, Trash2 } from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { ClearHistoryModal, DeleteHistoryModal, RestoreModal } from './HistoryModals'
import { type ModalRef } from './Modal'
import {
  clearHistory,
  deleteFromHistory,
  getRestoreDiff,
  restoreCreator,
  useHistory,
  type HistoryFilter,
  type HistoryRecord,
  type PaginationState,
  type RestoreDiff,
  type SortingState
} from './useAdmin'

const columnHelper = createColumnHelper<HistoryRecord>()

export function HistoryTable() {
  // Modal refs
  const restoreModalRef = useRef<ModalRef>(null)
  const deleteModalRef = useRef<ModalRef>(null)
  const clearModalRef = useRef<ModalRef>(null)
  const [selectedRecord, setSelectedRecord] = useState<HistoryRecord | null>(null)

  // Restore diff state
  const [restoreDiff, setRestoreDiff] = useState<RestoreDiff[]>([])
  const [restoreDiffLoading, setRestoreDiffLoading] = useState(false)
  const [restoreDiffError, setRestoreDiffError] = useState<string | null>(null)

  // Table state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20
  })
  const [sorting, setSorting] = useState<SortingState[]>([
    { id: 'action_date', desc: true } // Newest first by default
  ])
  const [filters, setFilters] = useState<HistoryFilter>({})

  // Fetch data
  const { history, totalCount, isLoading, error, refetch } = useHistory({
    pagination,
    sorting,
    filters
  })

  // Action badge styling
  const getActionBadge = (action: string) => {
    const baseClasses = 'px-2 py-1 text-xs font-chivo font-medium uppercase tracking-wide'
    switch (action) {
      case 'create':
        return `${baseClasses} text-green-700 dark:text-green-300`
      case 'update':
        return `${baseClasses} text-blue-700 dark:text-blue-300`
      case 'delete':
        return `${baseClasses} text-red-700 dark:text-red-300`
      default:
        return `${baseClasses} text-gray-700 dark:text-gray-300`
    }
  }

  // Fetch restore diff when modal opens
  const handleRestoreClick = async (record: HistoryRecord) => {
    setSelectedRecord(record)
    setRestoreDiffLoading(true)
    setRestoreDiffError(null)

    try {
      const { data, error } = await getRestoreDiff(record.history_id)
      if (error) {
        setRestoreDiffError(error)
      } else {
        setRestoreDiff(data)
      }
    } catch (err) {
      setRestoreDiffError('Failed to load restore preview')
    } finally {
      setRestoreDiffLoading(false)
    }

    restoreModalRef.current?.showModal()
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('action', {
        header: 'ACTION',
        cell: ({ getValue }) => <div className={getActionBadge(getValue())}>{getValue()}</div>
      }),
      columnHelper.accessor('name', {
        header: 'CREATOR NAME',
        cell: ({ getValue }) => (
          <div className="font-chivo font-medium text-gray-900 dark:text-gray-100">
            {getValue()}
          </div>
        )
      }),
      columnHelper.accessor('category', {
        header: 'CATEGORY',
        cell: ({ getValue }) => (
          <div className="text-gray-600 dark:text-gray-400 text-sm">{getValue()}</div>
        )
      }),
      columnHelper.accessor('action_date', {
        header: 'DATE',
        cell: ({ getValue }) => {
          const date = new Date(getValue())
          return (
            <div className="font-mono text-gray-600 dark:text-gray-400 text-xs">
              <div>{date.toLocaleDateString()}</div>
              <div className="text-gray-500 dark:text-gray-500">
                {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          )
        }
      }),
      columnHelper.display({
        id: 'actions',
        header: 'ACTIONS',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              onClick={() => handleRestoreClick(row.original)}
              className="p-1 text-gray-600 hover:text-green-600 dark:hover:text-green-400 dark:text-gray-400 transition-colors"
              title="Restore this state"
            >
              <History size={16} />
            </button>
            <button
              onClick={() => {
                setSelectedRecord(row.original)
                deleteModalRef.current?.showModal()
              }}
              className="p-1 text-gray-600 hover:text-red-600 dark:hover:text-red-400 dark:text-gray-400 transition-colors"
              title="Delete from history"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )
      })
    ],
    []
  )

  // Calculate page count
  const pageCount = Math.ceil(totalCount / pagination.pageSize)

  const table = useReactTable({
    data: history,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount,
    manualSorting: true,
    enableMultiSort: true,
    state: {
      pagination,
      sorting
    },
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    initialState: {
      sorting: [{ id: 'action_date', desc: true }]
    }
  })

  // Action handlers
  const handleRestore = async () => {
    if (!selectedRecord) return

    try {
      await restoreCreator(selectedRecord)
      restoreModalRef.current?.close()
      setSelectedRecord(null)
      refetch() // Refresh history table
    } catch (error) {
      console.error('Failed to restore creator:', error)
    }
  }

  const handleDeleteFromHistory = async () => {
    if (!selectedRecord) return

    try {
      await deleteFromHistory(selectedRecord.history_id)
      deleteModalRef.current?.close()
      setSelectedRecord(null)
      refetch() // Refresh history table
    } catch (error) {
      console.error('Failed to delete from history:', error)
    }
  }

  const handleClearHistory = async () => {
    try {
      await clearHistory()
      clearModalRef.current?.close()
      refetch() // Refresh history table
    } catch (error) {
      console.error('Failed to clear history:', error)
    }
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
        Error loading history: {error}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h2 className="font-chivo font-bold text-gray-900 dark:text-gray-100 text-lg uppercase tracking-wide">
            Creator History
          </h2>
          {/* Action filter buttons */}
          <div className="flex gap-1">
            <button
              onClick={() => setFilters({})}
              className={`px-2 py-1 text-xs font-chivo uppercase tracking-wide transition-colors ${
                !filters.action
                  ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              All
            </button>
            {['create', 'update', 'delete'].map(action => (
              <button
                key={action}
                onClick={() => setFilters({ action: action as any })}
                className={`px-2 py-1 text-xs font-chivo uppercase tracking-wide transition-colors ${
                  filters.action === action
                    ? 'bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {action}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => clearModalRef.current?.showModal()}
            className="btn btn-secondary btn-sm"
          >
            <Trash size={14} className="inline mr-1" />
            Clear History
          </button>
          <div className="text-gray-600 dark:text-gray-400 text-sm">{totalCount} records total</div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="border-2 border-gray-500 border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading history...</span>
        </div>
      )}

      {/* Table */}
      <div className="border-2 border-gray-900 dark:border-gray-100 overflow-x-auto">
        <table className="w-full border-collapse">
          {/* Header */}
          <thead className="bg-gray-100 dark:bg-gray-800">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className={`
                      border-b-2 border-r border-gray-900 dark:border-gray-100 px-4 py-3 text-left font-chivo font-bold text-sm uppercase tracking-wide text-gray-900 dark:text-gray-100
                      ${header.column.getCanSort() ? 'cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700' : ''}
                    `}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getCanSort() && (
                        <div className="flex flex-col">
                          <ChevronUp
                            size={12}
                            className={
                              header.column.getIsSorted() === 'asc'
                                ? 'text-gray-900 dark:text-gray-100'
                                : 'text-gray-400'
                            }
                          />
                          <ChevronDown
                            size={12}
                            className={
                              header.column.getIsSorted() === 'desc'
                                ? 'text-gray-900 dark:text-gray-100'
                                : 'text-gray-400'
                            }
                          />
                        </div>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Body */}
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr
                key={row.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {row.getVisibleCells().map(cell => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 border-gray-400 dark:border-gray-600 border-r border-b text-sm"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {!isLoading && history.length === 0 && (
          <div className="py-8 text-gray-500 dark:text-gray-400 text-center">
            {filters.action ? `No ${filters.action} actions found.` : 'No history records found.'}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && totalCount > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
            {Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalCount)} of {totalCount}{' '}
            records
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className={`
                px-3 py-1 border border-gray-400 dark:border-gray-600 font-chivo text-sm uppercase tracking-wide transition-colors
                ${
                  table.getCanPreviousPage()
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Previous
            </button>

            <span className="bg-gray-900 dark:bg-gray-100 px-3 py-1 font-chivo text-white dark:text-gray-900 text-sm">
              {pagination.pageIndex + 1} of {pageCount}
            </span>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className={`
                px-3 py-1 border border-gray-400 dark:border-gray-600 font-chivo text-sm uppercase tracking-wide transition-colors
                ${
                  table.getCanNextPage()
                    ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }
              `}
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <RestoreModal
        ref={restoreModalRef}
        selectedRecord={selectedRecord}
        restoreDiff={restoreDiff}
        restoreDiffLoading={restoreDiffLoading}
        restoreDiffError={restoreDiffError}
        onRestore={handleRestore}
        onCancel={() => restoreModalRef.current?.close()}
      />

      <DeleteHistoryModal
        ref={deleteModalRef}
        selectedRecord={selectedRecord}
        onDelete={handleDeleteFromHistory}
        onCancel={() => deleteModalRef.current?.close()}
      />

      <ClearHistoryModal
        ref={clearModalRef}
        onClear={handleClearHistory}
        onCancel={() => clearModalRef.current?.close()}
      />
    </div>
  )
}
