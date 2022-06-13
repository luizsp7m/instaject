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
        className="flex justify-center items-center gap-2 text-sm text-red-400 hover:text-red-300 focus:ring-0 focus:ring-offset-0"
      >
        <BiTrash size={20} />
        <span>Excluir registro</span>
      </button>

      {isOpen && <DeleteModal 
        onRemove={onRemove}
        closeModal={closeModal}
      />}
    </>
  );
}