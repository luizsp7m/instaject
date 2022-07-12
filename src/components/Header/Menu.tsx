import Link from "next/link";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlinePlus, AiFillHeart, AiFillFolder } from "react-icons/ai";

export function Menu() {
  const { data: session } = useSession();

  const { pathname } = useRouter()

  return (
    <div className="flex justify-center items-center gap-12 text-slate-400 absolute inset-x-0 z-10">
      <Link href="/projects/create" passHref>
        <a className={`flex flex-col gap-2 justify-center items-center rounded-full hover:text-gray-200 font-medium transition-colors ${pathname.includes("create") && "&& text-gray-200"}`}>
          <AiOutlinePlus size={18} />
          <span className="text-xs">Publicar</span>
        </a>
      </Link>

      <Link href={`/profile/${session?.user?.email}`} passHref>
        <a className={`flex flex-col gap-2 justify-center items-center rounded-full hover:text-gray-200 font-medium transition-colors ${pathname.includes("profile") && "&& text-gray-200"}`}>
          <AiFillFolder size={18} />
          <span className="text-xs">Perfil</span>
        </a>
      </Link>

      <Link href="/favorites" passHref>
        <a className={`flex flex-col gap-2 justify-center items-center rounded-full hover:text-gray-200 font-medium transition-colors ${pathname.includes("favorites") && "&& text-gray-200"}`}>
          <AiFillHeart size={18} />
          <span className="text-xs">Favoritos</span>
        </a>
      </Link>
    </div>
  );
}