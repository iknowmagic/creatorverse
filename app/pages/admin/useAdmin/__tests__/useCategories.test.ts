// app/pages/admin/useAdmin/__tests__/useCategories.test.ts
import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it } from 'vitest'
import { categoriesData, testDataHelpers } from '~/../tests/data'
import { resetWorkingData } from '~/../tests/mocks/handlers'
import { useCategories } from '../useCategories'

describe('useCategories Hook', () => {
  beforeEach(() => {
    resetWorkingData()
  })

  describe('Initial State & Loading', () => {
    it('should start with loading state', () => {
      const { result } = renderHook(() => useCategories())

      expect(result.current.isLoading).toBe(true)
      expect(result.current.categories).toEqual([])
      expect(result.current.error).toBe(null)
    })

    it('should fetch categories successfully', async () => {
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
    it('should return expected categories from test data', async () => {
      const { result } = renderHook(() => useCategories())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      const expectedCategories = categoriesData()

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

      // All categories should be non-empty strings
      categories.forEach(category => {
        expect(typeof category).toBe('string')
        expect(category.length).toBeGreaterThan(0)
      })
    })
  })

  describe('Data Consistency', () => {
    it('should match categories available in creators data', async () => {
      const { result } = renderHook(() => useCategories())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Get categories from creators data
      const creatorsData = testDataHelpers.creatorsData()
      const categoriesFromCreators = Array.from(
        new Set(creatorsData.map(creator => creator.category))
      ).sort()

      expect(result.current.categories).toEqual(categoriesFromCreators)
    })

    it('should have reasonable number of categories', async () => {
      const { result } = renderHook(() => useCategories())

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false)
      })

      // Based on your curated dataset, should have multiple but not too many categories
      expect(result.current.categories.length).toBeGreaterThanOrEqual(3)
      expect(result.current.categories.length).toBeLessThanOrEqual(20)
    })
  })
})
