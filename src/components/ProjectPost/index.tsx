import { Project } from "../../types";
import { BackButton } from "../BackButton";
import { Comments } from "../Comments";
import { InputComment } from "./InputComment";
import { ProjectPublisher } from "./ProjectPublisher";

interface Props {
  project: Project;
}

export function ProjectPost({ project }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <BackButton destination="/" />

      <div className="h-[598px] bg-grayish-700 rounded-sm overflow-hidden grid grid-cols-[2fr_1fr]">
        <div className="">
          <img
            src={project.image}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col ga-3 relative">
          <ProjectPublisher user={project.user} />
          <Comments comments={project.comments} />
          <InputComment projectId={project.id} />
        </div>
      </div>
    </div>
  );
}