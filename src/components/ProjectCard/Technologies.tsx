import { useEffect, useState } from "react";
import { useTechnologies } from "../../hooks/useTechnologies";
import { Technology } from "../../types";

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
      {technologiesProject.map(technology => (
        <div
          className="text-sm text-gray-200 bg-gray-700 rounded px-2 py-1"
          key={technology.id}>
          {technology.name}
        </div>
      ))}
    </div>
  );
}