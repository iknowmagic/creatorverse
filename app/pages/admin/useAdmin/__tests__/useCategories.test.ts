import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { testData } from '~/../tests/data'
import { createSupabaseMock, mockResponses } from '~/../tests/mocks/supabase'

// Mock Supabase
vi.mock('~/lib/client', () => createSupabaseMock())

import { supabase } from '~/lib/client'
import { useCategories } from '../useCategories'

describe('useCategories Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Initial State & Loading', () => {
    it('should start with loading state', () => {
      const { result } = renderHook(() => useCategories())

      expect(result.current.isLoading).toBe(true)
      expect(result.current.categories).toEqual([])
      expect(result.current.error).toBe(null)
    })

    it('should fetch categories successfully', async () => {
      // Mock response
      const categoriesData = mockResponses.categories.all().map(cat => ({ category: cat }))
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          not: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({
              data: categoriesData,
              error: null
            })
          })
        })
      } as any)

      const { result } = renderHook(() => useCategories())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.categories).toBeDefined()
      expect(result.current.categories.length).toBeGreaterThan(0)
      expect(result.current.error).toBe(null)
    })
  })

  describe('Categories Data', () => {
    beforeEach(() => {
      const categoriesData = mockResponses.categories.all().map(cat => ({ category: cat }))
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          not: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({
              data: categoriesData,
              error: null
            })
          })
        })
      } as any)
    })

    it('should return expected categories from test data', async () => {
      const { result } = renderHook(() => useCategories())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const expectedCategories = testData.categories.all()
      expect(result.current.categories).toHaveLength(expectedCategories.length)
      expect(result.current.categories).toEqual(expect.arrayContaining(expectedCategories))
    })

    it('should return categories in sorted order', async () => {
      const { result } = renderHook(() => useCategories())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const categories = result.current.categories
      const sortedCategories = [...categories].sort()
      expect(categories).toEqual(sortedCategories)
    })

    it('should return unique categories only', async () => {
      const { result } = renderHook(() => useCategories())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const categories = result.current.categories
      const uniqueCategories = Array.from(new Set(categories))
      expect(categories).toEqual(uniqueCategories)
    })

    it('should not include null or empty categories', async () => {
      const { result } = renderHook(() => useCategories())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const categories = result.current.categories
      expect(categories).not.toContain(null)
      expect(categories).not.toContain(undefined)
      expect(categories).not.toContain('')

      categories.forEach(category => {
        expect(typeof category).toBe('string')
        expect(category.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Data Consistency', () => {
    beforeEach(() => {
      const categoriesData = mockResponses.categories.all().map(cat => ({ category: cat }))
      vi.mocked(supabase.from).mockReturnValue({
        select: vi.fn().mockReturnValue({
          not: vi.fn().mockReturnValue({
            order: vi.fn().mockResolvedValue({
              data: categoriesData,
              error: null
            })
          })
        })
      } as any)
    })

    it('should match categories available in creators data', async () => {
      const { result } = renderHook(() => useCategories())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const categoriesFromCreators = Array.from(
        new Set(testData.creators.all().map(creator => creator.category))
      ).sort()

      expect(result.current.categories).toEqual(categoriesFromCreators)
    })

    it('should have reasonable number of categories', async () => {
      const { result } = renderHook(() => useCategories())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      expect(result.current.categories.length).toBeGreaterThanOrEqual(3)
      expect(result.current.categories.length).toBeLessThanOrEqual(20)
    })
  })
})
