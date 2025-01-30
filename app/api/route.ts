import { getServerSideProps } from '@/hooks/fileSyncer'
import { existsSync, readFileSync } from 'fs'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'
import path from 'path'

export async function GET(req: Request){
  const fileData: Array<object> = []
  const data = await getServerSideProps()
  data.map((file) => {
    const filePath = path.join(process.cwd(), 'content', file);
    const fileContents = readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContents);
    fileData.push(data)
  })
  return NextResponse.json({data: fileData,status: 200})
}

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

