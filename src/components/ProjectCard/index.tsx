import Link from "next/link";

import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { HiArrowRight } from "react-icons/hi";
import { Project } from "../../types";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  return (
    <div className="bg-grayish-700 rounded">
      <div className="flex gap-4 items-center p-3">
        <img
          src={project.user.image}
          alt=""
          className="h-12 w-12 rounded-full"
        />

        <div className="flex flex-col gap-0">
          <h1 className="text-[0.925rem] font-medium">{project.user.name}</h1>
          <span className="text-[0.85rem] text-gray-400">{project.user.email}</span>
        </div>
      </div>

      <img
        src={project.image}
        alt=""
        className="w-full h-[186px]"
      />

      <div className="flex flex-col items-start gap-3 p-3">
        <div className="flex gap-4 text-gray-400 mb-1">
          <button
            type="button"
            className="flex items-center gap-2"
          >
            <AiOutlineHeart size={20} />
            <span className="text-sm">6</span>
          </button>

          <button
            type="button"
            className="flex items-center gap-2"
          >
            <AiOutlineComment size={20} />
            <span className="text-sm">2</span>
          </button>
        </div>

        <h1 className="text-md font-bold tracking-wide">
          {project.name}
        </h1>

        <p className="text-[0.90rem] text-gray-400 leading-6 font-medium">
          {project.description}
        </p>

        <Link href={project.repository} passHref>
          <a target="_blank" className="flex gap-2 items-center text-sm text-sky-500 mb-2 hover:text-sky-400">
            <span>Ver Repositório</span>
            <HiArrowRight />
          </a>
        </Link>
      </div>
    </div>
  );
}