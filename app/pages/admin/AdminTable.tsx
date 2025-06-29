// pages/admin/AdminTable.tsx
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  ChevronDown,
  ChevronUp,
  Edit,
  ExternalLink,
  FilePlus2,
  ImageOff,
  Trash2
} from 'lucide-react'
import { useMemo, useRef, useState } from 'react'
import { type Creator } from '~/lib/client'
import { AddModal } from './AddModal'
import { DeleteModal } from './DeleteModal'
import { EditModal } from './EditModal'
import { type ModalRef } from './Modal'
import { SearchAutocomplete } from './SearchAutocomplete'
import { useCreators } from './useCreators'

const columnHelper = createColumnHelper<Creator>()

// Define types inline for TanStack Table v8
interface PaginationState {
  pageIndex: number
  pageSize: number
}

interface SortingState {
  id: string
  desc: boolean
}

interface SearchTag {
  type: 'name' | 'description' | 'category'
  value: string
  displayText: string
}

export function AdminTable() {
  // Modal refs
  const editModalRef = useRef<ModalRef>(null)
  const deleteModalRef = useRef<ModalRef>(null)
  const addModalRef = useRef<ModalRef>(null)
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null)

  // Table state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20
  })
  const [sorting, setSorting] = useState<SortingState[]>([
    { id: 'category', desc: false },
    { id: 'name', desc: false }
  ])
  const [searchTags, setSearchTags] = useState<SearchTag[]>([])

  // Fetch data with server-side params
  const { creators, totalCount, isLoading, error, refetch } = useCreators({
    pagination,
    sorting,
    searchTags
  })

  // Success handler for modals
  const handleModalSuccess = async () => {
    await refetch()
    setSelectedCreator(null)
  }

  const columns = useMemo(
    () => [
      columnHelper.accessor('category', {
        header: 'CATEGORY',
        cell: ({ getValue }) => (
          <div className="bg-gray-100 dark:bg-gray-700 px-2 py-1 border-gray-400 dark:border-gray-600 max-w-[250px] text-sm tracking-wide">
            {getValue()}
          </div>
        )
      }),
      columnHelper.accessor('name', {
        header: 'NAME',
        cell: ({ getValue }) => (
          <div className="font-chivo font-medium text-gray-900 dark:text-gray-100">
            {getValue()}
          </div>
        )
      }),
      columnHelper.accessor('description', {
        header: 'DESCRIPTION',
        cell: ({ getValue }) => {
          const description = getValue()
          const truncated =
            description.length > 80 ? `${description.substring(0, 80)}...` : description
          return (
            <div
              className="max-w-[250px] text-gray-700 dark:text-gray-300 text-sm leading-tight"
              title={description}
            >
              {truncated}
            </div>
          )
        }
      }),
      columnHelper.accessor('image_url', {
        header: 'IMAGE',
        cell: ({ getValue }) => {
          const imageUrl = getValue()
          if (!imageUrl) {
            return (
              <div className="flex justify-center items-center bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 w-8 h-8">
                <ImageOff size={14} className="text-gray-400" />
              </div>
            )
          }
          return (
            <img
              src={imageUrl}
              alt="Creator"
              className="border border-gray-300 dark:border-gray-600 w-8 h-8 object-cover hover:scale-150 transition-transform cursor-pointer"
              title="Click to view larger"
              onClick={() => window.open(imageUrl, '_blank')}
            />
          )
        }
      }),
      columnHelper.accessor('url', {
        header: 'URL',
        cell: ({ getValue, table }) => {
          const url = getValue()
          const isImageColumnVisible = table.getColumn('image_url')?.getIsVisible()

          if (isImageColumnVisible) {
            return (
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center text-blue-600 hover:text-blue-800 dark:hover:text-blue-200 dark:text-blue-400 transition-colors"
                title={url}
              >
                <ExternalLink size={16} />
              </a>
            )
          }

          const displayUrl = url.length > 30 ? `${url.substring(0, 30)}...` : url
          return (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 font-mono text-blue-600 dark:text-blue-400 text-xs hover:underline"
            >
              {displayUrl}
              <ExternalLink size={14} />
            </a>
          )
        }
      }),
      columnHelper.accessor('updated_at', {
        header: 'UPDATED',
        cell: ({ getValue }) => {
          const date = new Date(getValue())
          return (
            <div className="font-mono text-gray-600 dark:text-gray-400 text-xs">
              {date.toLocaleDateString()}
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
              onClick={() => {
                setSelectedCreator(row.original)
                editModalRef.current?.showModal()
              }}
              className="p-1 text-gray-600 hover:text-gray-900 dark:hover:text-gray-100 dark:text-gray-400 transition-colors"
              title="Edit creator"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={() => {
                setSelectedCreator(row.original)
                deleteModalRef.current?.showModal()
              }}
              className="p-1 text-gray-600 hover:text-red-600 dark:hover:text-red-400 dark:text-gray-400 transition-colors"
              title="Delete creator"
            >
              <Trash2 size={16} />
            </button>
          </div>
        )
      })
    ],
    []
  )

  // Calculate page count from server data
  const pageCount = Math.ceil(totalCount / pagination.pageSize)

  const table = useReactTable({
    data: creators,
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
      columnVisibility: {
        description: true,
        image_url: false
      },
      sorting: [
        { id: 'category', desc: false },
        { id: 'name', desc: false }
      ]
    }
  })

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400">
        Error loading creators: {error}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Search and Controls */}
      <div className="flex justify-between items-center">
        <SearchAutocomplete onTagsChange={setSearchTags} className="flex-1 max-w-lg" />
        <div className="flex items-center gap-4">
          <button
            onClick={() => addModalRef.current?.showModal()}
            className="flex gap-2 bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 border border-gray-400 dark:border-gray-600 font-chivo text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wide transition-colors"
            title="Add new creator"
          >
            <FilePlus2 size={14} />
            Add Creator
          </button>
          <button
            onClick={() => table.getColumn('image_url')?.toggleVisibility()}
            className="bg-white hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 border border-gray-400 dark:border-gray-600 font-chivo text-gray-900 dark:text-gray-100 text-xs uppercase tracking-wide transition-colors"
          >
            {table.getColumn('image_url')?.getIsVisible() ? 'Hide' : 'Show'} Creator Images
          </button>
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            {totalCount} creators total
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="border-2 border-gray-500 border-t-transparent rounded-full w-6 h-6 animate-spin"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading creators...</span>
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
        {!isLoading && creators.length === 0 && (
          <div className="py-8 text-gray-500 dark:text-gray-400 text-center">
            {searchTags.length > 0
              ? 'No creators found matching your search.'
              : 'No creators found.'}
          </div>
        )}
      </div>

      {/* Pagination */}
      {!isLoading && totalCount > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            Showing {pagination.pageIndex * pagination.pageSize + 1} to{' '}
            {Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalCount)} of {totalCount}{' '}
            results
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
      <EditModal ref={editModalRef} creator={selectedCreator} onSuccess={handleModalSuccess} />

      <AddModal ref={addModalRef} onSuccess={handleModalSuccess} />

      <DeleteModal ref={deleteModalRef} creator={selectedCreator} onSuccess={handleModalSuccess} />
    </div>
  )
}
