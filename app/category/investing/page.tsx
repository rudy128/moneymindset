import React from 'react';
import { CategoryBlog } from '@/components/CategoryBlogs';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Investing Articles - Money Mindset",
  description: "Expert insights on stock market investing, ETFs, mutual funds, and long-term investment strategies for financial growth.",
};

export default function InvestingPage() {
  return <CategoryBlog category="investing" />;
}