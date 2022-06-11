interface Props {
  onRemove: () => void;
  closeModal: () => void;
}

export function DeleteModal({ onRemove, closeModal }: Props) {
  return (
    <div className="fixed bg-modal top-0 bottom-0 left-0 right-0 flex justify-center items-start">
      <div className="bg-gray-700 rounded mt-8 p-4 flex flex-col items-center gap-2 text-sm">
        <h1 className="font-medium">O registro será deletado permanentemente</h1>
        <p className="font-normal">Você tem certeza que deseja remover esse registro?</p>

        <div className="flex w-full mt-2">
          <button type="button" onClick={closeModal} className="flex-1 p-2 bg-red-400 hover:bg-red-500 focus:ring-0">Não</button>
          <button type="button" onClick={onRemove} className=" flex-1 p-2 bg-sky-500 hover:bg-sky-400 focus:ring-0">Sim</button>
        </div>
      </div>
    </div>
  );
}