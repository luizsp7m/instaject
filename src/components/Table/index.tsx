import { Project, Technology } from "../../types";
import { TableItem } from "./TableItem";

interface Props {
  data: Array<Technology> | Array<Project>;
  type: "technology" | "project";
}

export function Table({ data, type }: Props) {
  return (
    <div className="border overflow-y-auto border-gray-800 rounded-md text-sm text-gray-400">
      {data.map(item => (
        <TableItem
          key={item.id}
          data={item}
          type={type}
        />
      ))}
    </div>
  );
}