import Link from "next/link";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { AiOutlinePlus, AiFillHeart, AiFillFolder } from "react-icons/ai";

interface Props {
  menuToggle: boolean;
}

export function Menu({ menuToggle }: Props) {
  const { data: session } = useSession();

  const { pathname } = useRouter()

  return (
    <div className={`absolute bg-grayish-900 text-slate-400 right-0 top-[81px] h-[calc(100vh-81px)] w-full flex flex-col items-center justify-center gap-14 transition-transform duration-300 ${menuToggle ? "translate-x-0" : "translate-x-full"} md:flex-row md:gap-12 md:inset-x-0 md:top-0 md:h-[80px] md:translate-x-0 md:transition-none`}>
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