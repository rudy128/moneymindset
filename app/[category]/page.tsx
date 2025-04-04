'use client'
import { CategoryBlog } from '@/components/CategoryBlogs'
import { useParams } from 'next/navigation'
import React from 'react'

const Page = () => {
    const params = useParams()
    return (
        <main className='w-full flex justify-center'>
            <CategoryBlog category={params.category}/>
        </main>
    )
}

export default Page