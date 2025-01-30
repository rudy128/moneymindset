import rehypeDocument from "rehype-document"
import rehypeFormat from "rehype-format"
import rehypeStringify from "rehype-stringify"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import { unified } from "unified"

// const processContent = async (file: File | string, title: string) => {
//     if (file instanceof File){
//         const reader = new FileReader()
    
//         reader.onload = async () => {
//           const fileContent = reader.result as string
    
//           try {
//             const result = stringToMd(fileContent,title)
//             return (result.toString())
//           } catch (err) {
//             console.error("Error processing content:", err)
//           }
//         }
    
//         reader.readAsText(file) // Read the file as text (markdown content)
//     } else {
//         try {
//             const result = stringToMd(file,title)
//             return (result.toString())
//         } catch (err) {
//             console.error("Error processing content:", err)
//         }
        
//     }
// }

const processContent = async (file: File | string, title: string): Promise<string | undefined> => {
    if (file instanceof File) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
        
            reader.onload = async () => {
                const fileContent = reader.result as string;
                try {
                    const result = await stringToMd(fileContent, title);
                    resolve(result.toString()); // Resolve the promise with the processed content
                } catch (err) {
                    reject("Error processing content:" + err);
                }
            };
        
            reader.onerror = (error) => reject(error); // Reject on error
            reader.readAsText(file); // Read the file as text (markdown content)
        });
    } else {
        try {
            const result = await stringToMd(file, title);
            return result.toString();
        } catch (err) {
            console.error("Error processing content:", err);
        }
    }
};

async function stringToMd(content: string, title: string) {
    const processor = unified()
            .use(remarkParse)
            .use(remarkGfm)
            .use(remarkRehype)
            .use(rehypeStringify)
            .use(rehypeDocument, { title: title })
            .use(rehypeFormat)
    return await processor.process(content)
}

export default processContent