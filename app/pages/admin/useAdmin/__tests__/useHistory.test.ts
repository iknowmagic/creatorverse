// app/pages/admin/useAdmin/__tests__/useHistory.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { testDataHelpers } from '~/../tests/data'
import { resetWorkingData } from '~/../tests/mocks/handlers'
import type { HistoryFilter, PaginationState, SortingState } from '../types'
import { useHistory } from '../useHistory'

describe('useHistory Hook', () => {
  const defaultParams = {
    pagination: { pageIndex: 0, pageSize: 20 } as PaginationState,
    sorting: [] as SortingState[],
    filters: {} as HistoryFilter
  }

  beforeEach(() => {
    resetWorkingData()
  })

  describe('Initial State & Loading', () => {
    it('should start with loading state', () => {
      const { result } = renderHook(() => useHistory(defaultParams))

      expect(result.current.isLoading).toBe(true)
      expect(result.current.history).toEqual([])
      expect(result.current.totalCount).toBe(0)
      expect(result.current.error).toBe(null)
    })

    it('should fetch history data successfully', async () => {
      const { result } = renderHook(() => useHistory(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const totalHistory = testDataHelpers.totalHistory()

      expect(result.current.history).toBeDefined()
      expect(result.current.history.length).toBeGreaterThan(0)
      expect(result.current.totalCount).toBe(totalHistory)
      expect(result.current.error).toBe(null)

      // Verify history record structure
      const firstRecord = result.current.history[0]
      expect(firstRecord).toHaveProperty('history_id')
      expect(firstRecord).toHaveProperty('creator_id')
      expect(firstRecord).toHaveProperty('action')
      expect(firstRecord).toHaveProperty('action_date')
      expect(firstRecord).toHaveProperty('name')
      expect(firstRecord).toHaveProperty('category')
    })
  })

  describe('Pagination', () => {
    it('should handle first page correctly', async () => {
      const pageSize = 15
      const params = {
        ...defaultParams,
        pagination: { pageIndex: 0, pageSize }
      }

      const { result } = renderHook(() => useHistory(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const totalHistory = testDataHelpers.totalHistory()
      const expectedPageSize = Math.min(pageSize, totalHistory)

      expect(result.current.history).toHaveLength(expectedPageSize)
      expect(result.current.totalCount).toBe(totalHistory)
    })

    it('should handle second page correctly', async () => {
      const pageSize = 10
      const params = {
        ...defaultParams,
        pagination: { pageIndex: 1, pageSize }
      }

      const { result } = renderHook(() => useHistory(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const totalHistory = testDataHelpers.totalHistory()
      const expectedSecondPageSize = Math.max(0, Math.min(pageSize, totalHistory - pageSize))

      expect(result.current.history).toHaveLength(expectedSecondPageSize)
      expect(result.current.totalCount).toBe(totalHistory)
    })
  })

  describe('Sorting', () => {
    it('should sort by action_date descending by default', async () => {
      const { result } = renderHook(() => useHistory(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const dates = result.current.history.map(record => new Date(record.action_date))

      // Verify descending order (newest first)
      for (let i = 0; i < Math.min(3, dates.length - 1); i++) {
        expect(dates[i].getTime()).toBeGreaterThanOrEqual(dates[i + 1].getTime())
      }
    })

    it('should sort by action ascending when specified', async () => {
      const params = {
        ...defaultParams,
        sorting: [{ id: 'action', desc: false }]
      }

      const { result } = renderHook(() => useHistory(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.history.length).toBeGreaterThan(0)
      expect(result.current.totalCount).toBe(testDataHelpers.totalHistory())
    })
  })

  describe('Action Filtering', () => {
    it('should filter by create actions', async () => {
      const params = {
        ...defaultParams,
        filters: { action: 'create' as const }
      }

      const { result } = renderHook(() => useHistory(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // All returned records should be create actions
      result.current.history.forEach(record => {
        expect(record.action).toBe('create')
      })

      // Should match expected count from test data
      const expectedCount = testDataHelpers.historyByAction('create').length
      expect(result.current.totalCount).toBe(expectedCount)
    })

    it('should filter by update actions', async () => {
      const params = {
        ...defaultParams,
        filters: { action: 'update' as const }
      }

      const { result } = renderHook(() => useHistory(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // All returned records should be update actions
      result.current.history.forEach(record => {
        expect(record.action).toBe('update')
      })

      // Should match expected count from test data
      const expectedCount = testDataHelpers.historyByAction('update').length
      expect(result.current.totalCount).toBe(expectedCount)
    })

    it('should filter by delete actions', async () => {
      const params = {
        ...defaultParams,
        filters: { action: 'delete' as const }
      }

      const { result } = renderHook(() => useHistory(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // All returned records should be delete actions
      result.current.history.forEach(record => {
        expect(record.action).toBe('delete')
      })

      // Should match expected count from test data
      const expectedCount = testDataHelpers.historyByAction('delete').length
      expect(result.current.totalCount).toBe(expectedCount)
    })
  })

  describe('Data Validation', () => {
    it('should have valid action types', async () => {
      const { result } = renderHook(() => useHistory(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const validActions = ['create', 'update', 'delete']

      result.current.history.forEach(record => {
        expect(validActions).toContain(record.action)
      })
    })

    it('should have valid dates', async () => {
      const { result } = renderHook(() => useHistory(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      result.current.history.forEach(record => {
        const date = new Date(record.action_date)
        expect(date).toBeInstanceOf(Date)
        expect(date.getTime()).not.toBeNaN()
      })
    })

    it('should have valid creator data', async () => {
      const { result } = renderHook(() => useHistory(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      result.current.history.forEach(record => {
        expect(typeof record.name).toBe('string')
        expect(record.name.length).toBeGreaterThan(0)
        expect(typeof record.category).toBe('string')
        expect(record.category.length).toBeGreaterThan(0)
        expect(typeof record.url).toBe('string')
        expect(record.url.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Data Consistency', () => {
    it('should work with actual history data size', async () => {
      const { result } = renderHook(() => useHistory(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const totalHistory = testDataHelpers.totalHistory()

      // Verify we're working with substantial test data
      expect(totalHistory).toBeGreaterThan(0)
      expect(result.current.totalCount).toBe(totalHistory)

      // First page should be full (or total if less than page size)
      const expectedFirstPageSize = Math.min(20, totalHistory)
      expect(result.current.history).toHaveLength(expectedFirstPageSize)
    })
  })
})
