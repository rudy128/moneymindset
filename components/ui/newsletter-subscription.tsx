'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle, AlertCircle } from 'lucide-react';

interface NewsletterSubscriptionProps {
  variant?: 'default' | 'minimal' | 'featured';
  title?: string;
  description?: string;
}

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  variant = 'default',
  title = 'Subscribe to Money Mindset Newsletter',
  description = 'Get weekly financial insights and tips delivered to your inbox.'
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }
    
    setStatus('loading');
    
    // This would typically be an API call to your newsletter service
    // For now, we'll just simulate a successful subscription
    setTimeout(() => {
      setStatus('success');
      setMessage('Thank you for subscribing!');
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }, 1500);
  };

  // Different visual styles based on variant
  if (variant === 'minimal') {
    return (
      <div className="py-3">
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="px-3 py-2 rounded-md border flex-grow min-w-[200px] bg-background"
            disabled={status === 'loading' || status === 'success'}
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 disabled:opacity-60"
            disabled={status === 'loading' || status === 'success'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
        {message && (
          <div className={`text-sm mt-2 flex items-center gap-1 ${status === 'error' ? 'text-red-500' : 'text-green-600'}`}>
            {status === 'error' ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
            {message}
          </div>
        )}
      </div>
    );
  }
  
  if (variant === 'featured') {
    return (
      <div className="bg-gradient-to-r from-slate-900 to-indigo-900 text-white p-8 rounded-lg shadow-lg">
        <div className="flex justify-between items-center flex-wrap gap-6">
          <div className="max-w-md">
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-200">{description}</p>
          </div>
          
          <div className="w-full md:w-auto">
            <form onSubmit={handleSubmit} className="flex flex-wrap md:flex-nowrap gap-2">
              <div className="relative w-full md:min-w-[300px]">
                <Mail size={18} className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="pl-10 px-4 py-3 rounded-md border border-gray-500 bg-gray-800 w-full text-white placeholder:text-gray-400"
                  disabled={status === 'loading' || status === 'success'}
                />
              </div>
              <button
                type="submit"
                className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary/90 disabled:opacity-60 w-full md:w-auto whitespace-nowrap"
                disabled={status === 'loading' || status === 'success'}
              >
                {status === 'loading' ? 'Subscribing...' : 'Subscribe Now'}
              </button>
            </form>
            {message && (
              <div className={`text-sm mt-2 flex items-center gap-1 ${status === 'error' ? 'text-red-400' : 'text-green-400'}`}>
                {status === 'error' ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // Default variant
  return (
    <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-6">
      <div className="text-center mb-4">
        <Mail size={24} className="mx-auto mb-2 text-primary" />
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          className="px-4 py-2 rounded-md border w-full mb-3 bg-background"
          disabled={status === 'loading' || status === 'success'}
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 w-full disabled:opacity-60"
          disabled={status === 'loading' || status === 'success'}
        >
          {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
        </button>
      </form>
      
      {message && (
        <div className={`text-sm mt-3 flex items-center justify-center gap-1 ${status === 'error' ? 'text-red-500' : 'text-green-600'}`}>
          {status === 'error' ? <AlertCircle size={14} /> : <CheckCircle size={14} />}
          {message}
        </div>
      )}
    </div>
  );
};