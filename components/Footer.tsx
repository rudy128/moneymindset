import React from 'react';
import Logo from './Logo';
import Link from 'next/link';
import { NewsletterSubscription } from './ui/newsletter-subscription';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ExternalLink } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();
  
  // Footer categories and links
  const footerSections = [
    {
      title: 'Categories',
      links: [
        { name: 'Investing', link: '/category/investing' },
        { name: 'Cryptocurrency', link: '/category/cryptocurrency' },
        { name: 'Saving', link: '/category/saving' },
        { name: 'Career', link: '/category/career' },
        { name: 'Education', link: '/category/education' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Financial Tools', link: '#' },
        { name: 'Book Recommendations', link: '#' },
        { name: 'Beginner Guides', link: '#' },
        { name: 'Glossary', link: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', link: '/about' },
        { name: 'Contact', link: '#' },
        { name: 'Privacy Policy', link: '/privacy-policy' },
        { name: 'Terms of Service', link: '/tos' }
      ]
    }
  ];
  
  const socialLinks = [
    { name: 'Facebook', icon: <Facebook size={18} />, link: 'https://facebook.com' },
    { name: 'Twitter', icon: <Twitter size={18} />, link: 'https://twitter.com' },
    { name: 'Instagram', icon: <Instagram size={18} />, link: 'https://instagram.com' },
    { name: 'LinkedIn', icon: <Linkedin size={18} />, link: 'https://linkedin.com' },
    { name: 'YouTube', icon: <Youtube size={18} />, link: 'https://youtube.com' }
  ];

  return (
    <footer className='w-full border-t border-t-black/10 dark:border-t-white/10 mt-12'>
      {/* Newsletter Section */}
      <div className='max-w-[1100px] mx-auto px-5 py-10 border-b border-b-black/10 dark:border-b-white/10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
          <div>
            <h3 className='text-2xl font-bold mb-2'>Subscribe to Our Newsletter</h3>
            <p className='text-muted-foreground mb-6'>
              Get the latest financial insights and tips delivered straight to your inbox.
            </p>
          </div>
          <div>
            <NewsletterSubscription variant="minimal" />
          </div>
        </div>
      </div>
      
      {/* Main Footer */}
      <div className='max-w-[1100px] mx-auto px-5 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-10'>
          {/* Brand Column */}
          <div className='md:col-span-1'>
            <Logo />
            <p className='mt-4 text-sm text-muted-foreground'>
              Money Mindset is your trusted source for financial education, investment strategies, and personal finance insights.
            </p>
            
            {/* Social Links */}
            <div className='mt-6'>
              <div className='flex gap-4'>
                {socialLinks.map((social) => (
                  <a 
                    key={social.name}
                    href={social.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className='inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary/20 transition-colors'
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Footer Navigation Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className='md:col-span-1'>
              <h4 className='font-bold mb-4'>{section.title}</h4>
              <ul className='space-y-3'>
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      href={link.link} 
                      className='text-muted-foreground hover:text-primary transition-colors'
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Bottom Footer */}
        <div className='mt-10 pt-6 border-t border-t-black/10 dark:border-t-white/10 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-muted-foreground text-center md:text-left'>
            © {year} Money Mindset. All rights reserved.
          </p>
          <p className='text-xs text-muted-foreground text-center md:text-right max-w-xl'>
            The content on this website is for informational purposes only and does not constitute financial advice, 
            recommendations, or endorsements. Always consult with a qualified financial advisor before making investment decisions.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;