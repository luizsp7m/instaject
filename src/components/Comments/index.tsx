import { Comment as CommentType } from "../../types";
import { Comment } from "./Comment";

interface Props {
  comments?: Array<CommentType>;
  projectId: string;
}

export function Comments({ comments, projectId }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {comments?.map(comment => (
        <Comment key={comment.id} comment={comment} projectId={projectId} />
      ))}
    </div>
  );
}