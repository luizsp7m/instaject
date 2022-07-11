import Link from "next/link";
import ptBR from "date-fns/locale/pt-BR";

import { format } from "date-fns";
import { Comment } from "../../types"

interface Props {
  comment: Comment;
}

export function Comment({ comment }: Props) {
  const dateFormatted = format(new Date(comment.created_at), "d' de 'MMMM' - 'k'h'mm", {
    locale: ptBR,
  });

  return (
    <div className="flex gap-3">
      <img
        src={comment.user.image}
        alt=""
        className="h-8 w-8 object-cover rounded-full"
      />

      <div className="flex flex-col gap-1">
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
    </div>
  );
}