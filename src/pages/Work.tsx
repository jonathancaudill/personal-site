import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import GradientBackground from "@/components/GradientBackground";
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
      <div className="relative min-h-screen">
        <GradientBackground />
        <div className="relative">
          <div className="container max-w-5xl mx-auto px-4 py-12 pt-24">
            <h1 className="text-4xl font-bold mb-8 text-white">Jonathan Caudill's Work</h1>
            <p className="text-gray-300 mb-8">
              A collection of my projects, contributions, and professional experience.
            </p>

            {/* Search bar */}
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {isLoading ? (
                <div className="col-span-full text-center text-gray-300">Loading projects...</div>
              ) : filteredProjects.length > 0 ? (
                filteredProjects.map((project) => (
                  <Link key={project.slug} to={`/work/${project.slug}`} className="block group">
                    <ProjectCard project={project} />
                  </Link>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-300">
                  {searchQuery ? 'No projects found matching your search.' : 'No projects available.'}
                </div>
              )}
            </div>

            <div className="mt-16 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-6">
              <h2 className="text-2xl font-semibold text-white">GitHub Contributions</h2>
              <p className="mt-2 text-gray-300">
                Check out Jonathan Caudill's open source contributions and other projects on GitHub.
              </p>
              <div className="mt-4">
                <a
                  href="https://github.com/jonathancaudill"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-300 hover:text-indigo-200"
                >
                  View GitHub Profile →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Work;
