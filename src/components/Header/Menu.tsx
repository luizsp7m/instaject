import { useSession } from "next-auth/react";
import Link from "next/link";

import { AiOutlinePlus, AiFillHeart, AiFillFolder } from "react-icons/ai";

export function Menu() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center items-center gap-6 text-gray-400 absolute inset-x-0 z-10">
      <Link href="/projects/create" passHref>
        <a className="h-10 w-10 flex justify-center items-center rounded-full hover:text-gray-200">
          <AiOutlinePlus size={18} />
        </a>
      </Link>

      <Link href={`/profile/${session?.user?.email}`} passHref>
        <a className="h-10 w-10 flex justify-center items-center rounded-full hover:text-gray-200">
          <AiFillFolder size={18} />
        </a>
      </Link>

      <Link href="/favorites" passHref>
        <a className="h-10 w-10 flex justify-center items-center rounded-full hover:text-gray-200">
          <AiFillHeart size={18} />
        </a>
      </Link>
    </div>
  );
}