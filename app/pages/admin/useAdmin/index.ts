// pages/admin/useAdmin/index.ts

// Export all types
export type {
  HistoryFilter,
  HistoryRecord,
  PaginationState,
  RestoreDiff,
  SearchSuggestion,
  SearchTag,
  SortingState,
  UseCategoriesResult,
  UseCreatorsParams,
  UseCreatorsResult,
  UseHistoryParams,
  UseHistoryResult,
  UseSearchResult
} from './types'

// Export hooks
export { useCategories } from './useCategories'
export { useCreators } from './useCreators'
export { useHistory } from './useHistory'
export { useSearchSuggestions } from './useSearch'

// Export history operations
export { clearHistory, deleteFromHistory, getRestoreDiff, restoreCreator } from './useHistory'
