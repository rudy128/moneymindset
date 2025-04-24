'use client';

import React, { useEffect, useState } from 'react';

export const ReadingProgressBar = () => {
  const [readingProgress, setReadingProgress] = useState(0);

  useEffect(() => {
    const updateReadingProgress = () => {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      
      if (scrollHeight) {
        setReadingProgress(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        );
      }
    };

    // Update scroll position initially
    updateReadingProgress();
    
    // Add event listener
    window.addEventListener('scroll', updateReadingProgress);
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('scroll', updateReadingProgress);
  }, []);

  return (
    <div 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        backgroundColor: 'transparent',
        zIndex: 100,
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${readingProgress}%`,
          backgroundColor: 'var(--primary)',
          transition: 'width 0.3s ease'
        }}
      />
    </div>
  );
};