// pages/admin/useCreators.ts
import { useEffect, useState } from 'react'
import { supabase, type Creator } from '~/lib/client'

interface PaginationState {
  pageIndex: number
  pageSize: number
}

interface SortingState {
  id: string
  desc: boolean
}

interface UseCreatorsParams {
  pagination: PaginationState
  sorting: SortingState[]
  globalFilter: string
}

interface UseCreatorsResult {
  creators: Creator[]
  totalCount: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useCreators({
  pagination,
  sorting,
  globalFilter
}: UseCreatorsParams): UseCreatorsResult {
  const [creators, setCreators] = useState<Creator[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCreators = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // Calculate offset for pagination
      const from = pagination.pageIndex * pagination.pageSize
      const to = from + pagination.pageSize - 1

      // Build the query
      let query = supabase.from('random_creators').select('*', { count: 'exact' }).range(from, to)

      // Apply sorting
      if (sorting.length > 0) {
        const sort = sorting[0] // TanStack Table sends array, we use first item
        query = query.order(sort.id, { ascending: !sort.desc })
      } else {
        // Default sort by created_at desc
        query = query.order('created_at', { ascending: false })
      }

      // Apply global search filter
      if (globalFilter) {
        query = query.or(
          `name.ilike.%${globalFilter}%,category.ilike.%${globalFilter}%,description.ilike.%${globalFilter}%`
        )
      }

      const { data, error: supabaseError, count } = await query

      if (supabaseError) {
        throw supabaseError
      }

      setCreators(data || [])
      setTotalCount(count || 0)
    } catch (err) {
      console.error('Error fetching creators:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch creators')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCreators()
  }, [pagination.pageIndex, pagination.pageSize, sorting, globalFilter])

  return {
    creators,
    totalCount,
    isLoading,
    error,
    refetch: fetchCreators
  }
}
