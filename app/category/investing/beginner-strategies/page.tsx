import React from 'react';
import { Blog } from '@/components/Blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Top Investing Strategies for Beginners - Money Mindset",
  description: "A comprehensive guide to getting started with investing even if you have no prior experience. Learn the basics and start building wealth.",
  openGraph: {
    title: "Top Investing Strategies for Beginners - Money Mindset",
    description: "A comprehensive guide to getting started with investing even if you have no prior experience.",
    url: "https://moneymindset.com/category/investing/beginner-strategies",
    siteName: "Money Mindset",
    type: "article",
  }
};

export default function BeginnerStrategiesPage() {
  return <Blog slug="beginner-strategies" />;
}