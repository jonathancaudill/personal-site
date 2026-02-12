import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getAllProjects, Project } from "@/lib/projectMarkdown";
import ProjectCard from "@/components/ProjectCard";
import { Link } from "react-router-dom";
import SEOHead from "@/components/SEOHead";

const Work = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allProjects = await getAllProjects();
        // Sort projects by rank (ascending), unranked last
        const sortedProjects = [...allProjects].sort((a, b) => {
          if (a.rank === undefined && b.rank === undefined) return 0;
          if (a.rank === undefined) return 1;
          if (b.rank === undefined) return -1;
          return a.rank - b.rank;
        });
        setProjects(sortedProjects);
      } catch (error) {
        console.error("Error loading projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) =>
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <>
      <SEOHead 
        title="Jonathan Caudill's Work & Projects"
        description="Explore Jonathan Caudill's portfolio of projects, contributions, and professional experience. View his work in analysis, development, and technology."
        keywords="Jonathan Caudill work, projects, portfolio, analysis, development, technology, GitHub contributions"
        url="/work"
        type="website"
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <header className="border-b border-border pb-10 pt-4">
          <p className="text-xs font-ui uppercase tracking-[0.22em] text-muted-foreground">
            Work
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            Projects, products, and tools.
          </h1>
          <p className="mt-4 max-w-2xl font-serif text-base leading-relaxed text-muted-foreground">
            A small selection of things I&apos;ve shipped or am actively working on.
          </p>
          <div className="relative mt-6 max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title, tech, or description…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 rounded-none border-border pl-9 font-ui text-sm"
            />
          </div>
        </header>

        <main className="py-10">
          {isLoading ? (
            <div className="text-center text-sm text-muted-foreground">Loading projects…</div>
          ) : filteredProjects.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2">
              {filteredProjects.map((project) => (
                <Link key={project.slug} to={`/work/${project.slug}`} className="block group">
                  <ProjectCard project={project} />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              {searchQuery ? "No projects found matching your search." : "No projects available."}
            </div>
          )}

          <section className="mt-16 border-t border-border pt-8">
            <h2 className="font-display text-xl text-foreground">GitHub</h2>
            <p className="mt-2 max-w-xl font-serif text-sm text-muted-foreground">
              For more experiments, half-finished ideas, and source code, you can wander
              through my GitHub.
            </p>
            <div className="mt-4">
              <a
                href="https://github.com/jonathancaudill"
                target="_blank"
                rel="noopener noreferrer"
                className="font-ui text-xs uppercase tracking-[0.22em] text-primary hover:underline"
              >
                View GitHub profile
              </a>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Work;
