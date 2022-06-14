import Link from "next/link";

import { AiOutlinePlus } from "react-icons/ai";

interface Props {
  title: string;
  amount: number;
  destination: string;
}

export function PageHeader({ title, amount, destination }: Props) {
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-medium">{title}</h1>

      <div className="flex items-center gap-6">
        <span className="hidden md:block text-sm text-slate-400">{amount} registro(s)</span>

        <Link href={destination} passHref>
          <a>
            <button type="button" className="bg-sky-500 rounded h-12 px-4 flex items-center justify-center gap-2 hover:bg-sky-400 focus:ring-sky-400">
              <AiOutlinePlus size={18} />
              <span className="text-sm font-medium">Adicionar</span>
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
}