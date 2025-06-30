// pages/admin/useAdmin/useCreators.ts
import { useEffect, useState } from 'react'
import { supabase, type Creator } from '~/lib/client'
import type { UseCreatorsParams, UseCreatorsResult } from './types'

export function useCreators({
  pagination,
  sorting,
  searchTags
}: UseCreatorsParams): UseCreatorsResult {
  const [creators, setCreators] = useState<Creator[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCreators = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const from = pagination.pageIndex * pagination.pageSize
      const to = from + pagination.pageSize - 1

      let query = supabase.from('creators').select('*', { count: 'exact' }).range(from, to)

      if (sorting.length > 0) {
        // Apply all sorting columns in order
        sorting.forEach(sort => {
          query = query.order(sort.id, { ascending: !sort.desc })
        })
      } else {
        // Default: sort by category first, then name
        query = query.order('category', { ascending: true }).order('name', { ascending: true })
      }

      // AND logic for multiple tags
      if (searchTags.length > 0) {
        searchTags.forEach(tag => {
          switch (tag.type) {
            case 'name':
              query = query.ilike('name', `%${tag.value}%`)
              break
            case 'category':
              query = query.ilike('category', `%${tag.value}%`)
              break
            case 'description':
              query = query.ilike('description', `%${tag.value}%`)
              break
          }
        })
      }

      const response = await query

      // More robust error checking
      if (response.error) {
        throw new Error(response.error.message || response.error.toString() || 'Database error')
      }

      // Check for HTTP errors that might not be caught by Supabase client
      if (response.status && response.status >= 400) {
        throw new Error(`HTTP ${response.status}: ${response.statusText || 'Request failed'}`)
      }

      const { data, count } = response

      setCreators(data || [])
      setTotalCount(count || 0)
    } catch (err) {
      console.error('Error fetching creators:', err)
      let errorMessage = 'Failed to fetch creators'

      if (err instanceof Error) {
        errorMessage = err.message
      } else if (typeof err === 'string') {
        errorMessage = err
      } else if (err && typeof err === 'object' && 'message' in err) {
        errorMessage = String(err.message)
      }

      setError(errorMessage)
      setCreators([])
      // Don't reset totalCount on error for pagination consistency
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchCreators()
  }, [pagination.pageIndex, pagination.pageSize, sorting, searchTags])

  return {
    creators,
    totalCount,
    isLoading,
    error,
    refetch: fetchCreators
  }
}
