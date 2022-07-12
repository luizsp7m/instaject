import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { toast } from "react-toastify";
import { database } from "../../lib/firebase";
import { Comment, Favorite } from "../../types";

interface Props {
  projectId: string;
  favorites: Array<Favorite>;
  comments: Array<Comment>;
}

export function InteractionButtons({ projectId, favorites, comments }: Props) {
  const { data: session } = useSession();

  const exists = favorites.find(favorite => favorite.user.email === session?.user?.email);

  function handleAddProjectToFavorite() {
    if (!session) return toast.warning("Usuário não autenticado");

    const docRef = collection(database, "projects", `${projectId}`, "favorites");
    addDoc(docRef, {
      user: session?.user,
      created_at: new Date().toISOString(),
    });
  }

  function handleRemoveProjectFromFavorite() {
    if (!session) return toast.warning("Usuário não autenticado");

    const docRef = doc(database, "projects", `${projectId}`, "favorites", `${exists?.id}`);
    deleteDoc(docRef).catch(error => {
      toast.error("Houve um erro");
    });;
  }

  return (
    <div className="flex gap-4 text-gray-400 mb-1">
      <button
        type="button"
        className="flex items-center gap-2"
        onClick={exists ? handleRemoveProjectFromFavorite : handleAddProjectToFavorite}
      >
        {exists ? <AiFillHeart size={20} className="text-red-500" /> : <AiOutlineHeart size={20} />}
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