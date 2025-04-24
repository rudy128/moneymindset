'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Clock } from 'lucide-react'

interface Post {
  title: string;
  slug: string;
  date: string;
  author: string;
  description: string;
  images?: string | undefined;
  category: string;
  featured?: boolean;
}

interface FeaturedPostsProps {
  posts: Post[];
  isLoading?: boolean;
  error?: string | null;
}

export default function FeaturedPosts({ posts, isLoading = false, error = null }: FeaturedPostsProps) {
  // Format date to a more readable format
  const formatDate = (dateString: string) => {
    // Expected format: DD/MM/YYYY
    const [day, month, year] = dateString.split('/');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="my-16">
        <div className="max-w-[1100px] mx-auto px-5">
          <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
          <div className="animate-pulse grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-16">
        <div className="max-w-[1100px] mx-auto px-5">
          <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="my-16">
        <div className="max-w-[1100px] mx-auto px-5">
          <h2 className="text-3xl font-bold mb-8">Featured Posts</h2>
          <p className="text-center text-muted-foreground">No featured posts available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='my-16'>
      <div className='max-w-[1100px] mx-auto px-5'>
        <h2 className='text-3xl font-bold mb-8'>Featured Posts</h2>
        <div className='grid md:grid-cols-3 gap-8'>
          {posts.map((post) => (
            <Link key={post.slug} href={`/category/${post.category}/${post.slug}`}>
              <div className='bg-card hover:shadow-lg transition-all overflow-hidden rounded-lg border h-full'>
                <div className='relative h-48 w-full'>
                  <Image src={post.images!} alt={post.title} fill className='object-cover' />
                </div>
                <div className='p-5'>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full capitalize">
                      {post.category.replace('-', ' ')}
                    </span>
                  </div>
                  <h3 className='text-xl font-bold mb-2'>{post.title}</h3>
                  <p className='text-muted-foreground line-clamp-2 mb-4'>{post.description}</p>
                  <div className='flex justify-between items-center'>
                    <span className='text-sm'>{post.author}</span>
                    <div className='flex items-center text-sm text-muted-foreground'>
                      <Clock size={14} className="mr-1" />
                      <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}