import { useState, useEffect } from "react";
import { getAllPosts, Post } from "@/lib/blogMarkdown";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import BlogCard from "@/components/BlogCard";
import SEOHead from "@/components/SEOHead";

const Writing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error("Error loading posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <SEOHead 
        title="Jonathan Caudill's Writing & Blog"
        description="Read Jonathan Caudill's thoughts, musings, essays, and writings. Explore his blog posts and articles on various topics."
        keywords="Jonathan Caudill writing, blog, articles, essays, thoughts, musings, blog posts"
        url="/writing"
        type="website"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="border-b border-border pb-10 pt-4">
          <p className="text-xs font-ui uppercase tracking-[0.22em] text-muted-foreground">
            Writing
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Essays, notes, and experiments.
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-muted-foreground">
            Working notes in public: part lab notebook, part essay collection.
          </p>
          <div className="relative mt-6 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title or summary…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-none border-border pl-9 font-ui text-sm"
            />
          </div>
        </header>

        <main className="py-10">
          {isLoading ? (
            <div className="text-center text-sm text-muted-foreground">Loading posts…</div>
          ) : filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {filteredPosts.map((post) => (
                <Link key={post.slug} to={`/writing/${post.slug}`} className="group block h-full">
                  <BlogCard post={post} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              {searchQuery ? "No posts found matching your search." : "No posts available."}
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Writing;
