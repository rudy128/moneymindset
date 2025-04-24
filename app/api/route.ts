import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

export async function GET() {
  try {
    const contentDirectory = path.join(process.cwd(), 'content');
    
    // Read all markdown files in the content directory
    const files = fs.readdirSync(contentDirectory);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    // Process each markdown file to extract frontmatter
    const posts = markdownFiles.map(file => {
      const filePath = path.join(contentDirectory, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        title: data.title || 'Untitled',
        slug: data.slug || file.replace('.md', ''),
        date: data.date || '01/01/2025',
        author: data.author || 'Admin',
        description: data.description || 'No description available',
        images: data.images || '/cryptocurrency.png', // Default image if none provided
        category: data.category || 'uncategorized',
        featured: data.featured || false
      };
    });
    
    return NextResponse.json({ data: posts }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { slug } = body;
    
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    // Handle array of slugs (for nested routes)
    const slugString = Array.isArray(slug) ? slug[slug.length - 1] : slug;
    
    const contentDirectory = path.join(process.cwd(), 'content');
    const files = fs.readdirSync(contentDirectory);
    
    // First try exact match
    let filePath = path.join(contentDirectory, `${slugString}.md`);
    
    // If file doesn't exist with exact name, search for it
    if (!fs.existsSync(filePath)) {
      const matchedFile = files.find(file => {
        const fileContent = fs.readFileSync(path.join(contentDirectory, file), 'utf8');
        const { data } = matter(fileContent);
        return data.slug === slugString || file.replace('.md', '') === slugString;
      });
      
      if (!matchedFile) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      
      filePath = path.join(contentDirectory, matchedFile);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return NextResponse.json({ 
      data: {
        title: data.title || 'Untitled',
        slug: data.slug || path.basename(filePath).replace('.md', ''),
        date: data.date || '01/01/2025',
        author: data.author || 'Admin',
        description: data.description || 'No description available',
        image: data.image || '/cryptocurrency.png',
        category: data.category || 'uncategorized'
      },
      content: content
    }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
  }
}

