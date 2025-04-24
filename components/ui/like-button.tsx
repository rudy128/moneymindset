import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from './button';

interface LikeButtonProps {
  initialLikes?: number;
}

export const LikeButton: React.FC<LikeButtonProps> = ({ initialLikes = 0 }) => {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = () => {
    if (isLiked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className={`flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 ${isLiked ? 'text-red-500' : ''}`}
      onClick={handleLikeClick}
    >
      <Heart size={20} className={`${isLiked ? 'fill-current' : ''}`} />
      <span>{likes}</span>
    </Button>
  );
};