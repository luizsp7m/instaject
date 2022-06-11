import { Loading } from "../Loading";

interface Props {
  isSubmitting: boolean;
}

export function SubmitButton({ isSubmitting }: Props) {
  return (
    <button
      disabled={isSubmitting}
      type="submit"
      className="w-full flex items-center justify-center bg-sky-500 rounded h-12 px-4 focus:outline-none hover:bg-sky-400 focus:ring-sky-400"
    >
      {isSubmitting ? <Loading /> : <span className="text-sm font-medium">Guardar</span>}
    </button>
  );
}