import { Nav } from "./Nav";

interface Props {
  isOpen: boolean;
}

export function Sidebar({ isOpen }: Props) {
  return (
    <aside className={`absolute w-full bottom-0 bg-gray-800 transition-transform duration-300 md:h-screen md:w-[350px] md:py-16 ${isOpen ? "md:translate-x-0" : "md:translate-x-[-350px]"}`}>
      <Nav />
    </aside>
  );
}