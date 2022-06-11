import { signOut } from "next-auth/react";

interface Props {
  username: string;
  image: string;
}

export function CurrentUser({ username, image }: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex flex-col items-end">
        <h5 className="font-medium">{username}</h5>

        <button
          type="button"
          onClick={() => signOut()}
          className="text-slate-400 text-sm hover:text-slate-300 transition-colors"
        >
          Sair
        </button>
      </div>

      <img
        src={image}
        alt="Avatar"
        className="w-10 h-10 rounded-lg"
      />
    </div>
  );
}