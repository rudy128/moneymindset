import React from 'react'

const Header = () => {
  return (
    <nav className='w-full h-20 border flex justify-center'>
        <div className='w-[1100px] px-5 h-full flex items-center justify-between'>
            <h1>Money Mindset</h1>
            <ul className='flex gap-5'>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
            </ul>
        </div>
    </nav>
  )
}

export default Header

// className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]"