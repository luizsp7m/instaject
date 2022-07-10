import { AiOutlineHeart, AiFillHeart, AiOutlineComment, AiFillSetting } from "react-icons/ai";
import { useProjects } from "../../hooks/useProjects";

interface Props {
  projectId: string;
}

export function InteractionButtons({ projectId }: Props) {
  const { addProjectToFavorite } = useProjects();

  function handleAddProjectToFavorite() {
    addProjectToFavorite(projectId);
  }

  return (
    <div className="flex gap-4 text-gray-400 mb-1">
      <button
        type="button"
        className="flex items-center gap-2"
        onClick={handleAddProjectToFavorite}
      >
        <AiOutlineHeart size={20} />
        <span className="text-sm">6</span>
      </button>

      <button
        type="button"
        className="flex items-center gap-2"
      >
        <AiOutlineComment size={20} />
        <span className="text-sm">2</span>
      </button>
    </div>
  );
}