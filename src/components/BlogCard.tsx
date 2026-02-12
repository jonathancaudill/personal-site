import { Post } from "@/lib/blogMarkdown";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BlogCardProps {
  post: Post;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Card
      className="group relative flex h-full flex-col border-border transition-colors hover:bg-muted"
    >
      <CardHeader className="pb-0">
        <div className="font-ui text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          {post.date}
        </div>
        <h3 className="mt-2 font-display text-xl leading-snug text-foreground">
          {post.title}
        </h3>
      </CardHeader>
      <CardContent className="py-4 flex-grow">
        <p className="font-serif text-sm text-muted-foreground">{post.excerpt}</p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button
          variant="link"
          className="p-0 text-xs font-ui uppercase tracking-[0.22em]"
        >
          <span>Read more</span>
          <ArrowRight size={16} className="ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
