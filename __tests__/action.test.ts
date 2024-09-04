import { describe, it, expect, vi, beforeEach } from 'vitest'
import { submitForm } from '@/app/actions'

const mockFetch = vi.fn()
global.fetch = mockFetch

const SUCCESS_MESSAGE =
  "Congratulations! You're one step closer to a better life. Keep an eye on your inbox for your exclusive invite to Broccoli & Co."
const FALLBACK_ERROR_MESSAGE =
  "Looks like we need to get back to the broccoli patch and fix something. Please try again later and we'll make sure to serve you a fresh invite to Broccoli & Co."

describe('submitForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return success message on successful submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true }),
    })

    const response = await submitForm({ name: 'John Doe', email: 'john@example.com' })

    expect(response).toEqual({
      success: true,
      message: SUCCESS_MESSAGE,
    })
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(fetch).toHaveBeenCalledWith(
      'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: 'John Doe',
          email: 'john@example.com',
        }),
      }
    )
  })

  it('should return error message on unsuccessful submission', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ errorMessage: 'Invalid email' }),
    })

    const response = await submitForm({ name: 'John Doe', email: 'john@example.com' })

    expect(response).toEqual({
      success: false,
      message: 'Invalid email',
    })
  })

  it('should return fallback error message on network failure', async () => {
    mockFetch.mockRejectedValueOnce(new Error('Network error'))

    const response = await submitForm({ name: 'John Doe', email: 'john@example.com' })

    expect(response).toEqual({
      success: false,
      message: FALLBACK_ERROR_MESSAGE,
    })
  })
})
