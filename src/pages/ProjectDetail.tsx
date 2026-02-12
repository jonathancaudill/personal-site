import { useParams, Link } from "react-router-dom";
import { getProjectBySlug } from "@/lib/projectMarkdown";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Awaited<ReturnType<typeof getProjectBySlug>>>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProject = async () => {
      if (!slug) return;
      
      try {
        const projectData = await getProjectBySlug(slug);
        setProject(projectData);
      } catch (error) {
        console.error("Error loading project:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProject();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center text-sm text-muted-foreground">Loading project…</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="mb-4 font-display text-3xl text-foreground">Project not found</h1>
          <p className="mb-8 font-serif text-sm text-muted-foreground">
            The project you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link to="/work">
            <Button variant="outline">Back to all projects</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <Link to="/work">
        <Button
          variant="ghost"
          className="mb-8 flex items-center gap-2 px-0 font-ui text-xs uppercase tracking-[0.22em]"
        >
          <ArrowLeft size={14} />
          Back to all projects
        </Button>
      </Link>

      <article className="prose prose-lg max-w-none font-serif text-foreground dark:prose-invert prose-headings:font-display prose-headings:text-foreground prose-a:text-primary prose-blockquote:border-l-primary">
        <header className="mb-6">
          <p className="text-xs font-ui uppercase tracking-[0.22em] text-muted-foreground">
            Project
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-xs font-ui uppercase tracking-[0.22em] text-muted-foreground">
            {project.date && (
              <span>
                {new Date(project.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            )}
            {project.readingTime && (
              <>
                <span>•</span>
                <span>{project.readingTime} min read</span>
              </>
            )}
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button size="sm" asChild>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink size={16} />
                  <span>Visit</span>
                </a>
              </Button>
            )}
          </div>
        </header>

        <div dangerouslySetInnerHTML={{ __html: project.content }} />
      </article>
    </div>
  );
};

export default ProjectDetail; 