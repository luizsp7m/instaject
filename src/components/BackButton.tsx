import { BiArrowBack } from "react-icons/bi";

import Link from "next/link";

interface Props {
  destination: string;
}

export function BackButton({ }: Props) {
  return (
    <div className="flex">
      <Link href={"/technologies"} passHref>
        <a href="" className="flex items-center gap-2 text-sm text-gray-400 hover:underline">
          <BiArrowBack />
          <span>Voltar</span>
        </a>
      </Link>
    </div>
  );
}