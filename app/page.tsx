'use client'

import { useState } from 'react'
// import Popup from "../components/Popup";

export default function Home() {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <div className='flex flex-col min-h-screen'>
      {/* {isPopupOpen && <Popup setIsPopupOpen={setIsPopupOpen} />} */}
      <main className='flex-grow flex flex-col items-center justify-center p-4'>
        <h1 className='text-4xl mb-2'>Welcome to our site</h1>
        <p className='mb-4'>Enter your name and email to receive an invite.</p>
        <button className='btn-primary' onClick={() => setIsPopupOpen(true)}>
          Request Invite
        </button>
      </main>
    </div>
  )
}
