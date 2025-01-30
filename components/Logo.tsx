import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href='/'>
        <h1 className='text-4xl font-extrabold font-["Poppins"] text-gradient'>Money Mindset</h1>
    </Link>
  )
}

export default Logo