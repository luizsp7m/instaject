import { Dispatch, SetStateAction, useState } from "react";
import { useTechnologies } from "../../hooks/useTechnologies";
import { Technology } from "../../types";

interface Props {
  chosenTechnologies: Array<string>;
  setChosenTechnologies: Dispatch<SetStateAction<string[]>>
  error: any;
}

export function TechnologiesInput({ chosenTechnologies, setChosenTechnologies, error }: Props) {
  const { technologies } = useTechnologies();

  const [selectIsOpen, setSelectIsOpen] = useState(false);

  function addToChosenTechnologies(technologyId: string) {
    const updateChosenTechnologies = [...chosenTechnologies];
    const exists = updateChosenTechnologies.includes(technologyId);

    if (exists) {
      const technologyIndex = updateChosenTechnologies.findIndex(item => item === technologyId);
      updateChosenTechnologies.splice(technologyIndex, 1);
      setChosenTechnologies(updateChosenTechnologies);
      return;
    }

    updateChosenTechnologies.push(technologyId);
    setChosenTechnologies(updateChosenTechnologies);
  }

  function alreadyInChosenTechnologies(technologyId: string) {
    const exists = chosenTechnologies.includes(technologyId);

    return exists ? true : false;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className={`text-sm ${error ? "text-red-300" : "text-gray-400"}`}>Tecnologias</label>

      <button
        type="button"
        className={`bg-gray-700 h-12 rounded text-sm focus:ring-gray-700 ${error ? "text-red-300" : "text-gray-400"}`}
        onClick={() => setSelectIsOpen(!selectIsOpen)}
      >
        {selectIsOpen ? "Fechar" : chosenTechnologies.length > 0 ? `${chosenTechnologies.length} tecnologia(s) selecionada(s)` : "Selecione uma ou mais tecnologias"}
      </button>

      {selectIsOpen && (
        <div className="flex flex-col bg-gray-700 text-sm rounded overflow-x-hidden overflow-y-auto max-h-44 scrollbar-thumb-gray-500 scrollbar-track-transparent scrollbar-thin">
          {technologies.length > 0 ? (
            technologies.map(technology => (
              <div
                onClick={() => addToChosenTechnologies(technology.id)}
                className={`flex items-center px-4 py-2 gap-4 hover:bg-sky-300 cursor-pointer transition-colors duration-100 ${alreadyInChosenTechnologies(technology.id) && "bg-sky-400"}`}
                key={technology.id}
              >
                <img
                  className="h-10 w-10 rounded object-cover"
                  src={technology.image}
                  alt={technology.name}
                />
  
                <span>{technology.name}</span>
              </div>
            ))
          ) : (
            <div className="px-4 py-4 text-center text-red-400">Nenhuma tecnologia cadastrada</div>
          )}
        </div>
      )}

      {error && <span className="text-sm text-red-300">Campo obrigatório</span>}
    </div>
  );
}