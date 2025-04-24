import React from 'react';
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Button } from './button';

interface ShareButtonsProps {
  url: string;
  title: string;
}

export const ShareButtons: React.FC<ShareButtonsProps> = ({ url, title }) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-sm font-medium text-muted-foreground">Share:</span>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-8 h-8"
        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`, '_blank')}
        aria-label="Share on Twitter"
      >
        <Twitter size={16} />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-8 h-8"
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')}
        aria-label="Share on Facebook"
      >
        <Facebook size={16} />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-8 h-8"
        onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, '_blank')}
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={16} />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="rounded-full w-8 h-8"
        onClick={handleCopyLink}
        aria-label="Copy link"
      >
        <LinkIcon size={16} />
      </Button>
    </div>
  );
};