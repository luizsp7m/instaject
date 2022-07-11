import Link from "next/link";

import { AiFillSetting } from "react-icons/ai";

interface Props {
  id: string;
}

export function UpdateButton({ id }: Props) {
  return (
    <Link href={`/projects/update/${id}`} passHref>
      <a className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity hover:text-gray-400">
        <AiFillSetting size={18} />
      </a>
    </Link>
  );
}