import Link from "next/link";

import { FiExternalLink } from "react-icons/fi";
import { BiRightArrowAlt } from "react-icons/bi";
import { Technologies } from "./Technologies";
import { Project } from "../../types";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  return (
    <div className="w-full bg-gray-800 rounded overflow-hidden relative cursor-pointer group-one">
      <img
        className="w-full h-[225px] object-cover group-scoped-hover:opacity-60 transition-opacity"
        src={project.image}
        alt={project.name}
      />

      <Link href={project.deploy}>
        <a target={"_blank"} className="absolute h-12 w-12 bg-sky-500 rounded-full flex items-center justify-center top-2 left-2 opacity-0 group-one-hover:opacity-100 transition-opacity hover:bg-sky-400 transition-colors">
          <FiExternalLink />
        </a>
      </Link>

      <div className="p-5 flex flex-col gap-4">
        <h5 className="font-bold text-[1.025rem]">{project.name}</h5>
        <p className="min-h-[66px] text-[0.915rem] font-medium text-gray-400">{project.description}</p>

        <Link href={project.repository} passHref>
          <a target={"_blank"} className="text-sm text-sky-400 flex items-center gap-1 hover:text-sky-300 transition-colors">
            <span>Ver repositório</span>
            <BiRightArrowAlt size={16} />
          </a>
        </Link>

        <Technologies technologiesInProject={project.technologies} />
      </div>
    </div>
  );
}