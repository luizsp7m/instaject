import Link from "next/link";

import { BiTrashAlt, BiLinkAlt, BiErrorCircle } from "react-icons/bi";
import { Loading } from "./Loading";

interface Props {
  image: string;
  name: string;
  size: string;
  isUploadingImage: boolean;
  onDeleteImage: () => void;
  imageUrl: string;
}

export function ImageLoaded({
  image,
  name,
  size,
  isUploadingImage,
  onDeleteImage,
  imageUrl,
}: Props) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-4 items-start">
        <img
          className="w-14 h-14 object-cover rounded"
          src={image}
          alt="Imagem carregada"
        />

        <div className="flex flex-col gap-1 flex-1">
          <span className="text-sm font-medium">{name}</span>
          <span className="text-sm text-gray-400">{size}</span>
        </div>

        {isUploadingImage ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-2 items-end">
            <button onClick={onDeleteImage} className="flex items-center gap-2 text-red-400 text-sm hover:text-red-300 transition-colors duration-200">
              <BiTrashAlt size={18} />
              <span>Excluir</span>
            </button>

            {!isUploadingImage && !imageUrl && (
              <div className="flex gap-2 items-center text-sm text-red-300">
                <BiErrorCircle size={20} />
                <span>Houve um erro</span>
              </div>
            )}
          </div>
        )}
      </div>

      {!isUploadingImage && imageUrl && (
        <div className="h-12 flex overflow-hidden rounded">
          <input
            className="flex-1 bg-gray-700 px-4 text-sm text-gray-300"
            value={imageUrl}
            disabled
          />

          <Link href={imageUrl} passHref>
            <a target="_blank" className="w-12 bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors duration-200">
              <BiLinkAlt size={20} />
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}
