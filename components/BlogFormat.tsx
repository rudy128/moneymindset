import { notFound } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import rehypeDocument from 'rehype-document'
import rehypeFormat from 'rehype-format'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import {unified} from 'unified'
import remarkGfm from 'remark-gfm'


interface Props {
    slug: string | string[]
}

interface PostData {
    data: {
        title: string,
        author: string,
        date: string,
        slug: string,
    };  // Replace with the specific type of your post data
    content: string;
    error?: string;
}

const BlogFormat: React.FC<Props> = ({slug}) => {
    const [post, setPost] = useState<PostData | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [htmlContent, setHtmlContent] = useState<string|TrustedHTML>("")

    useEffect(()=>{
        const fetchPost = async () => {
            setLoading(true)
            try{
                const response = await fetch(`/api`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({slug:slug})
                })
                if (!response.ok){
                    throw new Error(`Post not found or invalid response`)
                }
                const data = await response.json()
                setPost(data)
            } catch (err){
                setError((err as Error).message)
            } finally {
                setLoading(false)
            }
        }
        fetchPost()
    },[slug])

    useEffect(() => {
        const processContent = async () => {
            if (post?.content) {
                const processor = unified()
                    .use(remarkParse)
                    .use(remarkGfm)
                    .use(remarkRehype)
                    .use(rehypeStringify)
                    .use(rehypeDocument, { title: '👋🌍' })
                    .use(rehypeFormat)

                try {
                    const result = await processor.process(post.content)
                    setHtmlContent(result.toString())
                } catch (err) {
                    console.error("Error processing content:", err)
                }
            }
        }

        processContent()
    }, [post])


    if (loading) {
    return <div>Loading...</div>;
    }

    if (error) {
    return <div>Error: {error}</div>;
    }

    if (post?.error) {
    return notFound();
    }
    

  return (
    <section className='max-w-[1100px] w-full px-5 pt-10'>
        {/* <h1>{post!.data?.title}</h1> */}
        <article dangerouslySetInnerHTML={ {__html: htmlContent}} className='prose max-w-[60em]' />
    </section>
  )
}

export default BlogFormat