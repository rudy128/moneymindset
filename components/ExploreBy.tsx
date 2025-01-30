import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import Crypto from '@/public/cryptocurrency.png'
import Image from 'next/image'
import Link from 'next/link'
const ExploreBy = () => {
  return (
    <section className='flex flex-col gap-5'>
        <h1 className='text-4xl font-semibold'>Explore By</h1>
        <ul className='flex justify-between'>
            <li>
                <Link href='/upload'>
                <Card className='relative hover:opacity-75 bg-background h-full w-60'>
                    <CardHeader className='pb-0'>
                    <Image src={Crypto} alt='Cryptocurrency' className='' />
                    </CardHeader>
                    <CardFooter className='flex justify-center'>
                        <h3 className='text-xl font-semibold'>Cryptocurrency</h3>
                    </CardFooter>
                </Card>
                </Link>
            </li>
            <li>
                <Link href='/upload'>
                <Card className='relative hover:opacity-75 bg-background h-full w-60'>
                    <CardHeader className='pb-0'>
                    <Image src={Crypto} alt='Cryptocurrency' className='' />
                    </CardHeader>
                    <CardFooter className='flex justify-center'>
                        <h3 className='text-xl font-semibold'>Cryptocurrency</h3>
                    </CardFooter>
                </Card>
                </Link>
            </li>
            <li>
                <Link href='/upload'>
                <Card className='relative hover:opacity-75 bg-background h-full w-60'>
                    <CardHeader className='pb-0'>
                    <Image src={Crypto} alt='Cryptocurrency' className='' />
                    </CardHeader>
                    <CardFooter className='flex justify-center'>
                        <h3 className='text-xl font-semibold'>Cryptocurrency</h3>
                    </CardFooter>
                </Card>
                </Link>
            </li>
            <li>
                <Link href='/upload'>
                <Card className='relative hover:opacity-75 bg-background h-full w-60'>
                    <CardHeader className='pb-0'>
                    <Image src={Crypto} alt='Cryptocurrency' className='' />
                    </CardHeader>
                    <CardFooter className='flex justify-center'>
                        <h3 className='text-xl font-semibold'>Cryptocurrency</h3>
                    </CardFooter>
                </Card>
                </Link>
            </li>
        </ul>
    </section>
  )
}

export default ExploreBy