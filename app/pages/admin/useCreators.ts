// pages/admin/useCreators.ts
import { useEffect, useState } from 'react'
import { supabase, type Creator } from '~/lib/client'

// Shared types
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

// Creators functionality
interface UseCreatorsParams {
  pagination: PaginationState
  sorting: SortingState[]
  searchTags: SearchTag[]
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
  searchTags
}: UseCreatorsParams): UseCreatorsResult {
  const [creators, setCreators] = useState<Creator[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCreators = async () => {
    try {
      setIsLoading(true)
      setError(null) // Clear previous errors

      const from = pagination.pageIndex * pagination.pageSize
      const to = from + pagination.pageSize - 1

      let query = supabase.from('creators').select('*', { count: 'exact' }).range(from, to)

      if (sorting.length > 0) {
        sorting.forEach(sort => {
          query = query.order(sort.id, { ascending: !sort.desc })
        })
      } else {
        query = query.order('category', { ascending: true }).order('name', { ascending: true })
      }

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
        throw new Error(supabaseError.message || 'Failed to fetch creators')
      }

      setCreators(data || [])
      setTotalCount(count || 0)
    } catch (err) {
      console.error('Error fetching creators:', err)
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch creators'
      setError(errorMessage)
      // Don't reset totalCount on error for empty pages - keep previous value
      setCreators([])
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

// History functionality
export interface HistoryRecord {
  history_id: number
  creator_id: number
  action: 'create' | 'update' | 'delete'
  action_date: string
  // Creator data at time of action
  id: number
  name: string
  description: string
  url: string
  image_url?: string
  category: string
  created_at: string
  updated_at: string
}

// Restore diff functionality
export interface RestoreDiff {
  field_name: string
  current_value: string | null
  restore_value: string | null
  will_change: boolean
}

interface HistoryFilter {
  action?: 'create' | 'update' | 'delete'
  dateFrom?: string
  dateTo?: string
}

interface UseHistoryParams {
  pagination: PaginationState
  sorting: SortingState[]
  filters: HistoryFilter
}

interface UseHistoryResult {
  history: HistoryRecord[]
  totalCount: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export function useHistory({ pagination, sorting, filters }: UseHistoryParams): UseHistoryResult {
  const [history, setHistory] = useState<HistoryRecord[]>([])
  const [totalCount, setTotalCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchHistory = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const from = pagination.pageIndex * pagination.pageSize
      const to = from + pagination.pageSize - 1

      let query = supabase.from('creator_history').select('*', { count: 'exact' }).range(from, to)

      // Apply sorting
      if (sorting.length > 0) {
        sorting.forEach(sort => {
          query = query.order(sort.id, { ascending: !sort.desc })
        })
      } else {
        // Default: newest first
        query = query.order('action_date', { ascending: false })
      }

      // Apply filters
      if (filters.action) {
        query = query.eq('action', filters.action)
      }
      if (filters.dateFrom) {
        query = query.gte('action_date', filters.dateFrom)
      }
      if (filters.dateTo) {
        query = query.lte('action_date', filters.dateTo)
      }

      const { data, error: supabaseError, count } = await query

      if (supabaseError) {
        throw supabaseError
      }

      setHistory(data || [])
      setTotalCount(count || 0)
    } catch (err) {
      console.error('Error fetching history:', err)
      setError(err instanceof Error ? err.message : 'Failed to fetch history')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchHistory()
  }, [pagination.pageIndex, pagination.pageSize, sorting, filters])

  return {
    history,
    totalCount,
    isLoading,
    error,
    refetch: fetchHistory
  }
}

// History operations
export async function restoreCreator(historyRecord: HistoryRecord): Promise<void> {
  try {
    // Check if creator exists
    const { data: existingCreator } = await supabase
      .from('creators')
      .select('id')
      .eq('id', historyRecord.creator_id)
      .single()

    const creatorData = {
      name: historyRecord.name,
      description: historyRecord.description,
      url: historyRecord.url,
      image_url: historyRecord.image_url,
      category: historyRecord.category,
      updated_at: new Date().toISOString()
    }

    if (existingCreator) {
      // UPDATE existing creator
      const { error } = await supabase
        .from('creators')
        .update(creatorData)
        .eq('id', historyRecord.creator_id)

      if (error) throw error
    } else {
      // INSERT new creator
      const { error } = await supabase.from('creators').insert({
        id: historyRecord.creator_id,
        ...creatorData,
        created_at: historyRecord.created_at
      })

      if (error) throw error
    }

    // Run cleanup after restore
    await supabase.rpc('cleanup_creator_history')
  } catch (error) {
    console.error('Error restoring creator:', error)
    throw error
  }
}

export async function deleteFromHistory(historyId: number): Promise<void> {
  try {
    const { error } = await supabase.from('creator_history').delete().eq('history_id', historyId)

    if (error) throw error
  } catch (error) {
    console.error('Error deleting from history:', error)
    throw error
  }
}

export async function clearHistory(filters?: HistoryFilter): Promise<void> {
  try {
    let query = supabase.from('creator_history').delete()

    // Apply filters if provided (for filtered clear)
    if (filters?.action) {
      query = query.eq('action', filters.action)
    }
    if (filters?.dateFrom) {
      query = query.gte('action_date', filters.dateFrom)
    }
    if (filters?.dateTo) {
      query = query.lte('action_date', filters.dateTo)
    }

    // If no filters, clear all
    if (!filters?.action && !filters?.dateFrom && !filters?.dateTo) {
      query = query.neq('history_id', 0) // Clear all records
    }

    const { error } = await query

    if (error) throw error
  } catch (error) {
    console.error('Error clearing history:', error)
    throw error
  }
}

// Get restore diff
export async function getRestoreDiff(historyId: number): Promise<{
  data: RestoreDiff[]
  error: string | null
}> {
  try {
    const { data, error } = await supabase.rpc('get_creator_restore_diff', {
      history_record_id: historyId
    })

    if (error) throw error

    return { data: data || [], error: null }
  } catch (err) {
    console.error('Error fetching restore diff:', err)
    return {
      data: [],
      error: err instanceof Error ? err.message : 'Failed to fetch restore diff'
    }
  }
}

// Search suggestions (existing)
export interface SearchSuggestion {
  source_type: 'name' | 'description' | 'category'
  match_words: string
  highlighted_text: string
  category: string
}

export function useSearchSuggestions(searchTerm: string, existingTags: SearchTag[] = []) {
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!searchTerm || searchTerm.trim().length < 2) {
      setSuggestions([])
      setIsLoading(false)
      return
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Convert tags to JSON format for PostgreSQL
        const tagsJson = existingTags.map(tag => ({
          type: tag.type,
          value: tag.value
        }))

        const { data, error: supabaseError } = await supabase.rpc('get_search_words_with_filters', {
          search_term: searchTerm.trim(),
          existing_tags: tagsJson
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
    }, 400) // 400ms debounce

    return () => clearTimeout(timeoutId)
  }, [searchTerm, existingTags]) // Add existingTags dependency

  return {
    suggestions,
    isLoading,
    error
  }
}

// Categories functionality
interface UseCategoriesResult {
  categories: string[]
  isLoading: boolean
  error: string | null
}

export function useCategories(): UseCategoriesResult {
  const [categories, setCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const { data, error: supabaseError } = await supabase
          .from('creators')
          .select('category')
          .not('category', 'is', null)
          .order('category')

        if (supabaseError) {
          throw supabaseError
        }

        // Extract unique categories
        const uniqueCategories = Array.from(new Set(data?.map(item => item.category) || []))
        setCategories(uniqueCategories)
      } catch (err) {
        console.error('Error fetching categories:', err)
        setError(err instanceof Error ? err.message : 'Failed to fetch categories')
      } finally {
        setIsLoading(false)
      }
    }

    fetchCategories()
  }, [])

  return {
    categories,
    isLoading,
    error
  }
}

// Export shared types
export type { HistoryFilter, PaginationState, SearchTag, SortingState }
