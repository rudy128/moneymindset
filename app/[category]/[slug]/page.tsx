'use client'
import {Blog} from '@/components/Blog'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const params = useParams()
    return (
        <main className='w-full flex justify-center'>
            <Blog slug={params.slug}/>
        </main>
    )
}

export default Page