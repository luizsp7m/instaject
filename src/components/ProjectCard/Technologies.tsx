import { useEffect, useState } from "react";
import { useTechnologies } from "../../hooks/useTechnologies";
import { Technology } from "../../types";

const MAX = 3;

interface Props {
  technologiesInProject: Array<string>;
}

export function Technologies({ technologiesInProject }: Props) {
  const { technologies, technologiesIsLoading } = useTechnologies();

  const [technologiesProject, setTechnologiesProject] = useState<Technology[]>([]);

  useEffect(() => {
    if (!technologiesIsLoading) {
      let arrayTechnologies: Array<Technology> = [];

      technologies.forEach(technology => {
        if (technologiesInProject.includes(technology.id)) {
          arrayTechnologies.push(technology);
        }
      });

      setTechnologiesProject(arrayTechnologies);
    }
  }, [technologiesIsLoading]);

  return (
    <div className="flex gap-2">
      {technologiesProject.map((technology, index) => index < MAX && (
        <div
          className="text-[12px] font-medium text-gray-200 bg-gray-700 rounded px-2 py-1"
          key={technology.id}>
          {technology.name}
        </div>
      ))}

      {technologiesProject.length > MAX && (
        <div className="relative text-[12px] font-medium text-gray bg-gray-700 px-2 py-1 rounded group-two">
          <span>+ {technologiesProject.length - MAX}</span>

          <div className="absolute flex flex-col gap-2 bottom-8 right-0 bg-gray-700 rounded px-3 py-3 invisible group-two-hover:visible">
            {technologiesProject.map((technology, index) => index >= MAX && (
              <span key={technology.id}>{technology.name}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}