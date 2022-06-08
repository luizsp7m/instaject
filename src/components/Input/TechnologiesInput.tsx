import { Dispatch, SetStateAction, useState } from "react";
import { FieldError } from "react-hook-form";
import { useTechnologies } from "../../hooks/useTechnologies";
import { Technology } from "../../types";

interface Props {
  chosenList: Array<Technology>;
  setChosenList: Dispatch<SetStateAction<Technology[]>>;
  error: any;
}

export function TechnologiesInput({ chosenList, setChosenList, error }: Props) {
  const { technologies } = useTechnologies();

  const [selectIsOpen, setSelectIsOpen] = useState(false);

  function addToChosenList(technology: Technology) {
    const updateChosenList = [...chosenList];
    const exists = updateChosenList.find(item => item.id === technology.id);

    if (exists) {
      const technologyIndex = updateChosenList.findIndex(item => item.id === technology.id);
      updateChosenList.splice(technologyIndex, 1);
      setChosenList(updateChosenList);
      return;
    }

    updateChosenList.push(technology);
    setChosenList(updateChosenList);
  }

  function alreadyInList(technologyId: string) {
    const exists = chosenList.find(item => item.id === technologyId);

    return exists ? true : false;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className={`text-sm ${error ? "text-red-300" : "text-gray-400"}`}>Tecnologias</label>

      <button
        type="button"
        onClick={() => setSelectIsOpen(!selectIsOpen)}
        className="h-12 rounded bg-gray-700 px-4 text-sm text-gray-200 focus:outline-none"
      >
        { selectIsOpen ? "Fechar" : chosenList.length > 0 ? `${chosenList.length} tecnologia(s) selecionada(s)` : "Selecione uma ou mais tecnologias" }
      </button>

      {selectIsOpen && (
        <div className="flex flex-col bg-gray-700 rounded overflow-auto max-h-36">
          {technologies.map(technology => (
            <div key={technology.id} onClick={() => addToChosenList(technology)} className={`flex items-center gap-2 p-2 hover:bg-sky-400 cursor-pointer ${alreadyInList(technology.id) && "bg-sky-500"}`}>
              <img
                src={technology.imageUrl}
                alt={technology.imageUrl}
                className="h-8 w-8 rounded object-cover"
              />

              <span className="text-sm text-gray-300">{technology.name}</span>
            </div>
          ))}
        </div>
      )}

      {error && <span className="text-sm text-red-300">Campo obrigatório</span>}
    </div>
  );
}