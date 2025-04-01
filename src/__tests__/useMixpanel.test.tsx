import { renderHook } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { useMixpanel } from '../useMixpanel'
import mixpanel from 'mixpanel-browser'

vi.mock('mixpanel-browser', () => ({
  default: {
    init: vi.fn(),
    track: vi.fn(),
    identify: vi.fn(),
    reset: vi.fn(),
    people: {
      set: vi.fn(),
      increment: vi.fn(),
    },
    alias: vi.fn(),
    time_event: vi.fn(),
    register: vi.fn(),
    opt_in_tracking: vi.fn(),
    opt_out_tracking: vi.fn(),
  },
}))

describe('useMixpanel Hook', () => {
  it('should initialize mixpanel with token', () => {
    renderHook(() => useMixpanel('test-token'))

    expect(mixpanel.init).toHaveBeenCalledWith('test-token', expect.any(Object))
  })

  it('should call track method correctly', () => {
    const { result } = renderHook(() => useMixpanel('test-token'))

    result.current.track('Button Clicked', { button: 'signup' })

    expect(mixpanel.track).toHaveBeenCalledWith('Button Clicked', {
      button: 'signup',
    })
  })

  it('should warn if mixpanel not initialized', () => {
    const consoleWarnSpy = vi
      .spyOn(console, 'warn')
      .mockImplementation(() => {})
    const { result } = renderHook(() => useMixpanel(null))

    result.current.track('Test Event')

    expect(consoleWarnSpy).toHaveBeenCalledWith('Mixpanel not initialized.')

    consoleWarnSpy.mockRestore()
  })
})
