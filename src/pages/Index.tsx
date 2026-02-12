import { Link } from "react-router-dom";
import { AnimatedButton } from "@/components/ui/animated-button";
import { getAllPosts, Post } from "@/lib/blogMarkdown";
import { getAllProjects, Project } from "@/lib/projectMarkdown";
import ProjectCard from "@/components/ProjectCard";
import { useEffect, useState } from "react";
import BlogCard from "@/components/BlogCard";
import { PdfLink } from "@/components/PdfLink";
import SEOHead from "@/components/SEOHead";

const Index = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    const loadContent = async () => {
      const [posts, projects] = await Promise.all([
        getAllPosts(),
        getAllProjects()
      ]);
      setRecentPosts(posts.slice(0, 3));
      // Sort projects by rank (ascending), unranked last
      const sortedProjects = [...projects].sort((a, b) => {
        if (a.rank === undefined && b.rank === undefined) return 0;
        if (a.rank === undefined) return 1;
        if (b.rank === undefined) return -1;
        return a.rank - b.rank;
      });
      setFeaturedProjects(sortedProjects.slice(0, 2));
    };
    loadContent();
  }, []);

  return (
    <>
      <SEOHead 
        title="Jonathan Caudill - Analyst, Writer, Thinker"
        description="Jonathan Caudill is an analyst, writer, and amateur thinker passionate about creating, learning, and sharing knowledge. Explore his work, writing, and projects on his personal website."
        keywords="Jonathan Caudill, analyst, writer, thinker, personal website, portfolio, projects, blog, writing, knowledge sharing"
        url="/"
        type="profile"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <section className="grid gap-10 border-b border-border pb-12 pt-8 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] md:items-end">
          <div className="space-y-8">
            <p className="text-xs font-ui uppercase tracking-[0.22em] text-muted-foreground">
              Analyst · Writer · Amateur thinker
            </p>
            <h1 className="font-display text-5xl leading-[1.05] text-foreground sm:text-6xl md:text-7xl">
              Jonathan
              <br />
              Caudill
            </h1>
            <p className="max-w-xl font-serif text-lg leading-relaxed text-muted-foreground">
              I study systems, write about what I&apos;m learning, and build small things
              that make life more legible.
            </p>
            <div className="flex flex-wrap gap-4">
              <AnimatedButton href="/writing">
                Read some writing
              </AnimatedButton>
              <AnimatedButton href="/work" variant="outline">
                See some work
              </AnimatedButton>
            </div>
          </div>
          <div className="flex justify-end md:justify-center">
            <div className="h-52 w-52 overflow-hidden rounded-full border border-border md:h-64 md:w-64">
              <img
                src="/headshot.jpg"
                alt="Jonathan Caudill"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="grid gap-12 py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1.6fr)]">
          <div className="space-y-6">
            <h2 className="font-ui text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Selected writing
            </h2>
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <article key={post.slug} className="border-b border-dashed border-border pb-4 last:border-b-0">
                  <p className="font-ui text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                    {post.date}
                  </p>
                  <Link
                    to={`/writing/${post.slug}`}
                    className="mt-1 inline-flex text-lg font-display leading-snug text-foreground hover:underline"
                  >
                    {post.title}
                  </Link>
                  <p className="mt-2 max-w-md text-sm font-serif text-muted-foreground">
                    {post.excerpt}
                  </p>
                </article>
              ))}
            </div>
            <Link
              to="/writing"
              className="font-ui text-xs uppercase tracking-[0.22em] text-primary hover:underline"
            >
              View all writing
            </Link>
          </div>

          <div className="space-y-6">
            <h2 className="font-ui text-xs uppercase tracking-[0.22em] text-muted-foreground">
              Selected work
            </h2>
            <div className="space-y-6">
              {featuredProjects.map((project) => (
                <article
                  key={project.slug}
                  className="flex flex-col gap-2 border-b border-dashed border-border pb-4 last:border-b-0"
                >
                  <Link
                    to={`/work/${project.slug}`}
                    className="inline-flex text-lg font-display leading-snug text-foreground hover:underline"
                  >
                    {project.title}
                  </Link>
                  <p className="max-w-md text-sm font-serif text-muted-foreground">
                    {project.description}
                  </p>
                </article>
              ))}
            </div>
            <Link
              to="/work"
              className="font-ui text-xs uppercase tracking-[0.22em] text-primary hover:underline"
            >
              View all projects
            </Link>
          </div>
        </section>
      </div>
    </>
  );
};

export default Index;
