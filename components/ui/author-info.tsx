import React from 'react';
import { Clock } from 'lucide-react';
import Image from 'next/image';

interface AuthorInfoProps {
  author: string;
  date: string;
  readingTime?: string;
  authorImage?: string;
}

export const AuthorInfo: React.FC<AuthorInfoProps> = ({ 
  author, 
  date, 
  readingTime = '5 min read',
  authorImage = '/author-placeholder.png'  // Default placeholder image
}) => {
  // Format date to be more readable
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  return (
    <div className="flex items-center gap-4 mt-6 mb-8">
      <div className="flex-shrink-0 w-12 h-12 rounded-full overflow-hidden bg-gray-200 relative">
        {/* Fallback to initials if image fails to load */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-600 font-medium">
          {author.charAt(0)}
        </div>
        {/* Try to load the image */}
        <div className="absolute inset-0">
          {authorImage && (
            <Image 
              src={authorImage} 
              alt={author} 
              width={48} 
              height={48}
              className="object-cover"
              onError={(e) => {
                // Hide image on error, showing the fallback
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
          )}
        </div>
      </div>
      <div>
        <p className="font-medium">{author}</p>
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
          <time dateTime={date}>{formattedDate}</time>
          <span>•</span>
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{readingTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};