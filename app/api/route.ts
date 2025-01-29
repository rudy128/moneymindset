// // Example: pages/api/get-post.ts

// import { existsSync, readFileSync } from 'fs';
// import path from 'path';
// import matter from 'gray-matter';
// import { NextApiRequest, NextApiResponse } from 'next';
// import { NextRequest, NextResponse } from 'next/server';

// export default async function GET(req: NextRequest, res: NextApiResponse) {
//   // const { slug } = req.query;
//   // const filePath = path.join(process.cwd(), 'content', `${slug}.md`);

//   // if (!existsSync(filePath)) {
//   //   return res.status(404).json({ message: 'Post not found' });
//   // }

//   // const fileContents = readFileSync(filePath, 'utf-8');
//   // const { data, content } = matter(fileContents);

//   // res.status(200).json({ frontMatter: data, content });
//   console.log(req)
//   res.status(200)
// }


// app/api/route.ts (named exports for GET and POST)

import { existsSync, readFileSync } from 'fs'
import matter from 'gray-matter'
import { NextResponse } from 'next/server'
import path from 'path'

export function GET(req: Request) {
  const url = new URL(req.url)
  const slug = url.searchParams.get('slug')  // Extract the slug query parameter
  
  if (!slug) {
    return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
  }

  return NextResponse.json({ slug })
}

// export function POST(req: Request) {
//   return req.json().then((datas) => {
//     const { slug } = datas
//     if (!slug) {
//       return NextResponse.json({ error: 'Slug is required' }, { status: 400 })
//     }
//     const filePath = path.join(process.cwd(), 'content', `${slug}.md`);
//     if (!existsSync(filePath)) {
//       return NextResponse.json({ message: 'Post not found' });
//     }
//     const fileContents = readFileSync(filePath, 'utf-8');
//     const { data, content } = matter(fileContents);
//     return NextResponse.json({ data:data,content:content })
//   })
// }

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

