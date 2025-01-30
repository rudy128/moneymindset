import { readdirSync } from "fs";
import path from "path";

export async function getServerSideProps() {
    const contentDir = path.join(process.cwd(), 'content');
    const files = readdirSync(contentDir);
  
    // Filter out non-Markdown files (if necessary)
    const markdownFiles = files.filter(file => file.endsWith('.md'));
  
    return markdownFiles;
}