import { existsSync, readFileSync } from 'fs'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'
import path from 'path'

export function POST(req: Request) {
  return req.json().then((datas) => {
    const { slug } = datas;
    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }
    const filePath = path.join(process.cwd(), 'content', `${slug}.md`);
    if (!existsSync(filePath)) {
      return NextResponse.json({ error: 'Post not found' });
    }
    const fileContents = readFileSync(filePath, 'utf-8');
    const { data, content } = matter(fileContents);
    // console.log(typeof(data.date))
    // console.log(typeof(content))
    return NextResponse.json({ data: data, content: content });
  }).catch(err => {
    console.error('Error parsing JSON:', err);
    return NextResponse.json({ error: 'Invalid JSON format' }, { status: 400 });
  });
}

