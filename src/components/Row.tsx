import { AiOutlinePlus } from "react-icons/ai";

export function Row() {
  return (
    <div className="flex justify-between items-center">
      <h1 className="font-medium">Projetos</h1>

      <div className="flex items-center gap-6">
        <span className="text-sm text-slate-400">12 registros</span>
        <button className="bg-sky-500 rounded h-12 px-4 flex items-center justify-center gap-2 focus:outline-none hover:bg-sky-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-400 hover:bg-sky-400">
          <AiOutlinePlus size={18} />
          <span className="text-sm font-medium">Adicionar</span>
        </button>
      </div>
    </div>
  );
}