// pages/admin/useAdmin/useCategories.ts
import { useEffect, useState } from 'react'
import { supabase } from '~/lib/client'
import type { UseCategoriesResult } from './types'

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
