'use client';
import React, { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import { Clock, Filter, ArrowRight, SortAsc, SortDesc } from 'lucide-react';
import { NewsletterSubscription } from './ui/newsletter-subscription';

interface Props {
  category: string | string[];
}

interface BlogPost {
  title: string;
  author: string;
  date: string;
  slug: string;
  category?: string;
  images?: string;
  description: string;
  excerpt?: string;
}

interface ApiResponse {
  data: BlogPost[];
  status?: number;
  error?: string;
}

const CategoryBlog: React.FC<Props> = ({ category }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  // Convert category to display format (e.g., "real-estate" -> "Real Estate")
  const displayCategory = typeof category === 'string' 
    ? category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
    : category.join(' ');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/category`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ category: category })
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch posts for category: ${category}`);
        }

        const result: ApiResponse = await response.json();
        
        if (result.error) {
          throw new Error(result.error);
        }

        // Mock data for now since we might not have real category data
        const mockPosts: BlogPost[] = [
          {
            title: "How to Build an Emergency Fund Fast",
            author: "Sarah Johnson",
            date: "April 22, 2025",
            slug: "build-emergency-fund",
            category: typeof category === 'string' ? category : category.join('-'),
            images: "/cryptocurrency.png",
            description: "Learn the best strategies to quickly build your emergency savings to protect yourself from financial surprises."
          },
          {
            title: `Top ${displayCategory} Strategies for Beginners`,
            author: "Michael Chen",
            date: "April 18, 2025",
            slug: "beginner-strategies",
            category: typeof category === 'string' ? category : category.join('-'),
            images: "/cryptocurrency.png",
            description: `A comprehensive guide to getting started with ${displayCategory.toLowerCase()} even if you have no prior experience.`
          },
          {
            title: `Common ${displayCategory} Myths Debunked`,
            author: "Priya Patel",
            date: "April 15, 2025",
            slug: "myths-debunked",
            category: typeof category === 'string' ? category : category.join('-'),
            images: "/cryptocurrency.png",
            description: `We separate fact from fiction and address the most persistent misconceptions about ${displayCategory.toLowerCase()}.`
          },
          {
            title: `How to Maximize Your ${displayCategory} Returns`,
            author: "James Wilson",
            date: "April 10, 2025",
            slug: "maximize-returns",
            category: typeof category === 'string' ? category : category.join('-'),
            images: "/cryptocurrency.png",
            description: "Advanced techniques to optimize your financial strategy and increase your long-term gains."
          },
          {
            title: `${displayCategory} in 2025: Market Outlook`,
            author: "Emma Rodriguez",
            date: "April 5, 2025",
            slug: "2025-market-outlook",
            category: typeof category === 'string' ? category : category.join('-'),
            images: "/cryptocurrency.png",
            description: "Expert predictions on what's coming next in the market and how to position yourself for success."
          }
        ];

        // Use mock data if we don't have real data
        setPosts(result.data?.length > 0 ? result.data : mockPosts);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [category, displayCategory]);

  // Handle sorting logic
  const sortedPosts = [...posts].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Handle filtering logic
  const filteredPosts = selectedFilter
    ? sortedPosts.filter(post => post.title.toLowerCase().includes(selectedFilter.toLowerCase()))
    : sortedPosts;

  // Calculate related categories
  const relatedCategories = [
    'investing',
    'saving',
    'cryptocurrency',
    'career',
    'education',
    'credit'
  ].filter(cat => 
    cat !== (typeof category === 'string' ? category : category.join('-'))
  ).slice(0, 4);

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

  return (
    <>
      <Head>
        <title>{displayCategory} Articles - Money Mindset</title>
        <meta name='description' content={`Explore our collection of ${displayCategory} articles and resources.`} />
      </Head>

      <div className="max-w-[1200px] mx-auto px-5 py-12">
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{displayCategory}</h1>
          <p className="text-xl text-muted-foreground">
            Explore our collection of articles, guides, and resources on {displayCategory.toLowerCase()}.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="flex items-center gap-2">
                <Filter size={18} />
                <span className="font-medium">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'Article' : 'Articles'}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                  className="flex items-center gap-1 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
                >
                  {sortOrder === 'newest' ? (
                    <>
                      <SortDesc size={16} />
                      Newest First
                    </>
                  ) : (
                    <>
                      <SortAsc size={16} />
                      Oldest First
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Articles */}
            {filteredPosts.length > 0 ? (
              <div className="space-y-8">
                {filteredPosts.map((post) => (
                  <article key={post.slug} className="border-b dark:border-slate-700 pb-8 last:border-0">
                    <Link href={`/category/${post.category}/${post.slug}`}>
                      <div className="grid md:grid-cols-3 gap-6">
                        {post.images && (
                          <div className="md:col-span-1">
                            <div className="aspect-[4/3] rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800">
                              <img
                                src={post.images}
                                alt={post.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          </div>
                        )}
                        
                        <div className={post.images ? "md:col-span-2" : "md:col-span-3"}>
                          <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors">
                            {post.title}
                          </h2>
                          
                          <p className="text-muted-foreground mb-4">
                            {post.description || post.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 bg-primary/20 rounded-full flex items-center justify-center">
                                {post.author.charAt(0)}
                              </div>
                              <span className="text-sm">{post.author}</span>
                            </div>
                            
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Clock size={14} className="mr-1" />
                              <time dateTime={post.date}>{post.date}</time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 border rounded-lg">
                <h3 className="text-xl font-medium mb-2">No articles found</h3>
                <p className="text-muted-foreground mb-6">
                  We couldn't find any articles matching your criteria.
                </p>
                <Link 
                  href="/categories" 
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
                >
                  Browse All Categories
                </Link>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="space-y-8">
              {/* Newsletter */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="font-bold mb-2">Stay Updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest {displayCategory.toLowerCase()} insights straight to your inbox.
                </p>
                <NewsletterSubscription variant="minimal" />
              </div>
              
              {/* Related Categories */}
              <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
                <h3 className="font-bold mb-4">Related Categories</h3>
                <ul className="space-y-2">
                  {relatedCategories.map((cat) => (
                    <li key={cat}>
                      <Link 
                        href={`/category/${cat}`}
                        className="text-primary hover:underline capitalize flex items-center"
                      >
                        <ArrowRight size={14} className="mr-2" />
                        {cat.replace('-', ' ')}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export { CategoryBlog };
