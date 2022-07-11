import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useProjects } from "../../hooks/useProjects";
import { AiOutlineSend } from "react-icons/ai";

interface Props {
  projectId: string;
}

export function InputComment({ projectId }: Props) {
  const { data: session } = useSession();

  const { createComment } = useProjects();

  const [commentInput, setCommentInput] = useState<string>("");

  function handleCreateComment(event: FormEvent) {
    event.preventDefault();

    if (!session) return toast.error("Usuário não autenticado");

    if (commentInput.trim() === "") return;

    createComment(projectId, commentInput);

    setCommentInput("");
  }

  return (
    <form onSubmit={handleCreateComment} className="flex">
      <input
        type="text"
        className="h-12 flex-1 outline-none bg-gray-600 px-3 text-md text-gray-300"
        value={commentInput}
        onChange={({ target }) => setCommentInput(target.value)}
      />

      <button
        type="submit"
        className="h-12 w-12 flex items-center justify-center bg-sky-500 hover:bg-sky-400"
      >
        <AiOutlineSend size={20} />
      </button>
    </form>
  );
}