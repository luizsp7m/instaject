import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react"
import { Layout } from "../../components/Layout";
import { BiArrowBack } from "react-icons/bi";
import { useForm, SubmitHandler } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../lib/firebase";
import { toast } from "react-toastify";
import { TextInput } from "../../components/Input/TextInput";
import { FileInput } from "../../components/Input/FileInput";
import { useEffect, useState } from "react";
import { ImageLocal } from "../../types";
import { Loading } from "../../components/Loading";

import Link from "next/link";

type Inputs = {
  name: string;
  imageUrl: string;
};

export default function Create() {
  const { data: session } = useSession();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Inputs>();
  const [imageLocal, setImageLocal] = useState<ImageLocal | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const createTechnology: SubmitHandler<Inputs> = async (data) => {
    try {
      const { name, imageUrl } = data;

      const docRef = await addDoc(collection(database, "technologies"), {
        name,
        imageUrl,
        email: session?.user?.email,
        created_at: new Date().toISOString(),
      });

      setValue("name", "");
      setValue("imageUrl", "");

      setImageLocal(null);
      setImageUrl("");

      toast.success("Tecnologia adicionada");
    } catch (error) {
      toast.error("Houve um erro");
    }
  };

  useEffect(() => {
    if (imageUrl) {
      setValue("imageUrl", imageUrl, { shouldValidate: true });
    } else {
      setValue("imageUrl", imageUrl);
    }
  }, [imageUrl]);

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
          <TextInput
            title="Nome"
            error={errors.name}
            {...register("name", {
              required: true,
            })}
          />

          <FileInput
            title="Imagem"
            error={errors.imageUrl}
            setImageLocal={setImageLocal}
            imageLocal={imageLocal}
            setImageUrl={setImageUrl}
            imageUrl={imageUrl}
          />

          <input
            type="hidden"
            disabled
            {...register("imageUrl", {
              required: true,
            })}
          />

          <button disabled={isSubmitting} type="submit" className="flex items-center justify-center bg-sky-500 rounded h-12 px-4 focus:outline-none hover:bg-sky-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-400 hover:bg-sky-400">
            {isSubmitting ? (
              <Loading />
            ) : "Adicionar"}
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