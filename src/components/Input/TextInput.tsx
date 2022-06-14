import { forwardRef, ForwardRefRenderFunction } from "react";
import { FieldError } from "react-hook-form";

interface Props {
  title: string;
  error: FieldError | undefined;
}

const TextInputBase: ForwardRefRenderFunction<HTMLInputElement, Props> = (
  { title, error, ...rest }, ref
) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <label className={`text-sm ${error ? "text-red-300" : "text-gray-400"}`}>{title}</label>

      <input
        ref={ref}
        {...rest}
        className={`h-12 rounded bg-gray-700 px-4 text-sm text-gray-200 focus:outline-none ${error && "ring-2 ring-red-400"}`}
      />

      {error && <span className="text-sm text-red-300">{error.message}</span>}
    </div>
  );
}

export const TextInput = forwardRef(TextInputBase);