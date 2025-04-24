import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardFooter } from '@/components/ui/card';
import { Coins, LineChart, PiggyBank, Briefcase, BookOpen, CreditCard, TrendingUp, Home, Building, Landmark, Users } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "All Categories - Money Mindset",
  description: "Explore all financial topics and categories on Money Mindset",
};

// Define all categories with their icons and descriptions
const allCategories = [
  {
    name: 'Investing',
    icon: <LineChart size={48} className="text-primary mb-2" />,
    description: 'Stock market, ETFs, mutual funds, and investment strategies for beginners and experienced investors.',
    slug: 'investing'
  },
  {
    name: 'Cryptocurrency',
    icon: <Coins size={48} className="text-primary mb-2" />,
    description: 'Bitcoin, Ethereum, blockchain technology, NFTs, and digital asset investing.',
    slug: 'cryptocurrency'
  },
  {
    name: 'Saving',
    icon: <PiggyBank size={48} className="text-primary mb-2" />,
    description: 'Building emergency funds, high-yield savings accounts, and effective saving strategies.',
    slug: 'saving'
  },
  {
    name: 'Career',
    icon: <Briefcase size={48} className="text-primary mb-2" />,
    description: 'Salary negotiation, side hustles, freelancing, and career development for financial growth.',
    slug: 'career'
  },
  {
    name: 'Education',
    icon: <BookOpen size={48} className="text-primary mb-2" />,
    description: 'Financial literacy resources, book recommendations, and learning materials.',
    slug: 'education'
  },
  {
    name: 'Credit',
    icon: <CreditCard size={48} className="text-primary mb-2" />,
    description: 'Credit cards, improving credit scores, responsible borrowing, and debt management.',
    slug: 'credit'
  },
  {
    name: 'Trending',
    icon: <TrendingUp size={48} className="text-primary mb-2" />,
    description: 'Current financial trends, market news, and time-sensitive opportunities.',
    slug: 'trending'
  },
  {
    name: 'Real Estate',
    icon: <Home size={48} className="text-primary mb-2" />,
    description: 'Home buying, property investment, mortgages, and real estate market analysis.',
    slug: 'real-estate'
  },
  {
    name: 'Business',
    icon: <Building size={48} className="text-primary mb-2" />,
    description: 'Starting a business, entrepreneurship, business finance, and growth strategies.',
    slug: 'business'
  },
  {
    name: 'Banking',
    icon: <Landmark size={48} className="text-primary mb-2" />,
    description: 'Banking services, account types, fees, and choosing the right financial institutions.',
    slug: 'banking'
  },
  {
    name: 'Family Finance',
    icon: <Users size={48} className="text-primary mb-2" />,
    description: 'Budgeting for families, education planning, and teaching kids about money.',
    slug: 'family-finance'
  }
];

export default function CategoriesPage() {
  return (
    <main className="max-w-[1200px] mx-auto px-5 py-12">
      <h1 className="text-4xl font-bold mb-6">Explore All Categories</h1>
      <p className="text-xl text-muted-foreground mb-10">Find financial advice and insights across all our specialized topics.</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {allCategories.map((category) => (
          <Link href={`/category/${category.slug}`} key={category.slug}>
            <Card className='relative h-full hover:shadow-md transition-all duration-300 bg-background'>
              <CardHeader className='pb-0 flex flex-col items-center pt-6'>
                {category.icon}
                <h3 className='text-xl font-semibold text-center'>{category.name}</h3>
              </CardHeader>
              <CardFooter className='flex justify-center text-center p-6'>
                <p className='text-muted-foreground text-sm'>{category.description}</p>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  );
}