interface Props {
  onRemove: () => void;
  closeModal: () => void;
}

export function DeleteModal({ onRemove, closeModal }: Props) {
  return (
    <div className="z-10 fixed bg-[rgba(0,0,0,0.50)] top-0 bottom-0 left-0 right-0 flex justify-center items-start">
      <div className="max-w-sm w-full bg-gray-700 rounded mt-8 p-8 flex flex-col items-center gap-4 text-sm animate-fadeIn">
        <h1 className="font-medium">Remover registro?</h1>
        <p className="font-normal text-center">Você realmente quer apagar esse registro? Essa ação não poderá ser desfeita</p>

        <div className="flex w-full gap-2 px-5 mt-2">
          <button type="button" onClick={closeModal} className="p-2 bg-gray-600 hover:bg-gray-500 focus:ring-0 focus:ring-offset-0 rounded flex-1">Cancelar</button>
          <button type="button" onClick={onRemove} className=" p-2 bg-red-400 hover:bg-red-300 focus:ring-0 focus:ring-offset-0 rounded flex-1">Apagar</button>
        </div>
      </div>
    </div>
  );
}