// pages/admin/useAdmin/types.ts
import type { Creator } from '~/lib/client'

// Shared pagination and sorting types
export interface PaginationState {
  pageIndex: number
  pageSize: number
}

export interface SortingState {
  id: string
  desc: boolean
}

// Search functionality types
export interface SearchTag {
  type: 'name' | 'description' | 'category'
  value: string
  displayText: string
}

export interface SearchSuggestion {
  source_type: 'name' | 'description' | 'category'
  match_words: string
  highlighted_text: string
  category: string
}

// History functionality types
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

export interface RestoreDiff {
  field_name: string
  current_value: string | null
  restore_value: string | null
  will_change: boolean
}

export interface HistoryFilter {
  action?: 'create' | 'update' | 'delete'
  dateFrom?: string
  dateTo?: string
}

// Hook parameter and result types
export interface UseCreatorsParams {
  pagination: PaginationState
  sorting: SortingState[]
  searchTags: SearchTag[]
}

export interface UseCreatorsResult {
  creators: Creator[]
  totalCount: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export interface UseHistoryParams {
  pagination: PaginationState
  sorting: SortingState[]
  filters: HistoryFilter
}

export interface UseHistoryResult {
  history: HistoryRecord[]
  totalCount: number
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

export interface UseCategoriesResult {
  categories: string[]
  isLoading: boolean
  error: string | null
}

export interface UseSearchResult {
  suggestions: SearchSuggestion[]
  isLoading: boolean
  error: string | null
}
