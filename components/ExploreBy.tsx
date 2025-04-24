import React from 'react'
import { Card, CardFooter, CardHeader } from './ui/card'
import Crypto from '@/public/cryptocurrency.png'
import Image from 'next/image'
import Link from 'next/link'
import { Coins, LineChart, PiggyBank, Briefcase, BookOpen, CreditCard } from 'lucide-react'

// Define categories with their icons and descriptions
const categories = [
  {
    name: 'Investing',
    icon: <LineChart size={48} className="text-primary mb-2" />,
    description: 'Stock market, ETFs, and investment strategies',
    slug: 'investing'
  },
  {
    name: 'Cryptocurrency',
    icon: <Coins size={48} className="text-primary mb-2" />,
    description: 'Bitcoin, Ethereum, and digital assets',
    slug: 'cryptocurrency'
  },
  {
    name: 'Saving',
    icon: <PiggyBank size={48} className="text-primary mb-2" />,
    description: 'Emergency funds and saving strategies',
    slug: 'saving'
  },
  {
    name: 'Career',
    icon: <Briefcase size={48} className="text-primary mb-2" />,
    description: 'Income growth and career development',
    slug: 'career'
  },
  {
    name: 'Education',
    icon: <BookOpen size={48} className="text-primary mb-2" />,
    description: 'Financial literacy and learning',
    slug: 'education'
  },
  {
    name: 'Credit',
    icon: <CreditCard size={48} className="text-primary mb-2" />,
    description: 'Credit cards, scores, and debt management',
    slug: 'credit'
  }
]

const ExploreBy = () => {
  // Display only the first 4 categories by default
  const displayedCategories = categories.slice(0, 4)
  
  return (
    <section className='flex flex-col gap-5'>
      <div className="flex justify-between items-center mb-2">
        <h2 className='text-3xl font-semibold'>Explore By Category</h2>
        <Link href='/categories' className="text-primary hover:underline">
          View all categories →
        </Link>
      </div>
      
      <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4'>
        {displayedCategories.map((category) => (
          <li key={category.slug}>
            <Link href={`/category/${category.slug}`}>
              <Card className='relative hover:shadow-md transition-all duration-300 bg-background h-full'>
                <CardHeader className='pb-0 flex flex-col items-center pt-6'>
                  {category.icon}
                  <h3 className='text-xl font-semibold text-center'>{category.name}</h3>
                </CardHeader>
                <CardFooter className='flex justify-center text-center pb-6'>
                  <p className='text-muted-foreground text-sm'>{category.description}</p>
                </CardFooter>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ExploreBy