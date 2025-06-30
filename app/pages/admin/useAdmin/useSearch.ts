// pages/admin/useAdmin/useSearch.ts
import { useEffect, useState } from 'react'
import { supabase } from '~/lib/client'
import type { SearchSuggestion, SearchTag, UseSearchResult } from './types'

export function useSearchSuggestions(
  searchTerm: string,
  existingTags: SearchTag[] = []
): UseSearchResult {
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
