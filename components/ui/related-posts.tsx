import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from './card';

interface RelatedPost {
  title: string;
  slug: string;
  category: string;
  image?: string;
}

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export const RelatedPosts: React.FC<RelatedPostsProps> = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, index) => (
          <Link 
            href={`/${post.category}/${post.slug}`}
            key={index}
            className="no-underline hover:no-underline"
          >
            <Card className="h-full overflow-hidden hover:shadow-md transition-shadow duration-200">
              <div className="h-48 relative">
                <Image 
                  src={post.image || '/placeholder-image.jpg'} 
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-200 hover:scale-105"
                />
              </div>
              <CardContent className="pt-4">
                <h3 className="text-lg font-semibold line-clamp-2">{post.title}</h3>
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};