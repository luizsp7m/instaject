import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { toast } from "react-toastify";
import { useProjects } from "../../hooks/useProjects";
import { Comment, Favorite } from "../../types";

interface Props {
  projectId: string;
  favorites?: Array<Favorite>;
  comments?: Array<Comment>;
}

export function InteractionButtons({ projectId, favorites, comments }: Props) {
  const { addProjectToFavorites, removeProjectFromFavorites } = useProjects();

  const { data: session } = useSession();

  function handleAddProjectToFavorite() {
    if (!session) return toast.error("Usuário não autenticado");

    addProjectToFavorites(projectId);
  }

  function handleRemoveProjectFromFavorite() {
    if (!session) return toast.error("Usuário não autenticado");

    const favorite = favorites?.find(favorite => favorite.user.email === session?.user?.email) as Favorite;
    removeProjectFromFavorites(projectId, favorite.id);
  }

  function userIsInFavorites() {
    const exists = favorites?.find(favorite => favorite.user.email === session?.user?.email);

    return exists ? true : false;
  }

  return (
    <div className="flex gap-4 text-gray-400 mb-1">
      <button
        type="button"
        className="flex items-center gap-2"
        onClick={userIsInFavorites() ? handleRemoveProjectFromFavorite : handleAddProjectToFavorite}
      >
        {userIsInFavorites() ? <AiFillHeart size={20} className="text-red-500" /> : <AiOutlineHeart size={20} />}
        <span className="text-sm">{favorites?.length}</span>
      </button>

      <button
        type="button"
        className="flex items-center gap-2"
      >
        <AiOutlineComment size={20} />
        <span className="text-sm">{comments?.length}</span>
      </button>
    </div>
  );
}