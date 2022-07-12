import { useRouter } from "next/router";
import { BiArrowBack } from "react-icons/bi";

export function BackButton() {
  const router = useRouter();

  return (
    <div className="flex">
      <button
        className="flex items-center gap-2 text-sm text-gray-400 hover:underline"
        onClick={() => router.back()}
      >
        <BiArrowBack />
        <span>Voltar</span>
      </button>
    </div>
  );
}