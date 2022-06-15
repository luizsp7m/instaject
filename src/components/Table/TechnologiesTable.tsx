import Link from "next/link";

import { Technology } from "../../types";

interface TechnologiesTableProps {
  technologies: Array<Technology>;
}

interface TechnologyItemProps {
  technology: Technology;
}

export function TechnologiesTable({ technologies }: TechnologiesTableProps) {
  if (technologies.length === 0) {
    return <p className="text-sm text-gray-400 text-center">Nenhuma tecnologia cadastrada</p>
  }

  return (
    <div className="relative overflow-x-auto">
      <div className="flex flex-col gap-4 w-[768px] sm:w-full">
        <div className="flex justify-between text-sm px-6 text-gray-400">
          <span>Pré-visualização</span>
          <span>Data da última modificação</span>
        </div>

        <div className="border overflow-y-auto border-gray-800 rounded-md text-sm text-gray-400">
          {technologies.map(technology => (
            <TechnologyItem
              key={technology.id}
              technology={technology}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function TechnologyItem({ technology }: TechnologyItemProps) {
  return (
    <Link href={`/technologies/${technology.id}`} passHref>
      <a className="flex items-center justify-between py-4 px-6 first:border-0 border-t border-gray-800 hover:bg-gray-800 transition-colors duration-100">
        <div className="flex items-center gap-4">
          <img
            className="h-10 w-10 object-cover rounded-full"
            src={technology.image}
            alt={technology.name}
          />

          <span>{technology.name}</span>
        </div>

        <time>{technology.last_update}</time>
      </a>
    </Link>
  );
}