import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface Props {
  name: string;
  page: string;
  children: ReactNode;
}

export function NavItem({ name, page, children }: Props) {
  const router = useRouter();

  return (
    <Link href={page}>
      <a className={`h-16 flex items-center gap-4 px-4 hover:bg-sky-500 transition-colors ${router.asPath.startsWith(page) && "bg-sky-500"}`}>
        { children }
        <span className="text-sm">{name}</span>
      </a>
    </Link>
  );
}