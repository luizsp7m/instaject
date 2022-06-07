import { addDoc, collection } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { database } from "../../lib/firebase";
import { ImageLocal } from "../../types";
import { FileInput } from "../Input/FileInput";
import { TextInput } from "../Input/TextInput";
import { Loading } from "../Loading";

type Inputs = {
  name: string;
  description: string;
  repository: string;
  deploy: string;
  imageUrl: string;
  technologies: Array<{
    technologyId: string;
  }>;
}

export function ProjectForm() {
  const { data: session } = useSession();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Inputs>();

  const [imageLocal, setImageLocal] = useState<ImageLocal | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    return createProject(data);
  }

  async function createProject(data: Inputs) {
    try {
      const { 
        name, 
        description,
        repository,
        deploy,
        imageUrl,
      } = data;

      const docRef = await addDoc(collection(database, "projects"), {
        name,
        description,
        repository,
        deploy,
        imageUrl,
        email: session?.user?.email,
        created_at: new Date().toISOString(),
      });

      setValue("name", "");
      setValue("description", "");
      setValue("repository", "");
      setValue("deploy", "");
      setValue("imageUrl", "");

      setImageLocal(null);
      setImageUrl("");

      toast.success("Created");
    } catch (error) {
      toast.error("Error");
    }
  };

  useEffect(() => {
    if (imageUrl) {
      setValue("imageUrl", imageUrl, { shouldValidate: true });
    } else {
      setValue("imageUrl", imageUrl);
    }
  }, [imageUrl]);

  useEffect(() => {

  }, []);

  return (
    <div className="max-w-lg w-full mx-auto flex flex-col gap-6 text-md font-medium">
      <h1>Formulário</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <TextInput
          title="Nome"
          error={errors.name}
          {...register("name", {
            required: true,
          })}
        />

        <TextInput
          title="Descrição"
          error={errors.description}
          {...register("description", {
            required: true,
          })}
        />

        <TextInput
          title="Repositório"
          error={errors.repository}
          {...register("repository", {
            required: true,
          })}
        />

        <TextInput
          title="Deploy"
          error={errors.deploy}
          {...register("deploy", {
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
          mode={"create"}
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
          ) : "Guardar"}
        </button>
      </form>
    </div>
  );
}