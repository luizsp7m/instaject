import { useSession } from "next-auth/react";
import { Project } from "../../types";
import { ProjectBody } from "./ProjectBody";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectImage } from "./ProjectImage";
import { UpdateButton } from "./UpdateButton";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const { data: session } = useSession();

  return (
    <div className="bg-grayish-700 rounded relative group">
      <ProjectHeader
        image={project.user.image}
        username={project.user.name}
        email={project.user.email}
      />

      <ProjectImage
        image={project.image}
      />

      <ProjectBody
        id={project.id}
        name={project.name}
        description={project.description}
        repository={project.repository}
      />

      {session?.user?.email === project.user.email && (
        <UpdateButton
          id={project.id}
        />
      )}
    </div>
  );
}