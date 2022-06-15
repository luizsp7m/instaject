import Link from "next/link";

import { Project } from "../../types";

interface ProjectsTableProps {
  projects: Array<Project>;
}

interface ProjectItemProps {
  project: Project;
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  if (projects.length === 0) {
    return <p className="text-sm text-gray-400 text-center">Nenhum projeto cadastrado</p>
  }

  return (
    <div className="relative overflow-x-auto">
      <div className="flex flex-col gap-4 w-[768px] sm:w-full">
        <div className="flex justify-between text-sm px-6 text-gray-400">
          <span>Pré-visualização</span>
          <span>Data da última modificação</span>
        </div>

        <div className="border overflow-y-auto border-gray-800 rounded-md text-sm text-gray-400">
          {projects.map(project => (
            <ProjectItem
              key={project.id}
              project={project}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectItem({ project }: ProjectItemProps) {
  return (
    <Link href={`/projects/${project.id}`} passHref>
      <a className="flex items-center justify-between py-4 px-6 first:border-0 border-t border-gray-800 hover:bg-gray-800 transition-colors duration-100">
        <div className="flex items-center gap-4">
          <img
            className="h-10 w-10 object-cover rounded-full"
            src={project.image}
            alt={project.name}
          />

          <span>{project.name}</span>
        </div>

        <time>{project.last_update}</time>
      </a>
    </Link>
  );
}