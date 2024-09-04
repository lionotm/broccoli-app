'use client'

import InvitationForm from '@/components/invite-form'
import Footer from '@/components/page-footer'
import Header from '@/components/page-header'

export default function Home() {
  return (
    <div data-testid='home-container' className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-grow flex flex-col items-center justify-center p-4'>
        <h1 className='text-4xl mb-2 text-center'>Welcome to Broccoli & Co.</h1>
        <p className='mb-4 dark:text-gray-400 text-center'>
          Join us and say goodbye to life&apos;s junk food. Hello, healthy and happy living!
        </p>
        <InvitationForm />
      </main>
      <Footer />
    </div>
  )
}
