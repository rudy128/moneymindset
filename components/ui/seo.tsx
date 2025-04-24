'use client';

import React from 'react';
import Head from 'next/head';
import Script from 'next/script';

interface SEOProps {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  articleData?: {
    publishedTime: string;
    modifiedTime?: string;
    author: {
      name: string;
      url?: string;
    };
    tags?: string[];
    section?: string;
  };
}

/**
 * SEO component that handles all structured data and meta tags
 */
export default function SEO({
  title = 'Money Mindset - Financial Knowledge for Everyone',
  description = 'Learn about personal finance, investing, saving, and building wealth through easy-to-understand guides and articles.',
  canonicalUrl,
  ogType = 'website',
  ogImage = '/money-mindset-logo.png',
  articleData
}: SEOProps) {
  // Base website structured data
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Money Mindset',
    url: 'https://moneymindset.com',
    description: 'Personal finance education platform',
    potentialAction: {
      '@type': 'SearchAction',
      target: '{search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  // Organization structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Money Mindset',
    url: 'https://moneymindset.com',
    logo: 'https://moneymindset.com/money-mindset-logo.png',
    sameAs: [
      'https://facebook.com/moneymindset',
      'https://twitter.com/moneymindset',
      'https://instagram.com/moneymindset'
    ]
  };

  // Article structured data (only included if this is an article page)
  const articleSchema = articleData ? {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: ogImage,
    author: {
      '@type': 'Person',
      name: articleData.author.name,
      url: articleData.author.url
    },
    publisher: {
      '@type': 'Organization',
      name: 'Money Mindset',
      logo: {
        '@type': 'ImageObject',
        url: 'https://moneymindset.com/money-mindset-logo.png'
      }
    },
    datePublished: articleData.publishedTime,
    dateModified: articleData.modifiedTime || articleData.publishedTime,
    mainEntityOfPage: canonicalUrl,
    keywords: articleData.tags ? articleData.tags.join(', ') : undefined,
    articleSection: articleData.section || 'Finance'
  } : null;

  // Combine all schema data
  const structuredData = [
    websiteSchema,
    organizationSchema,
    ...(articleSchema ? [articleSchema] : [])
  ];

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content={ogType} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        
        {/* Article specific meta tags */}
        {ogType === 'article' && articleData && (
          <>
            <meta property="article:published_time" content={articleData.publishedTime} />
            {articleData.modifiedTime && <meta property="article:modified_time" content={articleData.modifiedTime} />}
            <meta property="article:author" content={articleData.author.name} />
            {articleData.section && <meta property="article:section" content={articleData.section} />}
            {articleData.tags && articleData.tags.map((tag) => (
              <meta key={tag} property="article:tag" content={tag} />
            ))}
          </>
        )}
      </Head>
      
      {/* Structured Data JSON-LD */}
      <Script
        id="structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}