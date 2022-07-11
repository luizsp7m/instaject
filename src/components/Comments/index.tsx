import { Comment as CommentType } from "../../types";
import { Comment } from "./Comment";

interface Props {
  comments?: Array<CommentType>;
}

export function Comments({ comments }: Props) {
  return (
    <div className="h-[470px] overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin">
      {comments?.map(comment => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}