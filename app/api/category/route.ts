import { NextRequest, NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';
import matter from 'gray-matter';

export async function GET(req: NextRequest) {
  try {
    // Get the category from the URL query parameters
    const url = new URL(req.url);
    const category = url.searchParams.get('category');
    
    if (!category) {
      return NextResponse.json({ error: 'Category parameter is required' }, { status: 400 });
    }

    const contentDirectory = path.join(process.cwd(), 'content');
    
    // Read all markdown files in the content directory
    const files = fs.readdirSync(contentDirectory);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    // Process each markdown file to extract frontmatter
    const allPosts = markdownFiles.map(file => {
      const filePath = path.join(contentDirectory, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      
      return {
        title: data.title || 'Untitled',
        slug: data.slug || file.replace('.md', ''),
        date: data.date || '01/01/2025',
        author: data.author || 'Admin',
        description: data.description || 'No description available',
        images: data.images || '/cryptocurrency.png',
        category: data.category || 'uncategorized',
        featured: data.featured || false
      };
    });
    
    // Filter posts by the requested category
    const categoryPosts = allPosts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );
    
    return NextResponse.json({ data: categoryPosts }, { status: 200 });
    
  } catch (error) {
    console.error('Error fetching category posts:', error);
    return NextResponse.json({ error: 'Failed to fetch category posts' }, { status: 500 });
  }
}
