import { remark } from 'remark';
import html from 'remark-html';
import { format, parseISO } from 'date-fns';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkSlug from 'remark-slug';
import remarkToc from 'remark-toc';

// Import all markdown files from content/blog
const blogFiles = import.meta.glob('../content/blog/*.md', {
  query: '?raw',
  import: 'default',
});

export interface Post {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  slug: string;
  readingTime: number;
}

function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function parseFrontmatter(content: string) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = content.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('No frontmatter found');
  }
  
  const [, frontmatter, markdownContent] = match;
  const data: Record<string, string> = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      data[key.trim()] = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });
  
  return { data, content: markdownContent };
}

function formatDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, "MMMM d, yyyy");
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  console.log('Getting post by slug:', slug);
  
  try {
    const filePath = `../content/blog/${slug}.md`;
    const content = await blogFiles[filePath]();
    
    if (!content) {
      console.log('No post found for slug:', slug);
      return null;
    }
    
    console.log('Post content loaded:', content.substring(0, 100) + '...');
    const { data, content: markdownContent } = parseFrontmatter(content);
    
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(markdownContent);
    
    return {
      title: data.title,
      excerpt: data.excerpt,
      content: processedContent.toString(),
      date: formatDate(data.date),
      slug: slug,
      readingTime: calculateReadingTime(markdownContent)
    };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

export async function getAllPosts(): Promise<Post[]> {
  console.log('Getting all posts...');
  try {
    const posts = await Promise.all(
      Object.entries(blogFiles).map(async ([filePath, getContent]) => {
        const slug = filePath.split('/').pop()?.replace('.md', '') || '';
        const content = await getContent();
        const { data, content: markdownContent } = parseFrontmatter(content);
        
        const processedContent = await remark()
          .use(remarkGfm)
          .use(html)
          .process(markdownContent);
        
        return {
          title: data.title,
          excerpt: data.excerpt,
          content: processedContent.toString(),
          date: formatDate(data.date),
          slug: slug,
          readingTime: calculateReadingTime(markdownContent)
        };
      })
    );
    
    console.log('All posts processed:', posts);
    return posts.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error reading posts:', error);
    return [];
  }
} 