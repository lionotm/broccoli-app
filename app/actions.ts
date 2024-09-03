'use server'

const SUCCESS_MESSAGE =
  "Congratulations! You're one step closer to a better life. Keep an eye on your inbox for your exclusive invite to Broccoli & Co."
const FALLBACK_ERROR_MESSAGE =
  "Looks like we need to get back to the broccoli patch and fix something. Please try again later and we'll make sure to serve you a fresh invite to Broccoli & Co."

export const submitForm = async ({ name, email }: { name: string; email: string }) => {
  try {
    console.log('Submitting form with:', { name, email })
    const response = await fetch(
      'https://l94wc2001h.execute-api.ap-southeast-2.amazonaws.com/prod/fake-auth',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      }
    )
    console.log('Response status:', response.status)

    const result = await response.json()
    console.log('Response body:', result)

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
