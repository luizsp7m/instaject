import { Nav } from "./Nav";

interface Props {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: Props) {
  return (
    <aside className={`h-screen w-[350px] p-4 bg-gray-800 absolute transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-[-350px]"}`}>
      <Nav />
    </aside>
  );
}