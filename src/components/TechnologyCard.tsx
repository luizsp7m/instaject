import { Technology } from "../types";

interface Props {
  technology: Technology;
}

export function TechnologyCard({ technology }: Props) {
  return (
    <div className="flex flex-col gap-4 items-center bg-gray-800 rounded p-6">
      <img
        className="h-16 w-16 object-contain"
        src={technology.image}
        alt={technology.name}
      />

      <span className="text-sm font-medium">{technology.name}</span>
    </div>
  );
}