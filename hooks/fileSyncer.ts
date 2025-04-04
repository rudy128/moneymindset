import { readdirSync } from "fs";
import path from "path";

export async function getServerSideProps(pwd: string) {
    const contentDir = path.join(process.cwd(), pwd);
    const files = readdirSync(contentDir);
  
    // Filter out non-Markdown files (if necessary)
    const markdownFiles = files.filter(file => file.endsWith('.md'));
  
    return markdownFiles;
}