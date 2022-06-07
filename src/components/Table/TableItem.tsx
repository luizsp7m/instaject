import { Technology } from "../../types";

import Link from "next/link";

interface Props {
  data: Technology;
}

export function TableItem({ data }: Props) {
  return (
    <Link href={`/technologies/${data.id}`} passHref>
      <a>
        <div className="flex items-center gap-8 px-6 py-3 border-b border-gray-800 hover:bg-gray-800 hover:cursor-pointer transition-colors duration-100">
          <input
            type="checkbox"
          />

          <img
            className="h-10 w-10 object-cover rounded-full"
            src={data.imageUrl}
            alt=""
          />

          <span className="flex-1">{data.name}</span>

          <time>{data.created_at}</time>
        </div>
      </a>
    </Link>
  );
}