import { Technology } from "../../types";
import { TableItem } from "./TableItem";

interface Props {
  data: Array<Technology>;
}

export function Table({ data }: Props) {
  return (
    <div className="overflow-x-auto border border-gray-800 rounded-md text-sm text-gray-400">
      {data.map(item => (
        <TableItem
          key={item.id}
          data={item}
        />
      ))}
    </div>
  );
}