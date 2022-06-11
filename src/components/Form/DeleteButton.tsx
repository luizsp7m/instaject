import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { DeleteModal } from "../Modal/DeleteModal";

interface Props {
  onRemove: () => void;
}

export function DeleteButton({ onRemove }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-12 flex justify-center items-center gap-2 text-sm text-red-400 border rounded border-red-400 hover:bg-red-400 hover:text-white focus:ring-red-400"
      >
        <BiTrash size={20} />
        <span>Excluir</span>
      </button>

      {isOpen && <DeleteModal 
        onRemove={onRemove}
        closeModal={closeModal}
      />}
    </>
  );
}