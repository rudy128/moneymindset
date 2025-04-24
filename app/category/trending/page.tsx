import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { NewsletterSubscription } from '@/components/ui/newsletter-subscription';

export const metadata: Metadata = {
  title: "Trending Financial Topics - Money Mindset",
  description: "Stay updated with the latest trending topics in personal finance, investing, and money management.",
};

interface TrendingTopic {
  title: string;
  slug: string;
  category: string;
  description: string;
  author: string;
  date: string;
  image: string;
  trend: {
    percentage: string;
    isUp: boolean;
  };
}

export default function TrendingTopicsPage() {
  // Trending topics data (in a real app, this would be fetched from a database or API)
  const trendingTopics: TrendingTopic[] = [
    {
      title: "How Inflation is Affecting Housing Markets in 2025",
      slug: "inflation-housing-markets-2025",
      category: "real-estate",
      description: "An analysis of the current inflation trends and their impact on housing affordability and investment opportunities.",
      author: "Sarah Johnson",
      date: "April 22, 2025",
      image: "/cryptocurrency.png", // Using placeholder image
      trend: {
        percentage: "127%",
        isUp: true
      }
    },
    {
      title: "The Rise of Sustainable Investing: ESG Trends",
      slug: "sustainable-investing-esg",
      category: "investing",
      description: "How environmental, social, and governance factors are reshaping investment strategies and portfolio management.",
      author: "Michael Chen",
      date: "April 20, 2025",
      image: "/cryptocurrency.png", // Using placeholder image
      trend: {
        percentage: "86%",
        isUp: true
      }
    },
    {
      title: "Digital Dollar: What the New CBDC Means for You",
      slug: "digital-dollar-cbdc-impact",
      category: "cryptocurrency",
      description: "Understanding the upcoming Central Bank Digital Currency and how it will affect your financial future.",
      author: "Emma Rodriguez",
      date: "April 18, 2025",
      image: "/cryptocurrency.png", // Using placeholder image
      trend: {
        percentage: "74%",
        isUp: true
      }
    },
    {
      title: "Remote Work Economy: New Financial Challenges",
      slug: "remote-work-financial-challenges",
      category: "career",
      description: "Navigating tax implications, cost of living adjustments, and salary negotiations in the permanently changed workplace.",
      author: "James Wilson",
      date: "April 15, 2025",
      image: "/cryptocurrency.png", // Using placeholder image
      trend: {
        percentage: "56%",
        isUp: true
      }
    },
    {
      title: "Gig Economy Tax Strategies for 2025",
      slug: "gig-economy-tax-strategies",
      category: "taxes",
      description: "Essential tax planning techniques for freelancers and gig workers under the new tax framework.",
      author: "Priya Patel",
      date: "April 12, 2025",
      image: "/cryptocurrency.png", // Using placeholder image
      trend: {
        percentage: "47%",
        isUp: true
      }
    },
    {
      title: "AI Investment Tools: Revolution or Risk?",
      slug: "ai-investment-tools-analysis",
      category: "investing",
      description: "A critical look at the new generation of AI-powered investment platforms and their performance track record.",
      author: "David Park",
      date: "April 10, 2025",
      image: "/cryptocurrency.png", // Using placeholder image
      trend: {
        percentage: "42%",
        isUp: true
      }
    },
    {
      title: "Student Loan Forgiveness: Latest Updates",
      slug: "student-loan-forgiveness-updates",
      category: "education",
      description: "Breaking down the recent changes to student loan forgiveness programs and eligibility requirements.",
      author: "Olivia Martinez",
      date: "April 8, 2025",
      image: "/cryptocurrency.png", // Using placeholder image
      trend: {
        percentage: "39%",
        isUp: true
      }
    },
    {
      title: "The 60/40 Portfolio is Dead: New Asset Allocation Models",
      slug: "new-asset-allocation-models",
      category: "investing",
      description: "Why traditional portfolio construction is failing in the current market and alternatives gaining traction.",
      author: "Thomas Johnson",
      date: "April 5, 2025",
      image: "/cryptocurrency.png", // Using placeholder image
      trend: {
        percentage: "35%",
        isUp: true
      }
    }
  ];

  return (
    <main className="max-w-[1100px] mx-auto px-5 py-12">
      <div className="flex items-center space-x-2 mb-2">
        <TrendingUp size={24} className="text-primary" />
        <span className="text-sm font-medium text-muted-foreground">TRENDING NOW</span>
      </div>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Trending Financial Topics</h1>
      <p className="text-xl text-muted-foreground mb-12">
        Stay ahead of the curve with the most discussed financial topics and market trends.
      </p>

      {/* Featured Trending Topic */}
      <div className="mb-16">
        <div className="relative rounded-xl overflow-hidden">
          <div className="aspect-[21/9] w-full bg-slate-200 dark:bg-slate-800">
            <img
              src={trendingTopics[0].image}
              alt={trendingTopics[0].title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 md:p-10">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary text-white text-sm font-medium mb-3 max-w-fit">
              <TrendingUp size={14} className="mr-1" /> 
              Trending {trendingTopics[0].trend.percentage} {trendingTopics[0].trend.isUp ? "↑" : "↓"}
            </span>
            <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">
              <Link href={`/category/${trendingTopics[0].category}/${trendingTopics[0].slug}`} className="hover:underline">
                {trendingTopics[0].title}
              </Link>
            </h2>
            <p className="text-white/90 mb-4 max-w-3xl">
              {trendingTopics[0].description}
            </p>
            <div className="flex items-center text-white/80">
              <span className="mr-4">{trendingTopics[0].author}</span>
              <Clock size={14} className="mr-1" />
              <time>{trendingTopics[0].date}</time>
            </div>
          </div>
        </div>
      </div>

      {/* Other Trending Topics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {trendingTopics.slice(1).map((topic) => (
          <Link 
            key={topic.slug}
            href={`/category/${topic.category}/${topic.slug}`}
            className="border dark:border-slate-700 rounded-lg overflow-hidden hover:shadow-md transition-all"
          >
            <div className="aspect-video w-full bg-slate-100 dark:bg-slate-800 relative">
              <img
                src={topic.image}
                alt={topic.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <span className="absolute top-3 left-3 inline-flex items-center px-2 py-1 rounded-full bg-primary text-white text-xs font-medium">
                <TrendingUp size={12} className="mr-1" /> 
                {topic.trend.percentage} {topic.trend.isUp ? "↑" : "↓"}
              </span>
            </div>
            <div className="p-5">
              <span className="text-xs text-primary uppercase font-medium mb-2 block">
                {topic.category.replace("-", " ")}
              </span>
              <h3 className="text-xl font-bold mb-2 line-clamp-2">{topic.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {topic.description}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span>{topic.author}</span>
                <div className="flex items-center text-muted-foreground">
                  <Clock size={14} className="mr-1" />
                  <time>{topic.date}</time>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Topic Categories Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Browse Topics By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: "Investing", slug: "investing", count: 128 },
            { name: "Cryptocurrency", slug: "cryptocurrency", count: 93 },
            { name: "Personal Finance", slug: "personal-finance", count: 87 },
            { name: "Real Estate", slug: "real-estate", count: 75 },
            { name: "Career", slug: "career", count: 62 },
            { name: "Education", slug: "education", count: 59 },
            { name: "Taxes", slug: "taxes", count: 48 },
            { name: "Retirement", slug: "retirement", count: 42 },
          ].map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="border dark:border-slate-700 rounded-md p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <h3 className="font-medium mb-1">{category.name}</h3>
              <span className="text-sm text-muted-foreground">{category.count} articles</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mb-8">
        <NewsletterSubscription 
          title="Get weekly trending updates" 
          description="Stay ahead of market trends with our curated weekly newsletter highlighting the most important financial developments."
        />
      </div>

      {/* More Resources Section */}
      <div className="border-t dark:border-slate-700 pt-12">
        <h2 className="text-2xl font-bold mb-6">More Financial Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Market Analysis</h3>
            <p className="text-muted-foreground mb-4">
              Expert analysis of current market conditions and future projections to inform your investment decisions.
            </p>
            <Link 
              href="#" 
              className="text-primary hover:underline flex items-center"
            >
              View analysis <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Financial Calculators</h3>
            <p className="text-muted-foreground mb-4">
              Essential tools to help you plan your financial future, from retirement to mortgage calculations.
            </p>
            <Link 
              href="#" 
              className="text-primary hover:underline flex items-center"
            >
              Try calculators <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="bg-slate-100 dark:bg-slate-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-2">Webinar Recordings</h3>
            <p className="text-muted-foreground mb-4">
              Catch up on our educational webinars covering the latest financial strategies and market insights.
            </p>
            <Link 
              href="#" 
              className="text-primary hover:underline flex items-center"
            >
              Watch now <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}