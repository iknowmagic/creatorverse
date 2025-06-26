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
  searchTags: SearchTag[] // Changed from globalFilter: string
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
  searchTags // Changed from globalFilter
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
      let query = supabase.from('creators').select('*', { count: 'exact' }).range(from, to)

      // Apply sorting
      if (sorting.length > 0) {
        const sort = sorting[0] // TanStack Table sends array, we use first item
        query = query.order(sort.id, { ascending: !sort.desc })
      } else {
        // Default sort by created_at desc
        query = query.order('created_at', { ascending: false })
      }

      // Replace globalFilter logic with searchTags logic
      if (searchTags.length > 0) {
        const conditions: string[] = []

        searchTags.forEach(tag => {
          switch (tag.type) {
            case 'name':
              conditions.push(`name.ilike.%${tag.value}%`)
              break
            case 'category':
              conditions.push(`category.ilike.%${tag.value}%`)
              break
            case 'description':
              conditions.push(`description.ilike.%${tag.value}%`)
              break
          }
        })

        if (conditions.length > 0) {
          query = query.or(conditions.join(','))
        }
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
  }, [pagination.pageIndex, pagination.pageSize, sorting, searchTags]) // Updated dependency

  return {
    creators,
    totalCount,
    isLoading,
    error,
    refetch: fetchCreators
  }
}

// Updated SearchSuggestion interface
export interface SearchSuggestion {
  source_type: 'name' | 'description' | 'category'
  match_words: string // New: the actual matched word
  highlighted_text: string
  category: string
}

export interface SearchTag {
  type: 'name' | 'description' | 'category'
  value: string
  displayText: string
}

// Add this hook at the bottom of the file
export function useSearchSuggestions(searchTerm: string) {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Clear suggestions if search term is too short
    if (!searchTerm || searchTerm.trim().length < 2) {
      setSuggestions([])
      setIsLoading(false)
      return
    }

    // Debounce the search
    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Updated RPC call
        const { data, error: supabaseError } = await supabase.rpc('get_search_words', {
          search_term: searchTerm.trim()
        })

        if (supabaseError) {
          throw supabaseError
        }

        setSuggestions(data || [])
      } catch (err) {
        console.error('Error fetching search suggestions:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch suggestions')
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }, 1000) // 1 second debounce

    // Cleanup timeout on unmount or searchTerm change
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  return {
    suggestions,
    isLoading,
    error
  }
}
