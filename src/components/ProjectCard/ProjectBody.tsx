import Link from "next/link";

import { HiArrowRight } from "react-icons/hi";
import { Comment, Favorite } from "../../types";
import { InteractionButtons } from "./InteractionButtons";

interface Props {
  id: string;
  name: string;
  description: string;
  repository: string;
  favorites?: Array<Favorite>;
  comments?: Array<Comment>;
}

export function ProjectBody({ id, name, description, repository, favorites, comments }: Props) {
  return (
    <div className="flex flex-col items-start gap-3 p-3">
      <InteractionButtons
        projectId={id}
        favorites={favorites}
        comments={comments}
      />

      <h1 className="text-md font-bold tracking-wide">
        {name}
      </h1>

      <p className="text-[0.90rem] text-gray-400 leading-6 font-medium h-[72px]">
        {description}
      </p>

      <Link href={repository} passHref>
        <a target="_blank" className="flex gap-2 items-center text-sm text-sky-500 mb-2 hover:text-sky-400">
          <span>Ver Repositório</span>
          <HiArrowRight />
        </a>
      </Link>
    </div>
  );
}