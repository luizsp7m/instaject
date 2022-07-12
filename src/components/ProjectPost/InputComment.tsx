import { useSession } from "next-auth/react";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { AiOutlineSend } from "react-icons/ai";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../lib/firebase";

interface Props {
  projectId: string;
}

export function InputComment({ projectId }: Props) {
  const { data: session } = useSession();

  const [commentInput, setCommentInput] = useState<string>("");

  function handleCreateComment(event: FormEvent) {
    event.preventDefault();

    if (!session) return toast.warning("Usuário não autenticado");

    if (commentInput.trim() === "") return;

    const docRef = collection(database, "projects", `${projectId}`, "comments");

    addDoc(docRef, {
      comment: commentInput,
      user: session?.user,
      created_at: new Date().toISOString(),
    }).then(() => {
      setCommentInput("");
    }).catch(error => {
      toast.error("Houve um erro");
    });
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