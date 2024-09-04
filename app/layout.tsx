import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/page-header'
import Footer from '@/components/page-footer'

export const metadata: Metadata = {
  title: 'Broccoli & Co.',
  description: 'Your invitation to a better life',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
