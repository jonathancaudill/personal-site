import { Project } from "@/lib/projectMarkdown";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const [showBanner, setShowBanner] = useState(false);
  const [fadeBanner, setFadeBanner] = useState(false);

  const handleLiveDemoClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (project.title === "Personal Website") {
      e.preventDefault();
      setShowBanner(true);
      setFadeBanner(false);
      setTimeout(() => setFadeBanner(true), 1800);
      setTimeout(() => setShowBanner(false), 2500);
    }
  };

  return (
    <Card
      className="group relative flex h-[480px] flex-col border-border transition-colors hover:bg-muted"
    >
      {project.image && (
        <div className="relative z-10">
          <div className="h-48 overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      {/* Card content (z-20) */}
      <div className="flex flex-col flex-grow relative z-20">
        <CardHeader className="p-4 pb-2">
          <h3 className="font-display text-xl leading-snug text-foreground">
            {project.title}
          </h3>
        </CardHeader>
        <CardContent className="px-4 py-2 flex-grow">
          <p className="mb-4 line-clamp-4 font-serif text-sm text-muted-foreground">
            {project.description}
          </p>
          <div className="flex flex-nowrap gap-2 overflow-hidden">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2 py-0.5 text-[11px] font-ui uppercase tracking-[0.16em] text-muted-foreground whitespace-nowrap border border-border"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 5 && (
              <span className="inline-flex items-center px-2 py-0.5 text-[11px] font-ui uppercase tracking-[0.16em] text-muted-foreground whitespace-nowrap border border-border">
                +{project.technologies.length - 5} more
              </span>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2 pt-2 px-4 items-start mt-auto">
          <Link 
            to={`/work/${project.slug}`} 
            className="relative inline-flex items-center gap-2 font-ui text-xs uppercase tracking-[0.22em] text-foreground transition-colors hover:text-primary"
          >
            <span>View details</span>
            <ArrowRight 
              className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" 
            />
          </Link>
          <div className="flex gap-2">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
              </Button>
            )}
            {project.liveUrl && (
              <Button size="sm" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1" onClick={handleLiveDemoClick}>
                  <ExternalLink size={16} />
                  <span>Visit</span>
                </a>
              </Button>
            )}
          </div>
        </CardFooter>
      </div>
      {/* Custom Banner */}
      {showBanner && (
        <div
          className={`fixed bottom-4 right-4 z-50 border border-border bg-card px-4 py-2 font-ui text-xs uppercase tracking-[0.22em] text-foreground shadow-sm transition-opacity duration-700 ${
            fadeBanner ? "opacity-0" : "opacity-100"
          }`}
        >
          You're already here!
        </div>
      )}
    </Card>
  );
};

export default ProjectCard;
