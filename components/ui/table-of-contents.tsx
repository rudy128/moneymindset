'use client';

import React, { useEffect, useState } from 'react';
import { Link as LinkIcon } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  containerRef: React.RefObject<HTMLElement>;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ containerRef }) => {
  const [headings, setHeadings] = useState<TOCItem[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from the article
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Select all h2 and h3 elements within the container
    const elements = containerRef.current.querySelectorAll('h2, h3, h4');
    
    // Process the headings
    const headingElements = Array.from(elements).map((element) => {
      // Ensure each heading has an id for scrolling
      if (!element.id) {
        const id = element.textContent?.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || `heading-${Math.random().toString(36).substr(2, 9)}`;
        element.id = id;
      }
      
      return {
        id: element.id,
        text: element.textContent || '',
        level: parseInt(element.tagName.substring(1)), // Get heading level (2 for h2, 3 for h3, etc.)
      };
    });
    
    setHeadings(headingElements);
  }, [containerRef]);

  // Update active heading based on scroll position
  useEffect(() => {
    if (headings.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-100px 0px -80% 0px' }
    );
    
    // Observe all headings
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });
    
    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [headings]);

  if (headings.length < 3) {
    return null; // Don't show TOC for articles with too few headings
  }

  return (
    <div className="bg-slate-100 dark:bg-slate-800 p-4 md:p-6 rounded-lg mb-6 sticky top-24">
      <h4 className="text-lg font-bold mb-3 flex items-center gap-2">
        <LinkIcon size={18} />
        Table of Contents
      </h4>
      <nav>
        <ul className="space-y-1">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
            >
              <a
                href={`#${heading.id}`}
                className={`block py-1 text-sm hover:text-primary transition-colors ${
                  activeId === heading.id 
                    ? 'text-primary font-medium' 
                    : 'text-muted-foreground'
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};