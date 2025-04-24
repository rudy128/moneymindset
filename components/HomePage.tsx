'use client'
import React, { useEffect, useState } from 'react';
import BeginnerReads from './BeginnerReads';
import ExploreBy from './ExploreBy';
import FeaturedPosts from './FeaturedPosts';
import { Loader, BookOpen, TrendingUp, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { NewsletterSubscription } from './ui/newsletter-subscription';

interface Blog {
  title: string;
  author: string;
  date: string;
  slug: string;
  category?: string;
  images?: string;
  description: string;
}

interface ApiResponse {
  data: Blog[];
  status?: number;
}

const HomePage = () => {
  const [data, setData] = useState<ApiResponse | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api');
        if (!res.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await res.json();
        setData(result as ApiResponse);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <main className='w-full flex justify-center items-center h-screen'>
        <Loader size={50} className='animate-spin duration-1000 text-primary' />
      </main>
    );
  }

  if (error) {
    return (
      <div className='w-full max-w-[1100px] mx-auto p-5 py-16 text-center'>
        <h2 className='text-2xl font-bold mb-4'>Something went wrong</h2>
        <p className='mb-6 text-red-500'>{error.message}</p>
        <button 
          onClick={() => window.location.reload()} 
          className='px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90'
        >
          Try Again
        </button>
      </div>
    );
  }

  // Transform data for featured posts
  const featuredPosts = data?.data?.slice(0, 3).map(post => ({
    ...post,
    category: post.category || 'finance',
    image: post.images,
  })) || [];

  return (
    <main className='w-full'>
      {/* Hero Section */}
      <div className='bg-gradient-to-r from-slate-900 to-indigo-900 text-white'>
        <div className='max-w-[1100px] mx-auto p-5 py-20 md:py-32'>
          <div className='max-w-2xl'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4'>
              Master Your Financial Future
            </h1>
            <p className='text-xl mb-8 text-gray-200'>
              Practical insights and expert advice to help you make smarter financial decisions.
            </p>
            <div className='flex flex-wrap gap-4'>
              <Link 
                href="/category/investing" 
                className='bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-md flex items-center gap-2'
              >
                <BookOpen size={18} />
                Start Reading
              </Link>
              <Link 
                href="/category/trending" 
                className='bg-transparent hover:bg-white/10 text-white border border-white px-6 py-3 rounded-md flex items-center gap-2'
              >
                <TrendingUp size={18} />
                Trending Topics
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className='max-w-[1100px] mx-auto p-5 py-12'>
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <FeaturedPosts posts={featuredPosts} />
        )}
        
        {/* Categories */}
        <div className='mb-16'>
          <ExploreBy />
        </div>
        
        {/* Latest Articles Section */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold">Latest Articles</h2>
            <Link href="/categories" className="text-primary hover:underline flex items-center">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data?.data?.slice(3, 9).map((post) => (
              <Link 
                href={`/category/${post.category || 'finance'}/${post.slug}`}
                key={post.slug}
                className="border dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-all"
              >
                {post.images && (
                  <div className="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={post.images}
                      alt={post.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex justify-between items-center text-sm">
                    <span>{post.author}</span>
                    <span className="text-muted-foreground">{post.date}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Beginner Reads */}
        {data && <BeginnerReads />}
        
        {/* Newsletter Section */}
        <div className='my-16'>
          <NewsletterSubscription 
            variant="featured"
            title="Stay Updated with Money Mindset"
            description="Get the latest articles and financial insights delivered straight to your inbox."
          />
        </div>
        
        {/* Financial Tools Teaser Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Financial Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Investment Calculator</h3>
              <p className="text-muted-foreground mb-4">
                See how your investments could grow over time with our compound interest calculator.
              </p>
              <Link 
                href="#" 
                className="text-primary hover:underline flex items-center"
              >
                Try it now <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Budget Planner</h3>
              <p className="text-muted-foreground mb-4">
                Create a personalized budget plan based on your income and financial goals.
              </p>
              <Link 
                href="#" 
                className="text-primary hover:underline flex items-center"
              >
                Start planning <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
            
            <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-2">Retirement Calculator</h3>
              <p className="text-muted-foreground mb-4">
                Find out how much you need to save for a comfortable retirement.
              </p>
              <Link 
                href="#" 
                className="text-primary hover:underline flex items-center"
              >
                Calculate now <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export { HomePage }
export type { ApiResponse, Blog }
