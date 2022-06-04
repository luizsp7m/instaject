import { Button } from "./Button";
import { CurrentUser } from "./CurrentUser";
import { useSession } from "next-auth/react";

interface Props {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: Props) {
  const { data: session } = useSession();

  return (
    <header className="h-16 bg-gray-900 flex items-center justify-between px-4 border-b-[0.05rem] border-b-gray-800">
      <Button onToggleSidebar={onToggleSidebar} />

      {session && (
        <CurrentUser
          username={session.user?.name || ""}
          image={session.user?.image || ""}
        />
      )}
    </header>
  );
}