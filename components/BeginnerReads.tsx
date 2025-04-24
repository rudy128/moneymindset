'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'

interface Post {
  title: string;
  slug: string;
  date: string;
  author: string;
  description: string;
  images: string;
  category: string;
}

export default function BeginnerReads() {
  const [beginnerPosts, setBeginnerPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBeginnerPosts() {
      try {
        setLoading(true);
        // Try to get posts with "beginner" in the title or description or from relevant categories
        const response = await fetch('/api');
        
        if (!response.ok) {
          throw new Error('Failed to fetch posts');
        }
        
        const result = await response.json();
        
        // Filter for beginner-friendly posts based on criteria
        // Look for posts with beginner-related keywords in title, description or category
        const beginner = result.data.filter((post: Post) => {
          const lowerTitle = post.title.toLowerCase();
          const lowerDesc = post.description.toLowerCase();
          const lowerCategory = post.category.toLowerCase();
          
          return (
            lowerTitle.includes('beginner') || 
            lowerTitle.includes('start') || 
            lowerDesc.includes('beginner') || 
            lowerCategory.includes('beginner') ||
            lowerCategory === 'basics' ||
            lowerCategory === 'fundamentals'
          );
        });
        
        // If we don't have enough "beginner" labeled posts, just use the first few posts
        setBeginnerPosts(beginner.length >= 3 ? beginner.slice(0, 4) : result.data.slice(0, 4));
        setError(null);
      } catch (err) {
        console.error('Error fetching beginner posts:', err);
        setError('Failed to load beginner posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchBeginnerPosts();
  }, []);

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

  if (loading) {
    return (
      <div className="py-16">
        <div className="max-w-[1100px] mx-auto px-5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Beginner Reads</h2>
          </div>
          <div className="animate-pulse grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16">
        <div className="max-w-[1100px] mx-auto px-5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Beginner Reads</h2>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-center">
            <p className="text-red-700 dark:text-red-300">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (beginnerPosts.length === 0) {
    return (
      <div className="py-16">
        <div className="max-w-[1100px] mx-auto px-5">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Beginner Reads</h2>
          </div>
          <p className="text-center text-muted-foreground">No beginner posts available yet.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='py-16'>
      <div className='max-w-[1100px] mx-auto px-5'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-3xl font-bold'>Beginner Reads</h2>
          <Link 
            href="/category/beginner"
            className='flex items-center gap-1 text-primary hover:underline'
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {beginnerPosts.map((post) => (
            <Link key={post.slug} href={`/category/${post.category}/${post.slug}`}>
              <div className='bg-card hover:shadow-lg transition-all overflow-hidden rounded-lg border h-full'>
                <div className='relative h-40 w-full'>
                  <Image src={post.images} alt={post.title} fill className='object-cover' />
                </div>
                <div className='p-4'>
                  <h3 className='font-bold mb-2 line-clamp-2'>{post.title}</h3>
                  <div className='flex items-center text-sm text-muted-foreground'>
                    <Clock size={14} className="mr-1" />
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
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