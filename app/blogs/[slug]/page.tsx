'use client'
import BlogFormat from '@/components/BlogFormat'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const params = useParams()
    return (
        <main className='w-full flex justify-center'>
            {/* <h1>{params.slug}</h1> */}
            <BlogFormat slug={params.slug}/>
        </main>
    )
}

export default Page