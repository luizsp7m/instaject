import Link from "next/link";

import { Project, Technology } from "../../types";
import { useTechnologies } from "../../hooks/useTechnologies";
import { useProjects } from "../../hooks/useProjects";

interface Props {
  data: Technology | Project;
  type: "technology" | "project";
}

export function TableItem({ data, type }: Props) {
  const { addTechnologyToList } = useTechnologies();
  const { addProjectToList } = useProjects();

  return (
    <div className="flex items-center border-b border-gray-800 hover:bg-gray-800 hover:cursor-pointer transition-colors duration-100">
      <div className="flex items-center justify-center w-16">
        <input
          type="checkbox"
          onClick={() => type === "technology" ? addTechnologyToList(data as Technology) : addProjectToList(data as Project)}
        />
      </div>

      <Link href={`/${type === "technology" ? "technologies" : "projects"}/${data.id}`} passHref>
        <a className="flex w-full items-center gap-6 border-l border-gray-800 py-3 px-6">
          <img
            className="h-10 w-10 object-cover rounded-full"
            src={data.imageUrl}
            alt=""
          />

          <span className="flex-1">{data.name}</span>

          <time>{data.created_at}</time>
        </a>
      </Link>
    </div>
  );
}