'use client';
import { notFound } from 'next/navigation';
import React, { useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import processContent from '@/hooks/markdown-reader';
import { AuthorInfo } from './ui/author-info';
import { ShareButtons } from './ui/share-buttons';
import { LikeButton } from './ui/like-button';
import { RelatedPosts } from './ui/related-posts';
import { Comments } from './ui/comments';
import { ReadingProgressBar } from './ui/reading-progress';
import { TableOfContents } from './ui/table-of-contents';
import { NewsletterSubscription } from './ui/newsletter-subscription';

interface Props {
    slug: string | string[];
}

interface PostData {
    data: {
        title: string,
        author: string,
        date: string,
        slug: string,
        category?: string,
        image?: string, // For featured image
    };
    content: string;
    error?: string;
}

// Simple function to estimate reading time
function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const wordCount = text.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  return `${readingTime} min read`;
}

const Blog: React.FC<Props> = ({slug}) => {
    const [post, setPost] = useState<PostData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [htmlContent, setHtmlContent] = useState<string|TrustedHTML|undefined>();
    const articleRef = useRef<HTMLDivElement>(null);
    
    interface RelatedPost {
        title: string;
        slug: string;
        category: string;
        image: string;
    }
    
    const [relatedPosts, setRelatedPosts] = useState<RelatedPost[]>([]);

    // Get the current URL for share buttons
    const [pageUrl, setPageUrl] = useState('');
    
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setPageUrl(window.location.href);
        }
    }, []);

    useEffect(()=>{
        const fetchPost = async () => {
            setLoading(true);
            try{
                const response = await fetch(`/api`,{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({slug:slug})
                });
                if (!response.ok){
                    throw new Error(`Post not found or invalid response`);
                }
                const data = await response.json();
                setPost(data);
                
                // Fetch related posts (mock for now)
                // In a real implementation, you would fetch from your API
                setRelatedPosts([
                    {
                        title: "Understanding Cryptocurrency Basics",
                        slug: "crypto-basics",
                        category: "cryptocurrency",
                        image: "/cryptocurrency.png"
                    },
                    {
                        title: "How to Start Investing with Little Money",
                        slug: "investing-with-little-money",
                        category: "investing",
                        image: "/cryptocurrency.png"
                    },
                    {
                        title: "Building Wealth Through Passive Income",
                        slug: "passive-income-strategies",
                        category: "wealth-building",
                        image: "/cryptocurrency.png"
                    }
                ]);
            } catch (err){
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };
        fetchPost();
    },[slug]);

    useEffect(()=>{
        async function getBlog(){
            if (post?.content){
                const content = await processContent(post?.content, "New Blog");
                setHtmlContent(content);
            }
        }
        getBlog();
    },[post]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-[1100px] mx-auto px-5 py-16 text-center">
                <h2 className="text-2xl font-bold text-red-500 mb-4">Error</h2>
                <p className="mb-6">{error}</p>
                <button 
                    onClick={() => window.history.back()} 
                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                    Go Back
                </button>
            </div>
        );
    }

    if (post?.error) {
        return notFound();
    }
    
    function getFirst50Words(input: string):string{
        const words = input.split(/\s+/);
        if (words.length>50) {
            return words.slice(0,50).join(' ') + '...';
        } else {
            return words.join(' ');
        }
    }
    
    const description = getFirst50Words(post!.content);
    const readingTime = calculateReadingTime(post!.content);

    return (
        <>
            <Head>
                <title>{post!.data?.title}</title>
                <meta name='description' content={description} />
                <meta property="og:title" content={post!.data?.title} />
                <meta property="og:description" content={description} />
                <meta property="og:type" content="article" />
                <meta property="og:url" content={pageUrl} />
                {post!.data?.image && <meta property="og:image" content={post!.data.image} />}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={post!.data?.title} />
                <meta name="twitter:description" content={description} />
            </Head>
            
            {/* Reading Progress Indicator */}
            <ReadingProgressBar />
            
            <div className='max-w-[1200px] w-full px-5 pt-10 mx-auto'>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-8">
                        {/* Blog Header */}
                        <div className="mb-8">
                            <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <span className="capitalize px-3 py-1 bg-primary/10 rounded-full">
                                    {post!.data?.category || 'Finance'}
                                </span>
                            </div>
                            
                            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                                {post!.data?.title}
                            </h1>
                            
                            <AuthorInfo 
                                author={post!.data?.author} 
                                date={post!.data?.date}
                                readingTime={readingTime}
                            />
                            
                            <div className="flex justify-between items-center mt-6 pb-6 border-b">
                                <ShareButtons url={pageUrl} title={post!.data?.title} />
                                <LikeButton initialLikes={Math.floor(Math.random() * 50)} />
                            </div>
                        </div>
                        {/* Blog Content */}
                        <article 
                            ref={articleRef}
                            dangerouslySetInnerHTML={{__html: htmlContent!}} 
                            className='prose max-w-none prose-lg md:prose-xl dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-img:rounded-lg mb-12' 
                        />
                        
                        {/* Like and Share (Bottom) */}
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 py-8 border-t border-b">
                            <ShareButtons url={pageUrl} title={post!.data?.title} />
                            <LikeButton initialLikes={Math.floor(Math.random() * 50)} />
                        </div>
                        
                        {/* Newsletter Section */}
                        <div className="my-10">
                            <NewsletterSubscription 
                                variant="default"
                                title="Enjoyed this article?"
                                description="Subscribe to get more financial tips and insights delivered to your inbox."
                            />
                        </div>
                        
                        {/* Related Posts Section */}
                        <RelatedPosts posts={relatedPosts} />
                        
                        {/* Comments Section */}
                        <Comments postSlug={typeof slug === 'string' ? slug : slug.join('-')} />
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-20 space-y-8">
                            {/* Table of Contents */}
                            <TableOfContents containerRef={articleRef} />
                            
                            {/* Author Box */}
                            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                                <div className="flex flex-col items-center text-center">
                                    <div className="w-20 h-20 rounded-full bg-gray-300 mb-4 overflow-hidden">
                                        {/* Replace with actual author image if available */}
                                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold">
                                            {post!.data?.author?.charAt(0)}
                                        </div>
                                    </div>
                                    <h4 className="font-bold mb-2">{post!.data?.author}</h4>
                                    <p className="text-sm text-muted-foreground mb-4">
                                        Financial expert with 10+ years of experience in personal finance management.
                                    </p>
                                    <a 
                                        href="#" 
                                        className="text-primary text-sm hover:underline"
                                    >
                                        View all articles
                                    </a>
                                </div>
                            </div>
                            
                            {/* Newsletter (Minimal Version) */}
                            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
                                <h4 className="font-bold mb-2">Stay Updated</h4>
                                <p className="text-sm text-muted-foreground mb-4">
                                    Get the latest money tips straight to your inbox.
                                </p>
                                <NewsletterSubscription variant="minimal" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export { Blog };
export type { PostData };
