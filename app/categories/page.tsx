import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  TrendingUp, 
  PiggyBank, 
  Bitcoin, 
  Landmark, 
  BookOpen, 
  Briefcase,
  Home, 
  Calculator,
  Receipt,
  Lightbulb,
  Target,
  Heart,
  CreditCard,
  Clock
} from 'lucide-react';
import { NewsletterSubscription } from '@/components/ui/newsletter-subscription';

export const metadata: Metadata = {
  title: "Financial Categories - Money Mindset",
  description: "Browse all financial categories and topics covered on Money Mindset, from investing and cryptocurrency to personal finance and career advice.",
};

interface CategoryItem {
  name: string;
  slug: string;
  description: string;
  icon: React.ReactNode;
  popularTopics: string[];
  articleCount: number;
}

export default function CategoriesPage() {
  const categories: CategoryItem[] = [
    {
      name: "Investing",
      slug: "investing",
      description: "Learn about stock markets, ETFs, mutual funds, and strategies for long-term growth.",
      icon: <TrendingUp size={24} className="text-primary" />,
      popularTopics: ["Beginner Strategies", "Index Funds", "Stock Analysis", "Portfolio Management"],
      articleCount: 48
    },
    {
      name: "Saving",
      slug: "saving",
      description: "Effective ways to save money, build emergency funds, and achieve financial goals.",
      icon: <PiggyBank size={24} className="text-primary" />,
      popularTopics: ["Emergency Funds", "Budgeting Tips", "Saving Challenges", "High-Yield Accounts"],
      articleCount: 36
    },
    {
      name: "Cryptocurrency",
      slug: "cryptocurrency",
      description: "Navigate the world of digital assets, blockchain technology, and crypto investing.",
      icon: <Bitcoin size={24} className="text-primary" />,
      popularTopics: ["Bitcoin Basics", "Altcoins", "DeFi", "Crypto Security"],
      articleCount: 42
    },
    {
      name: "Banking",
      slug: "banking",
      description: "Find the best banking solutions, understand fees, and optimize your accounts.",
      icon: <Landmark size={24} className="text-primary" />,
      popularTopics: ["Online Banking", "Checking vs Savings", "Bank Fees", "Credit Unions"],
      articleCount: 28
    },
    {
      name: "Education",
      slug: "education",
      description: "Navigate student loans, education planning, and financial literacy resources.",
      icon: <BookOpen size={24} className="text-primary" />,
      popularTopics: ["Student Loan Repayment", "College Savings", "Scholarships", "Financial Literacy"],
      articleCount: 32
    },
    {
      name: "Career",
      slug: "career",
      description: "Maximize your earning potential, negotiate salaries, and plan career transitions.",
      icon: <Briefcase size={24} className="text-primary" />,
      popularTopics: ["Salary Negotiation", "Side Hustles", "Remote Work", "Career Growth"],
      articleCount: 30
    },
    {
      name: "Real Estate",
      slug: "real-estate",
      description: "Information on home buying, property investment, and real estate markets.",
      icon: <Home size={24} className="text-primary" />,
      popularTopics: ["First-Time Buyers", "Investment Properties", "Mortgages", "REITs"],
      articleCount: 26
    },
    {
      name: "Taxes",
      slug: "taxes",
      description: "Strategies for tax planning, deductions, and staying compliant with tax laws.",
      icon: <Calculator size={24} className="text-primary" />,
      popularTopics: ["Tax Deductions", "Filing Tips", "Tax-Efficient Investing", "Self-Employment Taxes"],
      articleCount: 22
    },
    {
      name: "Retirement",
      slug: "retirement",
      description: "Plan for retirement with advice on 401(k)s, IRAs, and long-term financial security.",
      icon: <Clock size={24} className="text-primary" />,
      popularTopics: ["401(k) Plans", "IRA Options", "Early Retirement", "Social Security"],
      articleCount: 24
    },
    {
      name: "Debt Management",
      slug: "debt",
      description: "Strategies to tackle debt, improve credit scores, and achieve financial freedom.",
      icon: <Receipt size={24} className="text-primary" />,
      popularTopics: ["Debt Snowball", "Credit Card Debt", "Student Loans", "Debt Consolidation"],
      articleCount: 35
    },
    {
      name: "Personal Finance",
      slug: "personal-finance",
      description: "Holistic approaches to managing your money and building wealth over time.",
      icon: <Lightbulb size={24} className="text-primary" />,
      popularTopics: ["Financial Independence", "Money Mindset", "Wealth Building", "Financial Planning"],
      articleCount: 40
    },
    {
      name: "Credit",
      slug: "credit",
      description: "Understanding credit scores, credit cards, and building a strong credit history.",
      icon: <CreditCard size={24} className="text-primary" />,
      popularTopics: ["Credit Score Improvement", "Card Comparisons", "Credit Reports", "Building Credit"],
      articleCount: 29
    }
  ];

  // Group categories into rows for better visual organization
  const groupCategories = (categoriesArray: CategoryItem[], itemsPerRow: number) => {
    const result = [];
    for (let i = 0; i < categoriesArray.length; i += itemsPerRow) {
      result.push(categoriesArray.slice(i, i + itemsPerRow));
    }
    return result;
  };

  const categoriesRows = groupCategories(categories, 3);

  return (
    <main className="max-w-[1100px] mx-auto px-5 py-12">
      <h1 className="text-4xl md:text-5xl font-bold mb-6">Financial Categories</h1>
      <p className="text-xl text-muted-foreground mb-12 max-w-3xl">
        Explore our comprehensive collection of financial topics, from investment strategies to personal finance advice.
      </p>

      {/* Categories Grid */}
      {categoriesRows.map((row, rowIndex) => (
        <div key={rowIndex} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {row.map((category) => (
            <div 
              key={category.slug}
              className="border dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-md transition-all"
            >
              <div className="p-6">
                <div className="mb-4">{category.icon}</div>
                <h2 className="text-2xl font-bold mb-2">
                  <Link href={`/category/${category.slug}`} className="hover:text-primary transition-colors">
                    {category.name}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-6">
                  {category.description}
                </p>
                
                <h3 className="text-sm font-medium text-muted-foreground mb-3">
                  Popular Topics
                </h3>
                <ul className="space-y-2 mb-6">
                  {category.popularTopics.map((topic, index) => (
                    <li key={index}>
                      <Link 
                        href={`/category/${category.slug}/${topic.toLowerCase().replace(/\s+/g, '-')}`}
                        className="hover:text-primary transition-colors text-sm"
                      >
                        {topic}
                      </Link>
                    </li>
                  ))}
                </ul>
                
                <div className="flex justify-between items-center pt-4 border-t dark:border-slate-700">
                  <span className="text-sm text-muted-foreground">
                    {category.articleCount} articles
                  </span>
                  <Link 
                    href={`/category/${category.slug}`}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    View All
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      {/* Topic Recommendations */}
      <section className="mb-12 bg-slate-100 dark:bg-slate-800 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6">Popular Topics This Month</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            "Recession-Proof Investments",
            "Navigating Market Volatility",
            "Inflation Hedging Strategies",
            "Remote Work Tax Implications",
            "First-Time Home Buying in 2025",
            "AI Investment Tools",
            "High-Yield Savings Accounts",
            "Credit Score Optimization"
          ].map((topic, index) => (
            <div 
              key={index}
              className="border dark:border-slate-700 rounded-lg p-4 bg-white dark:bg-slate-900 hover:shadow-sm transition-all"
            >
              <Link href={`/search?q=${encodeURIComponent(topic)}`}>
                <span className="text-sm hover:text-primary transition-colors">
                  {topic}
                </span>
              </Link>
            </div>
          ))}
        </div>
      </section>
      
      {/* Newsletter */}
      <div className="mb-12">
        <NewsletterSubscription 
          title="Subscribe to our newsletter" 
          description="Get curated content from all categories delivered directly to your inbox."
        />
      </div>
      
      {/* Skill Level Sections */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Browse by Experience Level</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="border dark:border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Target size={20} className="mr-2 text-primary" /> Beginner
            </h3>
            <p className="text-muted-foreground mb-4">
              Start your financial journey with foundational knowledge and simple strategies.
            </p>
            <ul className="space-y-2">
              <li><Link href="/category/investing/beginner-strategies" className="hover:text-primary transition-colors">Investing Fundamentals</Link></li>
              <li><Link href="/category/saving/budgeting-basics" className="hover:text-primary transition-colors">Budgeting Basics</Link></li>
              <li><Link href="/category/credit/building-credit" className="hover:text-primary transition-colors">Credit Building 101</Link></li>
              <li><Link href="/category/personal-finance/financial-planning" className="hover:text-primary transition-colors">First Financial Plan</Link></li>
            </ul>
          </div>
          
          <div className="border dark:border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Target size={20} className="mr-2 text-primary" /> Intermediate
            </h3>
            <p className="text-muted-foreground mb-4">
              Expand your knowledge with more advanced concepts and optimization strategies.
            </p>
            <ul className="space-y-2">
              <li><Link href="/category/investing/portfolio-building" className="hover:text-primary transition-colors">Portfolio Balancing</Link></li>
              <li><Link href="/category/taxes/tax-optimization" className="hover:text-primary transition-colors">Tax Optimization</Link></li>
              <li><Link href="/category/real-estate/property-investment" className="hover:text-primary transition-colors">Real Estate Analysis</Link></li>
              <li><Link href="/category/retirement/retirement-planning" className="hover:text-primary transition-colors">Retirement Planning</Link></li>
            </ul>
          </div>
          
          <div className="border dark:border-slate-700 rounded-lg p-6">
            <h3 className="text-xl font-bold mb-3 flex items-center">
              <Target size={20} className="mr-2 text-primary" /> Advanced
            </h3>
            <p className="text-muted-foreground mb-4">
              Master complex topics and sophisticated wealth-building strategies.
            </p>
            <ul className="space-y-2">
              <li><Link href="/category/investing/alternative-investments" className="hover:text-primary transition-colors">Alternative Investments</Link></li>
              <li><Link href="/category/cryptocurrency/defi-strategies" className="hover:text-primary transition-colors">DeFi Yield Strategies</Link></li>
              <li><Link href="/category/taxes/advanced-tax-planning" className="hover:text-primary transition-colors">Advanced Tax Planning</Link></li>
              <li><Link href="/category/retirement/early-retirement" className="hover:text-primary transition-colors">FIRE Movement Strategies</Link></li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}