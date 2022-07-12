import Link from "next/link";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { CurrentUser } from "./CurrentUser";
import { Menu } from "./Menu";
import { SignInButton } from "./SignInButton";
import { AiOutlineMenu } from "react-icons/ai";

export function Header() {
  const { data: session } = useSession();

  const [menuToggle, setMenuToggle] = useState<boolean>(false);

  return (
    <header className="bg-grayish-900 border-b-[0.05rem] border-b-gray-800 fixed w-full z-10">
      <div className="flex items-center justify-between max-w-[1086px] w-full mx-auto h-[5rem] px-3 md:px-8 relative">
        <Link href={"/"} passHref>
          <a className="z-20">
            <h1 className="font-medium">Instaject</h1>
          </a>
        </Link>

        <Menu menuToggle={menuToggle} />

        <div className="flex items-center gap-4">
          {session ? (
            <CurrentUser
              username={session.user?.name || ""}
              image={session.user?.image || ""}
            />
          ) : <SignInButton />}

          <button
            type="button"
            onClick={() => setMenuToggle(!menuToggle)}
            className="md:hidden"
          >
            <AiOutlineMenu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}