'use client'
import { Button } from '@/components/ui/button'
import processContent from '@/hooks/markdown-reader'
import React, { useState } from 'react'

const Page = () => {
  const [file, setFile] = useState<File | null>(null)
  const [htmlContent, setHtmlContent] = useState<string | undefined>()

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (file) {
        const content = await processContent(file, "New Blog");
        setHtmlContent(content);
    try {
        const data = new FormData();
        data.set('file', file);
        const res = await fetch('api/upload', {
          method: 'POST',
          body: data,
        });

        // console.log(res)
  
        if (!res.ok) throw new Error(await res.text());
  
  
      } catch (e) {
        console.error(e);
      }
    }
  }

  return (
    <main className='w-full flex justify-center flex-col'>
      <form onSubmit={handleSubmit} className='prose mx-auto'>
        <input
          type='file'
          name='file'
          accept='.md'
          onChange={e => setFile(e.target.files?.[0] ?? null)}
        />
        <Button type='submit'>Upload</Button>
      </form>
      <div dangerouslySetInnerHTML={{ __html: htmlContent! }} className='prose dark:prose-invert mx-auto' />
    </main>
  )
}

export default Page
