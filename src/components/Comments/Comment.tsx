import Link from "next/link";
import ptBR from "date-fns/locale/pt-BR";

import { format, formatDistance } from "date-fns";
import { Comment } from "../../types"
import { deleteDoc, doc } from "firebase/firestore";
import { database } from "../../lib/firebase";
import { toast } from "react-toastify";
import { BiTrash } from "react-icons/bi";
import { useSession } from "next-auth/react";

interface Props {
  comment: Comment;
  projectId: string;
}

export function Comment({ comment, projectId }: Props) {
  const { data: session } = useSession();

  // const dateFormatted = format(new Date(comment.created_at), "d' de 'MMMM' - 'k'h'mm", {
  //   locale: ptBR,
  // });

  const dateFormatted = formatDistance(new Date(comment.created_at), new Date(), {
    addSuffix: true,
    locale: ptBR,
  });

  function handleDeleteComment() {
    const docRef = doc(database, "projects", `${projectId}`, "comments", `${comment.id}`);
    deleteDoc(docRef).catch(error => {
      toast.error("Houve um erro");
    });
  }

  return (
    <div className="flex gap-3 items-start group">
      <img
        src={comment.user.image}
        alt=""
        className="h-8 w-8 object-cover rounded-full"
      />

      <div className="flex flex-col gap-1 flex-1">
        <Link href={`/profile/${comment.user.email}`} passHref>
          <a className="text-sm font-medium text-gray-400 hover:underline">
            {comment.user.name}
          </a>
        </Link>

        <p className="text-sm text-gray-300">
          {comment.comment}
        </p>

        <time className="text-[12px] text-gray-300">
          {dateFormatted}
        </time>
      </div>

      {session?.user?.email === comment.user.email && (
        <button
          type="button"
          className="opacity-0 group-hover:opacity-100"
          onClick={handleDeleteComment}
        >
          <BiTrash
            className="text-red-500 hover:text-red-400"
            size={16}
          />
        </button>
      )}
    </div>
  );
}