import React from 'react'
import SEO from '@/components/ui/seo'

export default function PrivacyPolicyPage() {
  return (
    <div className="container max-w-4xl py-12">
      <SEO 
        title="Privacy Policy | Money Mindset" 
        description="Money Mindset's Privacy Policy - Learn about how we collect, use and protect your personal data."
        canonicalUrl="https://moneymindset.com/privacy-policy"
      />
      
      <div className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <p className="text-lg mb-6">
          Last Updated: April 25, 2025
        </p>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            At Money Mindset, we take your privacy seriously. This Privacy Policy explains how we collect, 
            use, disclose, and safeguard your information when you visit our website. 
            Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, 
            please do not access the site.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="mb-4">
            We may collect information about you in a variety of ways. The information we may collect via 
            the Website includes:
          </p>
          
          <h3 className="text-xl font-medium mb-3">Personal Data</h3>
          <p className="mb-3">
            Personally identifiable information, such as your name, email address, and telephone number,
            that you voluntarily give to us when you register with the Website or when you choose to participate
            in various activities related to the Website, such as online chat and message boards. 
            You are under no obligation to provide us with personal information of any kind, however, 
            your refusal to do so may prevent you from using certain features of the Website.
          </p>
          
          <h3 className="text-xl font-medium mb-3">Derivative Data</h3>
          <p>
            Information our servers automatically collect when you access the Website, such as your IP address, 
            your browser type, your operating system, your access times, and the pages you have viewed directly 
            before and after accessing the Website.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Use of Your Information</h2>
          <p className="mb-4">
            Having accurate information about you permits us to provide you with a smooth, efficient, 
            and customized experience. Specifically, we may use information collected about you via the Website to:
          </p>
          
          <ul className="list-disc pl-6 mb-4">
            <li>Create and manage your account.</li>
            <li>Email you regarding your account or order.</li>
            <li>Fulfill and manage purchases, orders, payments, and other transactions related to the Website.</li>
            <li>Generate a personal profile about you to make future visits to the Website more personalized.</li>
            <li>Increase the efficiency and operation of the Website.</li>
            <li>Monitor and analyze usage and trends to improve your experience with the Website.</li>
            <li>Notify you of updates to the Website.</li>
            <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity.</li>
            <li>Process payments and refunds.</li>
            <li>Resolve disputes and troubleshoot problems.</li>
            <li>Respond to product and customer service requests.</li>
            <li>Send you a newsletter.</li>
          </ul>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclosure of Your Information</h2>
          <p className="mb-4">
            We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
          </p>
          
          <h3 className="text-xl font-medium mb-3">By Law or to Protect Rights</h3>
          <p>
            If we believe the release of information about you is necessary to respond to legal process, 
            to investigate or remedy potential violations of our policies, or to protect the rights, property, 
            and safety of others, we may share your information as permitted or required by any applicable law, 
            rule, or regulation.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Security of Your Information</h2>
          <p>
            We use administrative, technical, and physical security measures to help protect your personal information. 
            While we have taken reasonable steps to secure the personal information you provide to us, 
            please be aware that despite our efforts, no security measures are perfect or impenetrable, 
            and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cookie Policy</h2>
          <p className="mb-4">
            Cookies are small files that a site or its service provider transfers to your computer's hard drive 
            through your Web browser (if you allow) that enables the site's or service provider's systems 
            to recognize your browser and capture and remember certain information.
          </p>
          <p>
            We use cookies to understand and save user's preferences for future visits and compile aggregate data 
            about site traffic and site interaction so that we can offer better site experiences and tools in the future.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Websites</h2>
          <p>
            The Website may contain links to third-party websites and applications of interest, 
            including advertisements and external services, that are not affiliated with us. 
            Once you have used these links to leave the Website, any information you provide to these third parties 
            is not covered by this Privacy Policy, and we cannot guarantee the safety and privacy of your information. 
            Before visiting and providing any information to any third-party websites, you should inform yourself of 
            the privacy policies and practices (if any) of the third party responsible for that website.
          </p>
        </section>
        
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have questions or comments about this Privacy Policy, please contact us at:
          </p>
          <address className="mt-4 not-italic">
            Money Mindset<br />
            Email: privacy@moneymindset.com<br />
            Phone: (555) 123-4567
          </address>
        </section>
      </div>
    </div>
  )
}