import React from 'react'
import { ModeToggle } from './ui/theme-button'
import Link from 'next/link'
import Logo from './Logo'

const Header = () => {
  return (
    <nav className='w-full h-20 border shadow-lg dark:shadow-foreground/5 flex justify-center z-50 sticky top-0 left-0 backdrop-blur-3xl bg-background'>
        <div className='w-[1100px] px-5 h-full flex items-center justify-between'>
            <Logo />
            <ul className='flex items-center gap-5'>
                <li>
                  <Link href='/privacy-policy'>Privacy Policy</Link>
                </li>
                <li>
                  <Link href='/tos'>Terms of Service</Link>
                </li>
                <li><ModeToggle /></li>
            </ul>
        </div>
    </nav>
  )
}

export default Header

// className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen font-[family-name:var(--font-geist-sans)]"