import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { testData } from '~/../tests/data'
import { createSupabaseMock, mockResponses } from '~/../tests/mocks/supabase'

// Mock Supabase
vi.mock('~/lib/client', () => createSupabaseMock())

// Import after mocking
import { supabase } from '~/lib/client'
import {
  clearHistory,
  deleteFromHistory,
  getRestoreDiff,
  restoreCreator,
  useHistory
} from '../useHistory'

describe('useHistory Hook', () => {
  const defaultParams = {
    pagination: { pageIndex: 0, pageSize: 20 },
    sorting: [],
    filters: {}
  }

  beforeEach(() => {
    vi.clearAllMocks()

    // Setup default successful response for useHistory hook
    const historyData = testData.history.page(0, 20)
    const totalCount = testData.history.count()

    const mockChain = {
      range: vi.fn().mockReturnValue({
        order: vi.fn().mockResolvedValue({
          data: historyData,
          count: totalCount,
          error: null
        })
      })
    }

    vi.mocked(supabase.from).mockReturnValue({
      select: vi.fn().mockReturnValue(mockChain)
    } as any)
  })

  describe('Initial State & Loading', () => {
    it('should fetch history data successfully', async () => {
      const { result } = renderHook(() => useHistory(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const totalHistory = testData.history.count()
      expect(result.current.totalCount).toBe(totalHistory)
      expect(result.current.history.length).toBeGreaterThan(0)
      expect(result.current.error).toBe(null)

      // Verify history record structure
      if (result.current.history.length > 0) {
        const firstRecord = result.current.history[0]
        expect(firstRecord).toHaveProperty('history_id')
        expect(firstRecord).toHaveProperty('creator_id')
        expect(firstRecord).toHaveProperty('action')
        expect(firstRecord).toHaveProperty('action_date')
        expect(firstRecord).toHaveProperty('name')
        expect(firstRecord).toHaveProperty('category')
      }
    })

    it('should handle supabase errors', async () => {
      // Mock error response
      const mockChain = {
        range: vi.fn().mockReturnValue({
          order: vi.fn().mockResolvedValue({
            data: null,
            count: 0,
            error: { message: 'Database error' }
          })
        })
      }

      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue(mockChain)
      } as any)

      const { result } = renderHook(() => useHistory(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBeTruthy()
      expect(result.current.history).toEqual([])
    })
  })
})

// Test the operations with proper mocking
describe('History Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    // Mock all the database operations needed for history operations
    vi.mocked(supabase.from).mockImplementation((table: string) => {
      if (table === 'creators') {
        return {
          select: vi.fn().mockReturnValue({
            eq: vi.fn().mockReturnValue({
              single: vi.fn().mockResolvedValue({ data: null, error: null })
            })
          }),
          update: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ data: {}, error: null })
          }),
          insert: vi.fn().mockResolvedValue({ data: {}, error: null })
        }
      } else if (table === 'creator_history') {
        return {
          delete: vi.fn().mockReturnValue({
            eq: vi.fn().mockResolvedValue({ data: {}, error: null }),
            neq: vi.fn().mockResolvedValue({ data: {}, error: null }) // This was the missing piece!
          })
        }
      }
      return {} as any
    })

    vi.mocked(supabase.rpc).mockResolvedValue({ data: {}, error: null })
  })

  describe('restoreCreator', () => {
    it('should restore a creator successfully', async () => {
      const mockHistoryRecord = {
        history_id: 1,
        creator_id: 999,
        action: 'delete' as const,
        action_date: '2024-01-01',
        id: 999,
        name: 'Test Creator',
        description: 'Test Description',
        url: 'https://test.com',
        image_url: null,
        category: 'Test Category',
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      }

      await expect(restoreCreator(mockHistoryRecord)).resolves.not.toThrow()
    })
  })

  describe('deleteFromHistory', () => {
    it('should delete from history successfully', async () => {
      await expect(deleteFromHistory(1)).resolves.not.toThrow()
    })
  })

  describe('clearHistory', () => {
    it('should clear all history successfully', async () => {
      // This test was failing because neq wasn't properly mocked
      await expect(clearHistory()).resolves.not.toThrow()
    })
  })

  describe('getRestoreDiff', () => {
    it('should get restore diff successfully', async () => {
      vi.mocked(supabase.rpc).mockResolvedValue({
        data: mockResponses.restoreDiff(),
        error: null
      })

      const result = await getRestoreDiff(1)

      expect(result).toHaveProperty('data')
      expect(result).toHaveProperty('error')
      expect(Array.isArray(result.data)).toBe(true)
      expect(result.error).toBe(null)
    })
  })
})
