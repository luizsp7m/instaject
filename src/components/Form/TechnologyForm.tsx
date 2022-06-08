import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { database } from "../../lib/firebase";
import { ImageLocal, Technology } from "../../types";
import { FileInput } from "../Input/FileInput";
import { TextInput } from "../Input/TextInput";
import { Loading } from "../Loading";
import { toast } from "react-toastify";

interface Props {
  technology?: Technology;
}

type Inputs = {
  name: string;
  imageUrl: string;
};

export function TechnologyForm({ technology }: Props) {
  const { data: session } = useSession();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Inputs>({
    defaultValues: {
      name: technology ? technology.name : "",
      imageUrl: technology ? technology.imageUrl : "",
    }
  });

  const [imageLocal, setImageLocal] = useState<ImageLocal | null>(null);
  const [imageUrl, setImageUrl] = useState(technology ? technology.imageUrl : "");

  const mode = !technology ? "create" : "update";

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    return mode === "create" ?
      createTechnology(data) :
      updateTechnology(data, technology?.id + "");
  }

  async function createTechnology(data: Inputs) {
    try {
      const {
        name,
        imageUrl
      } = data;

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

      toast.success("Created");
    } catch (error) {
      toast.error("Error");
    }
  };

  async function updateTechnology(data: Inputs, id: string) {
    try {
      const { name, imageUrl } = data;

      const docRef = await updateDoc(doc(database, "technologies", id), {
        name,
        imageUrl,
        created_at: new Date().toISOString(),
      })

      toast.success("Updated");

    } catch (error) {
      toast.error("Error");
    }
  }

  useEffect(() => {
    if (imageUrl) {
      setValue("imageUrl", imageUrl, { shouldValidate: true });
    } else {
      setValue("imageUrl", imageUrl);
    }
  }, [imageUrl]);

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

        <FileInput
          title="Imagem"
          error={errors.imageUrl}
          setImageLocal={setImageLocal}
          imageLocal={imageLocal}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          mode={mode}
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