export const SUCCESS_MESSAGE =
  "Congratulations! You're one step closer to a better life.\nKeep an eye on your inbox for your exclusive invite to Broccoli & Co."

export const FALLBACK_ERROR_MESSAGE =
  "Looks like we need to get back to the broccoli patch and fix something.\nPlease try again later and we'll make sure to serve you a fresh invite to Broccoli & Co."

export const AUTH_URL = 'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth'

export const submitForm = async ({ name, email }: { name: string; email: string }) => {
  try {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email }),
    })

    const result = await response.json()

    if (response.ok) {
      return {
        success: true,
        message: SUCCESS_MESSAGE,
      }
    } else {
      return {
        success: false,
        message: result.errorMessage || FALLBACK_ERROR_MESSAGE,
      }
    }
  } catch (err) {
    return {
      success: false,
      message: FALLBACK_ERROR_MESSAGE,
    }
  }
}
