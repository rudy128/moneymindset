import React from 'react'
import SEO from '@/components/ui/seo'

export default function TermsOfServicePage() {
  return (
    <div className="container max-w-4xl py-12">
      <SEO 
        title="Terms of Service | Money Mindset" 
        description="Money Mindset's Terms of Service - Learn about the rules and guidelines for using our platform."
        canonicalUrl="https://moneymindset.com/tos"
      />
      
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <p className="text-lg mb-6">
          Last Updated: April 25, 2025
        </p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            These Terms of Service ("Terms") govern your use of the Money Mindset website and all content, 
            services, and products available at or through the website. By accessing or using any part of 
            the website, you agree to be bound by these Terms. If you do not agree to all the Terms, then 
            you may not access the website or use any services.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Account Responsibilities</h2>
          <p className="mb-4">
            If you create an account on the website, you are responsible for maintaining the security of 
            your account, and you are fully responsible for all activities that occur under the account. 
            You must immediately notify Money Mindset of any unauthorized uses of your account or any other 
            breaches of security. Money Mindset will not be liable for any acts or omissions by you, 
            including any damages of any kind incurred as a result of such acts or omissions.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Content and Conduct</h2>
          <p className="mb-4">
            Our website allows you to post, link, store, share and otherwise make available certain information, 
            text, graphics, videos, or other material. You are responsible for the content that you post to the 
            website, including its legality, reliability, and appropriateness.
          </p>
          
          <p className="mb-4">
            By posting content to the website, you grant Money Mindset the right to use, modify, publicly perform, 
            publicly display, reproduce, and distribute such content on and through the website. You retain any 
            and all of your rights to any content you submit, post or display on or through the website and you 
            are responsible for protecting those rights.
          </p>
          
          <p>
            You agree that you will not post content that is:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>False, misleading, or deceptive</li>
            <li>Defamatory, obscene, pornographic, vulgar, or offensive</li>
            <li>Promoting discrimination, bigotry, racism, hatred against any individual or group</li>
            <li>Infringing on any intellectual property or right of any person or entity</li>
            <li>In violation of any law or regulation</li>
            <li>Likely to deceive or mislead us or others as to your identity or affiliation</li>
            <li>Impersonating a person or entity, or falsely stating your affiliation</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="mb-4">
            The website and its original content (excluding content provided by users), features, and functionality 
            are and will remain the exclusive property of Money Mindset. The website is protected by copyright, 
            trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress 
            may not be used in connection with any product or service without the prior written consent of Money Mindset.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Links To Other Web Sites</h2>
          <p className="mb-4">
            Our website may contain links to third-party websites or services that are not owned or controlled 
            by Money Mindset. Money Mindset has no control over, and assumes no responsibility for, the content, 
            privacy policies, or practices of any third-party websites or services. You further acknowledge and agree 
            that Money Mindset shall not be responsible or liable, directly or indirectly, for any damage or loss caused 
            or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services 
            available on or through any such websites or services.
          </p>
          <p>
            We strongly advise you to read the terms and conditions and privacy policies of any third-party 
            websites or services that you visit.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Financial Disclaimer</h2>
          <p>
            The content on Money Mindset is provided for informational purposes only and is not intended to be 
            investment, legal, tax, or other professional advice. The information should not be construed as a 
            recommendation to buy, sell or hold any investment or security, or to engage in any investment strategy 
            or transaction. You are solely responsible for determining whether any investment, investment strategy, 
            security, or related transaction is appropriate for you based on your personal investment objectives, 
            financial circumstances, and risk tolerance. Always consult your legal or tax professional regarding 
            your specific situation.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Termination</h2>
          <p>
            We may terminate or suspend your account and bar access to the website immediately, without prior 
            notice or liability, under our sole discretion, for any reason whatsoever and without limitation, 
            including but not limited to a breach of the Terms. If you wish to terminate your account, you may 
            simply discontinue using the website. All provisions of the Terms which by their nature should survive 
            termination shall survive termination, including, without limitation, ownership provisions, warranty 
            disclaimers, indemnity, and limitations of liability.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
            If a revision is material we will provide at least 30 days' notice prior to any new terms 
            taking effect. What constitutes a material change will be determined at our sole discretion.
            By continuing to access or use our website after any revisions become effective, you agree to 
            be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized 
            to use the website.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us at:
          </p>
          <address className="mt-4 not-italic">
            Money Mindset<br />
            Email: legal@moneymindset.com<br />
            Phone: (555) 123-4567
          </address>
        </section>
      </div>
    </div>
  )
}