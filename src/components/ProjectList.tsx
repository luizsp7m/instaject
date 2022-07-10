import { Project } from "../types";
import { ProjectCard } from "./ProjectCard";

interface Props {
  projects: Array<Project>;
}

export function ProjectList({ projects }: Props) {
  return (
    <div className="grid grid-cols-feed-layout gap-4">
      {projects.map(project => (
        <ProjectCard
          key={project.id}
          project={project}
        />
      ))}
    </div>
  );
}