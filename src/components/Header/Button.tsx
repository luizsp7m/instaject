import { HiMenuAlt1 } from "react-icons/hi";

interface Props {
  onToggleSidebar: () => void;
}

export function Button({ onToggleSidebar }: Props) {
  return (
    <button
      type="button"
      className="h-10 w-10 rounded flex items-center justify-center bg-sky-500 hover:bg-sky-400 focus:ring-sky-400 hover:bg-sky-400"
      onClick={onToggleSidebar}
    >
      <HiMenuAlt1
        size={24}
      />
    </button>
  );
}