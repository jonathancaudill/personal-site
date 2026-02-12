import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "@/lib/blogMarkdown";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import BlogPost from "@/components/BlogPost";

const WritingDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Awaited<ReturnType<typeof getPostBySlug>>>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      try {
        const postData = await getPostBySlug(slug);
        setPost(postData);
      } catch (error) {
        console.error("Error loading post:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-muted-foreground">Loading post…</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-4 font-display text-3xl text-foreground">Post not found</h1>
          <p className="mb-8 font-serif text-sm text-muted-foreground">
            The post you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link to="/writing">
            <Button variant="outline">Back to all posts</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/writing">
        <Button
          variant="ghost"
          className="mb-8 flex items-center gap-2 px-0 font-ui text-xs uppercase tracking-[0.22em]"
        >
          <ArrowLeft size={14} />
          Back to all posts
        </Button>
      </Link>

      <article className="prose prose-lg max-w-none font-serif text-foreground dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-a:text-primary prose-blockquote:border-l-primary">
        <header className="mb-8">
          <p className="text-xs font-ui uppercase tracking-[0.22em] text-muted-foreground">
            Writing
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-3 flex items-center gap-3 text-xs font-ui uppercase tracking-[0.22em] text-muted-foreground">
            <time dateTime={post.date}>{post.date}</time>
            <span>•</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>

        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
};

export default WritingDetail;
