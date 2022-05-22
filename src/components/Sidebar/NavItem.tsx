import { FaElementor, FaHotjar, FaLyft } from "react-icons/fa";

import Link from "next/link";

interface Props {
  name: string;
  page: string;
}

export function NavItem({ name, page }: Props) {
  return (
    <Link href={page}>
      <a className="flex items-center gap-4">
        <FaElementor size={18} />
        <span className="text-sm text-slate-200">{name}</span>
      </a>
    </Link>
  );
}