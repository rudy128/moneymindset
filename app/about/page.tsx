import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { NewsletterSubscription } from '@/components/ui/newsletter-subscription';

export const metadata: Metadata = {
  title: "About Money Mindset - Your Financial Education Resource",
  description: "Learn about our mission to help you achieve financial literacy and freedom through expert guidance and practical advice.",
};

export default function AboutPage() {
  return (
    <main className="max-w-[1100px] mx-auto px-5 py-12">
      <section className="mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Money Mindset</h1>
        <p className="text-xl mb-8 text-muted-foreground">
          Empowering you to make smarter financial decisions through education, guidance, and practical advice.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-10">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="mb-4">
              At Money Mindset, we believe that financial literacy is the foundation of personal freedom. Our mission is to demystify the world of finance and make quality financial education accessible to everyone, regardless of their background or current financial situation.
            </p>
            <p>
              We're committed to providing trustworthy, easy-to-understand information that helps our readers make informed decisions about their money, investments, and financial future.
            </p>
          </div>
          
          <div>
            <div className="rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-800 aspect-square flex items-center justify-center">
              <div className="text-center p-10">
                <h3 className="text-primary text-2xl mb-2 font-bold">Our Values</h3>
                <ul className="text-left space-y-2">
                  <li>✓ Accuracy and reliability</li>
                  <li>✓ Accessibility for all knowledge levels</li>
                  <li>✓ Actionable and practical advice</li>
                  <li>✓ Independence from financial influences</li>
                  <li>✓ Respect for diverse financial goals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <div className="rounded-lg overflow-hidden border dark:border-slate-700 hover:shadow-md transition-all">
            <div className="aspect-square bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <span className="text-4xl font-bold text-slate-400">JD</span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold mb-1">Jane Doe</h3>
              <p className="text-sm text-primary mb-3">Founder & Financial Advisor</p>
              <p className="text-muted-foreground text-sm">
                With 15+ years in investment banking and personal finance management, Jane has dedicated her career to making financial education more accessible.
              </p>
            </div>
          </div>
          
          {/* Team Member 2 */}
          <div className="rounded-lg overflow-hidden border dark:border-slate-700 hover:shadow-md transition-all">
            <div className="aspect-square bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <span className="text-4xl font-bold text-slate-400">JS</span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold mb-1">John Smith</h3>
              <p className="text-sm text-primary mb-3">Investment Specialist</p>
              <p className="text-muted-foreground text-sm">
                A certified financial analyst with experience in both traditional and cryptocurrency markets, helping readers understand investment opportunities.
              </p>
            </div>
          </div>
          
          {/* Team Member 3 */}
          <div className="rounded-lg overflow-hidden border dark:border-slate-700 hover:shadow-md transition-all">
            <div className="aspect-square bg-slate-200 dark:bg-slate-800 flex items-center justify-center">
              <span className="text-4xl font-bold text-slate-400">AR</span>
            </div>
            <div className="p-5">
              <h3 className="text-xl font-bold mb-1">Amara Rodriguez</h3>
              <p className="text-sm text-primary mb-3">Personal Finance Editor</p>
              <p className="text-muted-foreground text-sm">
                Specializing in budgeting, debt management, and financial planning for millennials and Gen Z audiences.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-4">Our Approach</h2>
          <p className="mb-6">
            We approach financial education with a few core principles in mind:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-3">Accessibility</h3>
              <p className="text-muted-foreground">
                We break down complex financial concepts into clear, understandable language that doesn't require a finance degree to comprehend.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Actionability</h3>
              <p className="text-muted-foreground">
                Our content focuses on practical steps you can take today, not just theoretical concepts with no real-world application.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Adaptability</h3>
              <p className="text-muted-foreground">
                We recognize that financial advice isn't one-size-fits-all and provide options for various life situations and goals.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Accuracy</h3>
              <p className="text-muted-foreground">
                All our content is thoroughly researched and regularly updated to ensure you get the most current and reliable information.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
        <p className="text-lg mb-8">
          Have questions, feedback, or suggestions? We'd love to hear from you. Reach out to our team at <a href="mailto:contact@moneymindset.com" className="text-primary hover:underline">contact@moneymindset.com</a>.
        </p>
        
        <div className="flex items-center justify-center">
          <Link 
            href="/categories" 
            className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90"
          >
            Explore Our Categories <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>
      </section>
      
      <section>
        <NewsletterSubscription 
          variant="featured"
          title="Join Our Financial Community"
          description="Get weekly insights, tips, and resources to help you on your financial journey."
        />
      </section>
    </main>
  );
}