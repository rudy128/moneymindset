import React, { useState } from 'react';
import { Button } from './button';
import { MessageCircle, Send, User } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
  authorImage?: string;
}

interface CommentsProps {
  comments?: Comment[];
  postSlug: string;
}

export const Comments: React.FC<CommentsProps> = ({ 
  comments: initialComments = [], 
  postSlug 
}) => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !name.trim()) return;
    
    setIsSubmitting(true);
    
    // This is a placeholder for actual API integration
    // In a real app, you would call your API to save the comment
    setTimeout(() => {
      const comment: Comment = {
        id: Date.now().toString(),
        author: name,
        content: newComment,
        date: new Date().toISOString(),
      };
      
      setComments([...comments, comment]);
      setNewComment('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="mt-16 pt-8 border-t">
      <h2 className="flex items-center gap-2 text-2xl font-bold mb-8">
        <MessageCircle />
        Comments ({comments.length})
      </h2>
      
      {comments.length > 0 ? (
        <div className="space-y-6 mb-10">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                {comment.authorImage ? (
                  <img 
                    src={comment.authorImage} 
                    alt={comment.author} 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <User size={20} className="text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{comment.author}</span>
                  <span className="text-sm text-gray-500">
                    {new Date(comment.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 italic mb-8">Be the first to comment on this article!</p>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
            required
          />
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium mb-1">
            Your Comment
          </label>
          <textarea
            id="comment"
            rows={4}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-transparent"
            required
          ></textarea>
        </div>
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="flex items-center gap-2"
        >
          <Send size={16} />
          {isSubmitting ? 'Submitting...' : 'Post Comment'}
        </Button>
      </form>
    </div>
  );
};