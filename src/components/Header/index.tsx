import { useSession } from "next-auth/react";
import { CurrentUser } from "./CurrentUser";
import { Menu } from "./Menu";
import { SignInButton } from "./SignInButton";

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="bg-grayish-900 border-b-[0.05rem] border-b-gray-800 fixed w-full z-10">
      <div className="flex items-center justify-between max-w-[1086px] w-full mx-auto h-[5rem] px-8 relative">
        <h1 className="font-medium">Instaject</h1>

        <Menu />

        {session ? (
          <CurrentUser
            username={session.user?.name || ""}
            image={session.user?.image || ""}
          />
        ) : <SignInButton />}
      </div>
    </header>
  );
}