// pages/admin/useAdmin/useHistory.ts
import { useEffect, useState } from 'react'
import { supabase } from '~/lib/client'
import type {
  HistoryFilter,
  HistoryRecord,
  RestoreDiff,
  UseHistoryParams,
  UseHistoryResult
} from './types'

// History hook
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
