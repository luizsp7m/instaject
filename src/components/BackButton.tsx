import Link from "next/link";

import { BiArrowBack } from "react-icons/bi";

interface Props {
  destination: string;
}

export function BackButton({ destination }: Props) {
  return (
    <div className="flex">
      <Link href={destination} passHref>
        <a href="" className="flex items-center gap-2 text-sm text-gray-400 hover:underline">
          <BiArrowBack />
          <span>Voltar</span>
        </a>
      </Link>
    </div>
  );
}