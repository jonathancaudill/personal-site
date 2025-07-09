import { useState, useEffect } from "react";
import { getAllPosts, Post } from "@/lib/blogMarkdown";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import GradientBackground from "@/components/GradientBackground";
import { format } from "date-fns";
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
      <div className="relative min-h-screen">
        <GradientBackground />
        <div className="relative">
          <div className="container max-w-5xl mx-auto px-4 py-12 pt-24">
            <h1 className="text-4xl font-bold mb-8 text-white">Jonathan Caudill's Writing</h1>
            <p className="text-gray-300 mb-8">
              Thoughts, musings, essays, and writings.
            </p>

            {/* Search bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <div className="col-span-full text-center text-gray-300">Loading posts...</div>
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <Link 
                    key={post.slug} 
                    to={`/writing/${post.slug}`}
                    className="group block h-full"
                  >
                    <BlogCard post={post} />
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-300">
                  {searchQuery ? 'No posts found matching your search.' : 'No posts available.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Writing;
