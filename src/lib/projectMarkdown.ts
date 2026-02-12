import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import remarkSlug from 'remark-slug';
import remarkToc from 'remark-toc';

// Import all markdown files from content/projects
const projectFiles = import.meta.glob('../content/projects/*.md', {
  query: '?raw',
  import: 'default',
});

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  slug: string;
  content: string;
  readingTime: number;
  date?: string;
  rank?: number;
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
  const data: Record<string, any> = {};
  
  frontmatter.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      // Handle arrays (technologies)
      if (key.trim() === 'technologies') {
        data[key.trim()] = value.split(',').map(tech => tech.trim());
      } else {
        data[key.trim()] = value;
      }
    }
  });
  
  return { data, content: markdownContent };
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  console.log('Getting project by slug:', slug);
  
  try {
    const filePath = `../content/projects/${slug}.md`;
    const content = await projectFiles[filePath]();
    
    if (!content) {
      console.log('No project found for slug:', slug);
      return null;
    }
    
    console.log('Project content loaded:', content.substring(0, 100) + '...');
    const { data, content: markdownContent } = parseFrontmatter(content);
    
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html)
      .process(markdownContent);
    
    return {
      title: data.title,
      description: data.description,
      technologies: data.technologies || [],
      image: data.image,
      githubUrl: data.githubUrl,
      liveUrl: data.liveUrl,
      slug: slug,
      content: processedContent.toString(),
      readingTime: calculateReadingTime(markdownContent),
      date: data.date,
      rank: data.rank !== undefined ? Number(data.rank) : undefined,
    };
  } catch (error) {
    console.error(`Error reading project ${slug}:`, error);
    return null;
  }
}

export async function getAllProjects(): Promise<Project[]> {
  console.log('Getting all projects...');
  try {
    const projects = await Promise.all(
      Object.entries(projectFiles).map(async ([filePath, getContent]) => {
        const slug = filePath.split('/').pop()?.replace('.md', '') || '';
        const content = await getContent();
        const { data, content: markdownContent } = parseFrontmatter(content);
        
        const processedContent = await remark()
          .use(remarkGfm)
          .use(html)
          .process(markdownContent);
        
        return {
          title: data.title,
          description: data.description,
          technologies: data.technologies || [],
          image: data.image,
          githubUrl: data.githubUrl,
          liveUrl: data.liveUrl,
          slug: slug,
          content: processedContent.toString(),
          readingTime: calculateReadingTime(markdownContent),
          date: data.date,
          rank: data.rank !== undefined ? Number(data.rank) : undefined,
        };
      })
    );
    
    console.log('All projects processed:', projects);
    return projects;
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
} 