import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createSupabaseMock } from '~/../tests/mocks/supabase'

// Mock Supabase
vi.mock('~/lib/client', () => createSupabaseMock())

import { supabase } from '~/lib/client'
import { useAuth } from '../useAuth'

describe('useAuth Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with loading state', () => {
    const { result } = renderHook(() => useAuth())

    expect(result.current.loading).toBe(true)
    expect(result.current.user).toBe(null)
  })

  it('should set user when session exists', async () => {
    const mockUser = { id: '123', email: 'test@example.com' }

    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: mockUser } }
    } as any)

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.user).toEqual(mockUser)
  })

  it('should handle auth state changes', async () => {
    // Mock getSession to return no initial session for this test
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null }
    } as any)

    let authCallback: any

    vi.mocked(supabase.auth.onAuthStateChange).mockImplementation(callback => {
      authCallback = callback
      return { data: { subscription: { unsubscribe: vi.fn() } } }
    })

    const { result } = renderHook(() => useAuth())

    // Wait for initial session loading to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // Initially should have no user
    expect(result.current.user).toBe(null)

    const mockUser = { id: '456', email: 'new@example.com' }

    // Simulate auth state change - pass the session object, not just user
    authCallback('SIGNED_IN', { user: mockUser })

    await waitFor(() => {
      // Check individual properties instead of object matching
      expect(result.current.user?.id).toBe('456')
      expect(result.current.user?.email).toBe('new@example.com')
    })
  })

  it('should handle sign out', async () => {
    // Mock getSession to return no initial session for this test
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null }
    } as any)

    let authCallback: any

    vi.mocked(supabase.auth.onAuthStateChange).mockImplementation(callback => {
      authCallback = callback
      return { data: { subscription: { unsubscribe: vi.fn() } } }
    })

    const { result } = renderHook(() => useAuth())

    // Wait for initial loading to complete
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    // First set a user
    const mockUser = { id: '123', email: 'test@example.com' }
    authCallback('SIGNED_IN', { user: mockUser })

    await waitFor(() => {
      expect(result.current.user?.id).toBe('123')
    })

    // Then sign out - pass null session
    authCallback('SIGNED_OUT', null)

    await waitFor(() => {
      expect(result.current.user).toBe(null)
    })
  })

  it('should cleanup subscription on unmount', () => {
    const unsubscribeMock = vi.fn()

    vi.mocked(supabase.auth.onAuthStateChange).mockReturnValue({
      data: { subscription: { unsubscribe: unsubscribeMock } }
    } as any)

    const { unmount } = renderHook(() => useAuth())

    unmount()

    expect(unsubscribeMock).toHaveBeenCalled()
  })

  it('should handle no initial session', async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null }
    } as any)

    const { result } = renderHook(() => useAuth())

    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.user).toBe(null)
  })

  it('should handle auth errors gracefully', async () => {
    vi.mocked(supabase.auth.getSession).mockRejectedValue(new Error('Auth error'))

    const { result } = renderHook(() => useAuth())

    // Should still set loading to false even on error
    await waitFor(() => {
      expect(result.current.loading).toBe(false)
    })

    expect(result.current.user).toBe(null)
  })
})
