import fileSize from "filesize";

import { Dispatch, SetStateAction, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ImageLoaded } from "../ImageLoaded";
import { AxiosRequestConfig } from "axios";
import { api } from "../../lib/api";
import { FieldError } from "react-hook-form";
import { ImageLocal } from "../../types";
import { BiRefresh } from "react-icons/bi";

interface Props {
  title: string;
  error: FieldError | undefined;
  setImageLocal: Dispatch<SetStateAction<ImageLocal | null>>;
  imageLocal: ImageLocal | null;
  setImageUrl: Dispatch<SetStateAction<string>>;
  imageUrl: string;
  mode: "create" | "update";
}

export function FileInput({
  title,
  error,
  setImageLocal,
  imageLocal,
  setImageUrl,
  imageUrl,
  mode,
}: Props) {
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const onDrop = useCallback(async (uploadImage) => {
    setImageLocal({
      image: URL.createObjectURL(uploadImage[0]),
      name: uploadImage[0].name,
      size: fileSize(uploadImage[0].size),
    });

    setIsUploadingImage(true);

    const formData = new FormData();
    formData.append("image", uploadImage[0]);
    formData.append("key", process.env.NEXT_PUBLIC_IMGBB_KEY as string);

    const config = {
      headers: { "content-type": "multipart/form-data" },
    } as AxiosRequestConfig;

    try {
      const respose = await api.post("https://api.imgbb.com/1/upload", formData, config);
      setImageUrl(respose.data.data.url);
    } catch (error) {
      setImageUrl("");
    } finally {
      setIsUploadingImage(false);
    }
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/*": [],
    },
  });

  function onDeleteImage() {
    setImageLocal(null);
    setImageUrl("");
  }

  if (mode === "update" && imageUrl && !imageLocal) {
    return (
      <div className="flex gap-2 items-center">
        <img
          className="w-14 h-14 object-cover rounded"
          src={imageUrl}
          alt="Imagem carregada"
        />

        <button type="button" onClick={onDeleteImage} className="flex items-center gap-1 text-slate-400 text-sm hover:text-slate-300 transition-colors duration-200">
          <BiRefresh size={18} />
          <span>Substituir</span>
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <label className={`text-sm ${error ? "text-red-300" : "text-gray-400"}`}>{title}</label>
      {!imageLocal && (
        <div {...getRootProps()} className={`flex w-full flex-col items-center p-10 border-2 rounded border-dashed border-gray-700 text-gray-400 text-center ${isDragReject && "border-red-300 text-red-300"} ${error && "border-red-300 text-red-300"} ${isDragAccept && "border-green-300 text-green-300"} text-sm cursor-pointer`}>
          <input {...getInputProps()} />
          <p>{isDragActive ? (isDragAccept ? "Já pode soltar" : "Arquivo não suportado") : "Arraste uma imagem ou clique aqui"}</p>
        </div>
      )}

      {imageLocal && (
        <ImageLoaded
          image={imageLocal.image}
          name={imageLocal.name}
          size={imageLocal.size}
          isUploadingImage={isUploadingImage}
          onDeleteImage={onDeleteImage}
          imageUrl={imageUrl}
        />
      )}

      {error && <span className="text-sm text-red-300">{error.message}</span>}
    </div>
  );
}