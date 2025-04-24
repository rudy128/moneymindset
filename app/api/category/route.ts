import { getServerSideProps } from "@/hooks/fileSyncer";
import { readFileSync } from "fs";
import matter from "gray-matter";
import { NextResponse } from "next/server";
import path from "path";

export async function GET(req: Request){
    console.log(req)
    const fileData: Array<object> = []
    const data = await getServerSideProps("content/")
    data.map((file) => {
      const filePath = path.join(process.cwd(), 'content', file);
      const fileContents = readFileSync(filePath, 'utf-8');
      const { data } = matter(fileContents);
      fileData.push(data)
    })
    return NextResponse.json({data: fileData,status: 200})
  }
  