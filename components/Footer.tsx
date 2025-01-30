import React from 'react'
import Logo from './Logo'
import Link from 'next/link'

const Footer = () => {
  const year = new Date().getFullYear()
  const footerLinks = [
    {
      name: 'About Us',
      link: '/about',
      },
    {
      name: 'Privacy Policy',
      link: '/privacy-policy',
    },
    {
      name: 'Terms of Service',
      link: '/tos',
    }
  ]
  return (
    <footer className='w-full border-t border-t-black flex justify-center'>
        <div className='w-[1100px] h-3/4 px-5 py-10 flex items-start justify-between'>
            <div className='h-full w-1/3 flex flex-col gap-5 justify-start items-start'>
              <Logo />
              <p>© {year} Money Mindset. All rights reserved.<br />The content on this website is for informational purposes only and does not constitute financial advice, recommendations, or endorsements</p>
            </div>
            <div className='flex w-1/2 justify-end gap-x-10 items-center'>
              <ul className='flex flex-col gap-5'>
                {footerLinks.map((linkObject,index)=>(
                  <Link key={index} href={linkObject.link}>
                    <li>{linkObject.name}</li>
                  </Link>

                ))}
              </ul>
            </div>
        </div>
        
    </footer>
  )
}

export default Footer