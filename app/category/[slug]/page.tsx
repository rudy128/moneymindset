import React from 'react';
import { Blog } from '@/components/Blog';
import { Metadata } from 'next';

type Props = {
  params: {
    slug: string;
    articleSlug: string;
  };
};

export function generateMetadata({ params }: Props): Metadata {
  // Convert slugs to display format
  const categoryDisplay = params.slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
    
  const articleDisplay = params?.articleSlug?.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${articleDisplay} - Money Mindset`,
    description: `Learn about ${articleDisplay?.toLowerCase()} in our comprehensive guide on ${categoryDisplay.toLowerCase()}.`,
    openGraph: {
      title: `${articleDisplay} - Money Mindset`,
      description: `Learn about ${articleDisplay?.toLowerCase()} in our comprehensive guide on ${categoryDisplay.toLowerCase()}.`,
      url: `https://moneymindset.com/category/${params.slug}/${params.articleSlug}`,
      siteName: "Money Mindset",
      type: "article",
    }
  };
}

export default function ArticlePage({ params }: Props) {
  // Combine category and article slug for proper article retrieval
  const fullSlug = `${params.slug}/${params.articleSlug}`;
  return <Blog slug={params.articleSlug} />;
}