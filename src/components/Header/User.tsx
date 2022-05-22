import { useSession, signIn, signOut } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";

export function User() {
  const { data: session } = useSession();

  if (!session) {
    return <button
      className="px-4 py-2 rounded bg-sky-500 hover:bg-sky-400 transition-colors flex items-center gap-2"
      onClick={() => signIn()}>
      <AiFillGithub size={22} />
      Login
    </button>
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <h5 className="font-medium">{session.user?.name || session.user?.email}</h5>
        <button
          onClick={() => signOut()}
          className="text-slate-400 text-sm hover:text-slate-300 transition-colors"
        >Sair</button>
      </div>

      <img
        src={session.user?.image || ""}
        alt="Avatar"
        className="w-10 h-10 rounded-lg"
      />
    </div>
  );
}