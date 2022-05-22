import { ToggleSidebar } from "./ToggleSidebar";
import { User } from "./User";

interface Props {
  onToggleSidebar: () => void;
}

export function Header({ onToggleSidebar }: Props) {
  return (
    <header className="h-16 bg-gray-900 flex items-center justify-between px-4 border-b-[0.05rem] border-b-gray-800">
      <ToggleSidebar onToggleSidebar={onToggleSidebar} />

      <div>
        <User />
      </div>
    </header>
  );
}