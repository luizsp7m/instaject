import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react"
import { Layout } from "../../components/Layout";
import { BiArrowBack, BiTrashAlt, BiLinkAlt } from "react-icons/bi";
import { useForm, SubmitHandler } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../lib/firebase";
import { useDropzone } from "react-dropzone";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { api } from "../../lib/api";
import { AxiosRequestConfig } from "axios";

import filesize from "filesize";
import Link from "next/link";
import ReactLoading from "react-loading";

type Inputs = {
  name: string;
  imageLocal: string;
  imageUrl: string;
};

type Image = {
  name: string;
  size: string;
  url: string;
}

export default function Create() {
  const { data: session } = useSession();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Inputs>();
  const [imageLocal, setImageLocal] = useState<Image | null>();
  const [imageUrl, setImageUrl] = useState("");
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  const Router = useRouter();

  const onDrop = useCallback(async (uploadImage) => {
    setImageLocal({
      name: uploadImage[0].name,
      size: filesize(uploadImage[0].size),
      url: URL.createObjectURL(uploadImage[0]),
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
      setValue("imageUrl", respose.data.data.url);
    } catch (error) {
      console.log(error);
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
      "image/jpeg": [],
      "image/png": [],
      "image/svg+xml": [],
    },
  });

  function onDeleteImage() {
    setImageLocal(null);
    setImageUrl("");
  }

  const createTechnology: SubmitHandler<Inputs> = async (data) => {
    try {
      const { name, imageUrl } = data;

      const docRef = await addDoc(collection(database, "technologies"), {
        name,
        imageUrl,
        email: session?.user?.email,
        created_at: new Date().toISOString(),
      });

      Router.push("/technologies");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Layout title="Adicionar tecnologia">
      <div className="flex">
        <Link href={"/technologies"} passHref>
          <a href="" className="flex items-center gap-2 text-sm text-gray-400 hover:underline">
            <BiArrowBack />
            <span>Voltar</span>
          </a>
        </Link>
      </div>

      <div className="max-w-lg w-full mx-auto flex flex-col gap-6 text-md font-medium">
        <h1>Adicionar tecnologia</h1>
        <form onSubmit={handleSubmit(createTechnology)} className="flex flex-col gap-6">
          <div className="flex flex-col gap-3 w-full">
            <label className="text-sm text-gray-400">Nome</label>
            <input
              className={`h-12 rounded bg-gray-700 px-4 text-sm text-gray-200 focus:outline-none ${errors.name && "ring-2 ring-red-400"}`}
              {...register("name", {
                required: true,
              })}
            />
            {errors.name && <span className="text-sm text-red-300">Campo obrigatório</span>}
          </div>

          <div className="flex flex-col gap-3 w-full">
            <label className="text-sm text-gray-400">Imagem</label>
            {!imageLocal ? (
              <div {...getRootProps()} className={`flex w-full flex-col items-center p-10 border-2 rounded border-dashed border-gray-700 text-gray-400 text-center ${isDragReject || errors.imageLocal && "border-red-300 text-red-300"} ${isDragAccept && "border-green-300 text-green-300"} text-sm cursor-pointer`}>
                <input
                  {...getInputProps()}
                  {...register("imageLocal", {
                    required: true,
                  })}
                />

                {isDragActive ?
                  (isDragAccept ? <p>Pronto... já pode soltar</p> : <p>Por favor, selecione uma imagem</p>)
                  : <p>Arraste uma imagem aqui ou clique e selecione uma</p>
                }
              </div>
            ) : (
              <div className="flex gap-4 items-start">
                <img
                  className="w-14 h-14 object-cover rounded"
                  src={imageLocal.url}
                  alt="Imagem carregada"
                />

                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-sm font-medium">{imageLocal.name}</span>
                  <span className="text-sm text-gray-400">{imageLocal.size}</span>
                </div>

                {isUploadingImage ? (
                  <ReactLoading
                    type="spin"
                    height={20}
                    width={20}
                    color="#007fff"
                  />
                ) : (
                  <button onClick={onDeleteImage} className="flex items-center gap-2 text-red-400 text-sm hover:text-red-300 transition-colors duration-200">
                    <BiTrashAlt size={18} />
                    <span>Excluir</span>
                  </button>
                )}
              </div>
            )}

            {imageUrl && (
              <div className="h-12 flex overflow-hidden rounded">
                <input
                  className="flex-1 bg-gray-700 px-4 text-sm text-gray-300"
                  disabled
                  {...register("imageUrl", {
                    required: true,
                  })}
                />

                <Link href={imageUrl} passHref>
                  <a target="_blank" className="w-12 bg-gray-600 flex items-center justify-center hover:bg-gray-500 transition-colors duration-200">
                    <BiLinkAlt size={20} />
                  </a>
                </Link>
              </div>
            )}

            { !imageLocal && errors.imageLocal && <span className="text-sm text-red-300">Faça o upload de uma imagem</span> }
          </div>

          <button disabled={isSubmitting} type="submit" className="bg-sky-500 rounded h-12 px-4 focus:outline-none hover:bg-sky-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-400 hover:bg-sky-400">
            {isSubmitting ? "Enviando..." : "Adicionar"}
          </button>
        </form>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
    },
  }
}