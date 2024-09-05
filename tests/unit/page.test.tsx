import { afterEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import Home from '@/app/page'
import '@testing-library/jest-dom/vitest'

describe('Page Layout', () => {
  afterEach(() => {
    cleanup()
  })

  it('should occupy the full height of the screen', () => {
    render(<Home />)

    const container = screen.getByTestId('home-container')
    expect(container).toHaveClass('min-h-screen')
    expect(container).toBeVisible()
  })

  it('should show a fixed header at the top', () => {
    render(<Home />)

    const header = screen.getByRole('banner')
    expect(header).toHaveClass('fixed')
    expect(header).toHaveClass('top-0')
    expect(header).toBeVisible()
  })

  it('should show a fixed footer at the bottom', () => {
    render(<Home />)

    const footer = screen.getByRole('contentinfo')
    expect(footer).toHaveClass('fixed')
    expect(footer).toHaveClass('bottom-0')
    expect(footer).toBeVisible()
  })

  it('should render heading, text, and a button', () => {
    render(<Home />)
    const header = screen.getByRole('heading', { level: 1, name: 'Welcome to Broccoli & Co.' })
    const paragraph = screen.getByText(
      "Join us and say goodbye to life's junk food. Hello, healthy and happy living!"
    )
    const button = screen.getByRole('button', { name: /request invite/i })
    expect(header).toBeDefined()
    expect(paragraph).toBeDefined()
    expect(button).toBeDefined()
  })

  it('should show popup when Request Invite button is clicked', () => {
    render(<Home />)
    const button = screen.getByRole('button', { name: /request invite/i })
    fireEvent.click(button)
    expect(screen.getByLabelText('Full Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toBeInTheDocument()
    expect(screen.getByLabelText('Confirm Email')).toBeInTheDocument()
  })
})
