// app/pages/admin/useAdmin/__tests__/useHistory.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { http, HttpResponse } from 'msw'
import { beforeEach, describe, expect, it } from 'vitest'
import { testDataHelpers } from '~/../tests/data'
import { resetWorkingData } from '~/../tests/mocks/handlers'
import { server } from '~/../tests/mocks/server'
import type { HistoryFilter, PaginationState, SortingState } from '../types'
import {
  clearHistory,
  deleteFromHistory,
  getRestoreDiff,
  restoreCreator,
  useHistory
} from '../useHistory'

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
      // Override MSW to return actual test data
      const testHistoryData = testDataHelpers.historyData()
      const totalHistory = testDataHelpers.totalHistory()

      server.use(
        http.get('*/rest/v1/creator_history', () => {
          const pageSize = 20
          const firstPage = testHistoryData.slice(0, pageSize)

          return HttpResponse.json(firstPage, {
            headers: {
              'Content-Range': `0-${firstPage.length - 1}/${totalHistory}`
            }
          })
        })
      )

      const { result } = renderHook(() => useHistory(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.history).toBeDefined()
      expect(result.current.error).toBe(null)

      // Handle case where test data might be empty
      if (totalHistory > 0) {
        expect(result.current.totalCount).toBe(totalHistory)
        expect(result.current.history.length).toBeGreaterThan(0)

        // Verify history record structure
        const firstRecord = result.current.history[0]
        expect(firstRecord).toHaveProperty('history_id')
        expect(firstRecord).toHaveProperty('creator_id')
        expect(firstRecord).toHaveProperty('action')
        expect(firstRecord).toHaveProperty('action_date')
        expect(firstRecord).toHaveProperty('name')
        expect(firstRecord).toHaveProperty('category')
      } else {
        // If no test data, just verify the hook works
        expect(result.current.totalCount).toBe(0)
        expect(result.current.history).toEqual([])
      }
    })
  })

  describe('Date Filtering', () => {
    it('should filter by dateFrom', async () => {
      const params = {
        ...defaultParams,
        filters: { dateFrom: '2024-01-01' }
      }

      const { result } = renderHook(() => useHistory(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // All returned records should be on or after the dateFrom
      result.current.history.forEach(record => {
        expect(record.action_date >= '2024-01-01').toBe(true)
      })

      expect(result.current.error).toBe(null)
    })

    it('should filter by dateTo', async () => {
      const params = {
        ...defaultParams,
        filters: { dateTo: '2024-12-31' }
      }

      const { result } = renderHook(() => useHistory(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // All returned records should be on or before the dateTo
      result.current.history.forEach(record => {
        expect(record.action_date <= '2024-12-31').toBe(true)
      })

      expect(result.current.error).toBe(null)
    })

    it('should filter by date range (dateFrom and dateTo)', async () => {
      const params = {
        ...defaultParams,
        filters: {
          dateFrom: '2024-01-01',
          dateTo: '2024-12-31'
        }
      }

      const { result } = renderHook(() => useHistory(params))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // All returned records should be within the date range
      result.current.history.forEach(record => {
        expect(record.action_date >= '2024-01-01').toBe(true)
        expect(record.action_date <= '2024-12-31').toBe(true)
      })

      expect(result.current.error).toBe(null)
    })
  })

  describe('Action Filtering with Fixed MSW', () => {
    it('should filter by create actions', async () => {
      // Override MSW to ensure we get create action data
      server.use(
        http.get('*/rest/v1/creator_history', ({ request }) => {
          const url = new URL(request.url)
          const actionParam = url.searchParams.get('action')

          if (actionParam === 'eq.create') {
            const mockCreateRecords = [
              {
                history_id: 1,
                creator_id: 1,
                action: 'create',
                action_date: '2024-01-01',
                id: 1,
                name: 'Test Creator 1',
                description: 'Test Description',
                url: 'https://test1.com',
                image_url: undefined,
                category: 'Test Category',
                created_at: '2024-01-01',
                updated_at: '2024-01-01'
              }
            ]

            return HttpResponse.json(mockCreateRecords, {
              headers: {
                'Content-Range': `0-0/${mockCreateRecords.length}`
              }
            })
          }

          return HttpResponse.json([])
        })
      )

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

      expect(result.current.error).toBe(null)
    })

    it('should filter by update actions', async () => {
      // Override MSW to ensure we get update action data
      server.use(
        http.get('*/rest/v1/creator_history', ({ request }) => {
          const url = new URL(request.url)
          const actionParam = url.searchParams.get('action')

          if (actionParam === 'eq.update') {
            const mockUpdateRecords = [
              {
                history_id: 2,
                creator_id: 2,
                action: 'update',
                action_date: '2024-01-02',
                id: 2,
                name: 'Test Creator 2',
                description: 'Updated Description',
                url: 'https://test2.com',
                image_url: undefined,
                category: 'Test Category',
                created_at: '2024-01-01',
                updated_at: '2024-01-02'
              }
            ]

            return HttpResponse.json(mockUpdateRecords, {
              headers: {
                'Content-Range': `0-0/${mockUpdateRecords.length}`
              }
            })
          }

          return HttpResponse.json([])
        })
      )

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

      expect(result.current.error).toBe(null)
    })
  })

  describe('Error Handling with Proper MSW', () => {
    it('should handle supabase errors', async () => {
      // Override MSW to return proper Supabase error
      server.use(
        http.get('*/rest/v1/creator_history', () => {
          return new HttpResponse(null, {
            status: 400,
            statusText: 'Bad Request'
          })
        })
      )

      const { result } = renderHook(() => useHistory(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.error).toBeTruthy()
      expect(result.current.history).toEqual([])
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

  describe('Sorting', () => {
    it('should sort by action_date descending by default', async () => {
      // Override MSW to return multiple records for sorting test
      server.use(
        http.get('*/rest/v1/creator_history', () => {
          const mockRecords = [
            {
              history_id: 1,
              creator_id: 1,
              action: 'create',
              action_date: '2024-01-03',
              id: 1,
              name: 'Test Creator 1',
              description: 'Test Description',
              url: 'https://test1.com',
              image_url: undefined,
              category: 'Test Category',
              created_at: '2024-01-01',
              updated_at: '2024-01-01'
            },
            {
              history_id: 2,
              creator_id: 2,
              action: 'update',
              action_date: '2024-01-01',
              id: 2,
              name: 'Test Creator 2',
              description: 'Test Description',
              url: 'https://test2.com',
              image_url: undefined,
              category: 'Test Category',
              created_at: '2024-01-01',
              updated_at: '2024-01-01'
            }
          ]

          return HttpResponse.json(mockRecords, {
            headers: {
              'Content-Range': `0-1/${mockRecords.length}`
            }
          })
        })
      )

      const { result } = renderHook(() => useHistory(defaultParams))

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      if (result.current.history.length > 1) {
        const dates = result.current.history.map(record => new Date(record.action_date))

        // Verify descending order (newest first)
        for (let i = 0; i < dates.length - 1; i++) {
          expect(dates[i].getTime()).toBeGreaterThanOrEqual(dates[i + 1].getTime())
        }
      }
    })
  })
})

describe('History Operations', () => {
  beforeEach(() => {
    resetWorkingData()
  })

  describe('restoreCreator', () => {
    it('should restore a creator successfully', async () => {
      // Override MSW to return success for all operations
      server.use(
        http.get('*/rest/v1/creators', () => {
          return HttpResponse.json([])
        }),
        http.post('*/rest/v1/creators', () => {
          return HttpResponse.json({ id: 999 }, { status: 201 })
        }),
        http.post('*/rest/v1/rpc/cleanup_creator_history', () => {
          return HttpResponse.json({ success: true })
        })
      )

      const mockHistoryRecord = {
        history_id: 1,
        creator_id: 999,
        action: 'delete' as const,
        action_date: '2024-01-01',
        id: 999,
        name: 'Test Creator',
        description: 'Test Description',
        url: 'https://test.com',
        image_url: undefined,
        category: 'Test Category',
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      }

      await expect(restoreCreator(mockHistoryRecord)).resolves.not.toThrow()
    })

    it('should handle restore errors', async () => {
      // Override MSW to return error
      server.use(
        http.get('*/rest/v1/creators', () => {
          return HttpResponse.json([])
        }),
        http.post('*/rest/v1/creators', () => {
          return HttpResponse.json({ error: 'Restore failed' }, { status: 500 })
        })
      )

      const mockHistoryRecord = {
        history_id: 1,
        creator_id: 999,
        action: 'delete' as const,
        action_date: '2024-01-01',
        id: 999,
        name: 'Test Creator',
        description: 'Test Description',
        url: 'https://test.com',
        image_url: undefined,
        category: 'Test Category',
        created_at: '2024-01-01',
        updated_at: '2024-01-01'
      }

      await expect(restoreCreator(mockHistoryRecord)).rejects.toThrow()
    })
  })

  describe('deleteFromHistory', () => {
    it('should delete from history successfully', async () => {
      server.use(
        http.delete('*/rest/v1/creator_history', () => {
          return HttpResponse.json({}, { status: 204 })
        })
      )

      await expect(deleteFromHistory(1)).resolves.not.toThrow()
    })

    it('should handle delete errors', async () => {
      server.use(
        http.delete('*/rest/v1/creator_history', () => {
          return HttpResponse.json({ error: 'Delete failed' }, { status: 500 })
        })
      )

      await expect(deleteFromHistory(1)).rejects.toThrow()
    })
  })

  describe('clearHistory', () => {
    it('should clear all history successfully', async () => {
      server.use(
        http.delete('*/rest/v1/creator_history', () => {
          return HttpResponse.json({}, { status: 204 })
        })
      )

      await expect(clearHistory()).resolves.not.toThrow()
    })

    it('should handle clear errors', async () => {
      server.use(
        http.delete('*/rest/v1/creator_history', () => {
          return HttpResponse.json({ error: 'Clear failed' }, { status: 500 })
        })
      )

      await expect(clearHistory()).rejects.toThrow()
    })
  })

  describe('getRestoreDiff', () => {
    it('should get restore diff successfully', async () => {
      server.use(
        http.post('*/rest/v1/rpc/get_creator_restore_diff', () => {
          return HttpResponse.json([
            {
              field_name: 'name',
              current_value: 'Current Name',
              restore_value: 'Historical Name',
              will_change: true
            }
          ])
        })
      )

      const result = await getRestoreDiff(1)

      expect(result).toHaveProperty('data')
      expect(result).toHaveProperty('error')
      expect(Array.isArray(result.data)).toBe(true)
      expect(result.error).toBe(null)
    })

    it('should handle restore diff errors', async () => {
      server.use(
        http.post('*/rest/v1/rpc/get_creator_restore_diff', () => {
          return HttpResponse.json({ error: 'Restore diff failed' }, { status: 500 })
        })
      )

      const result = await getRestoreDiff(1)

      expect(result.error).toBeTruthy()
      expect(result.data).toEqual([])
    })
  })
})
