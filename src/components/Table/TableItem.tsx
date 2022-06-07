import Link from "next/link";

import { Technology } from "../../types";
import { useTechnologies } from "../../hooks/useTechnologies";

interface Props {
  data: Technology;
}

export function TableItem({ data }: Props) {
  const { addTechnologyToList } = useTechnologies();

  return (

    <div className="flex items-center border-b border-gray-800 hover:bg-gray-800 hover:cursor-pointer transition-colors duration-100">
      <div className="flex items-center justify-center w-16">
        <input
          type="checkbox"
          onClick={() => addTechnologyToList(data)}
        />
      </div>

      <Link href={`/technologies/${data.id}`} passHref>
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