import { AUTH_URL } from '@/app/actions'
import { test, expect } from '@playwright/test'

test.describe('Form Submission', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000')

    const requestInviteButton = page.getByRole('button', { name: /request invite/i })
    await requestInviteButton.click()
  })

  test('should show popup with form when Request Invite button is clicked', async ({ page }) => {
    await expect(page.locator('input[name="name"]')).toBeVisible()
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="confirmEmail"]')).toBeVisible()
  })

  test('should show validation errors on form submission if fields are empty', async ({ page }) => {
    const request = page.waitForRequest(AUTH_URL)
    const submitButton = page.getByRole('button', { name: /submit/i })
    await submitButton.click()
    expect(request).rejects.toBeTruthy()

    await expect(page.locator('text=Name has to be at least 3 characters long')).toBeVisible()
    await expect(page.locator('text=Enter a valid email address')).toBeVisible()
    await expect(page.locator('text=Enter a valid confirmation email address')).toBeVisible()
  })

  test('should not submit when fields are invalid', async ({ page }) => {
    await page.locator('input[name="name"]').fill('Jo')
    await page.locator('input[name="email"]').fill('invalid@email')
    await page.locator('input[name="confirmEmail"]').fill('invalid2@email.com')

    const request = page.waitForRequest(AUTH_URL)
    const submitButton = page.getByRole('button', { name: /submit/i })
    await submitButton.click()
    expect(request).rejects.toBeTruthy()

    await expect(page.locator('text=Name has to be at least 3 characters long')).toBeVisible()
    await expect(page.locator('text=Enter a valid email address')).toBeVisible()
    await expect(page.locator('text=Emails do not match')).toBeVisible()
  })

  test('should submit form successfully when fields are valid', async ({ page }) => {
    await page.locator('input[name="name"]').fill('John Doe')
    await page.locator('input[name="email"]').fill('john@example.com')
    await page.locator('input[name="confirmEmail"]').fill('john@example.com')

    await page.route(AUTH_URL, async (route) => {
      const json = { success: true }
      await route.fulfill({ json })
    })

    const submitButton = page.getByRole('button', { name: /submit/i })
    const [response] = await Promise.all([page.waitForResponse(AUTH_URL), submitButton.click()])

    expect(response.status()).toBe(200)
    await expect(page.locator('text=Congratulations!')).toBeVisible()
  })

  test('should show error message when server returns 400', async ({ page }) => {
    await page.locator('input[name="name"]').fill('John Doe')
    await page.locator('input[name="email"]').fill('usedemail@airwallex.com')
    await page.locator('input[name="confirmEmail"]').fill('usedemail@airwallex.com')

    await page.route(AUTH_URL, async (route) => {
      const json = { errorMessage: 'Email has been taken' }
      await route.fulfill({ json, status: 400 })
    })

    const submitButton = page.getByRole('button', { name: /submit/i })
    const [response] = await Promise.all([page.waitForResponse(AUTH_URL), submitButton.click()])

    expect(response.status()).toBe(400)
    await expect(page.locator('text=Email has been taken')).toBeVisible()
  })

  test('should allow re-attempting submission', async ({ page }) => {
    await page.locator('input[name="name"]').fill('John Doe')
    await page.locator('input[name="email"]').fill('usedemail@airwallex.com')
    await page.locator('input[name="confirmEmail"]').fill('usedemail@airwallex.com')

    await page.route(AUTH_URL, async (route) => {
      const json = { errorMessage: 'Email has been taken' }
      await route.fulfill({ json, status: 400 })
    })

    const submitButton = page.getByRole('button', { name: /submit/i })
    let response = await Promise.all([page.waitForResponse(AUTH_URL), submitButton.click()])

    expect(response[0].status()).toBe(400)
    await expect(page.locator('text=Email has been taken')).toBeVisible()

    await page.locator('input[name="email"]').fill('john@example.com')
    await page.locator('input[name="confirmEmail"]').fill('john@example.com')

    await page.route(AUTH_URL, async (route) => {
      const json = { success: true }
      await route.fulfill({ json })
    })

    response = await Promise.all([page.waitForResponse(AUTH_URL), submitButton.click()])

    expect(response[0].status()).toBe(200)
    await expect(page.locator('text=Congratulations!')).toBeVisible()
  })
})
