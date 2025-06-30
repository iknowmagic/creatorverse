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
  }, [pagination.pageIndex, pagination.pageSize, sorting, searchTags])

  return {
    creators,
    totalCount,
    isLoading,
    error,
    refetch: fetchCreators
  }
}
