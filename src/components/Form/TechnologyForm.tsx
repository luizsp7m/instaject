import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImageLocal, Technology } from "../../types";
import { FileInput } from "../Input/FileInput";
import { TextInput } from "../Input/TextInput";
import { Loading } from "../Loading";
import { toast } from "react-toastify";
import { useTechnologies } from "../../hooks/useTechnologies";
import { BiTrash } from "react-icons/bi";
import { useProjects } from "../../hooks/useProjects";

interface Props {
  technology?: Technology;
}

export type TechnologyInputs = {
  name: string;
  image: string;
};

export function TechnologyForm({ technology }: Props) {
  const { createTechnology, updateTechnology, removeTechnology } = useTechnologies();
  const { projects } = useProjects();

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<TechnologyInputs>({
    defaultValues: {
      name: technology ? technology.name : "",
      image: technology ? technology.image : "",
    }
  });

  const [imageLocal, setImageLocal] = useState<ImageLocal | null>(null);
  const [imageUrl, setImageUrl] = useState(technology ? technology.image : "");

  const mode = !technology ? "create" : "update";

  const onSubmit: SubmitHandler<TechnologyInputs> = async (data) => {
    return mode === "create" ?
      onCreateTechnology(data) :
      onUpdateTechnology(data, technology?.id + "");
  }

  function onCreateTechnology(data: TechnologyInputs) {
    createTechnology(data).then(() => {
      setValue("name", "");
      setValue("image", "");
      setImageLocal(null);
      setImageUrl("");
      toast.success("Tecnologia adicionada");
    }).catch(error => {
      toast.error("Houve um erro");
    });
  };

  function onUpdateTechnology(data: TechnologyInputs, technologyId: string) {
    updateTechnology(data, technologyId).then(() => {
      toast.success("Dados salvos");
    }).catch(error => {
      toast.error("Houve um erro");
    });
  }

  function onRemoveTechnology() {
    let exists = false;

    projects.map(project => {
      if (project.technologies.includes(technology?.id + "")) {
        exists = true;
      }
    });

    if (exists) {
      return toast.error("Tecnologia cadastrada em um ou mais projetos")
    }

    removeTechnology(technology?.id + "").then(() => {
      toast.success("Deletado");
    }).catch(error => {
      toast.error("Houve um erro");
    });
  }

  useEffect(() => {
    if (imageUrl) {
      setValue("image", imageUrl, { shouldValidate: true });
    } else {
      setValue("image", imageUrl);
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
          error={errors.image}
          setImageLocal={setImageLocal}
          imageLocal={imageLocal}
          setImageUrl={setImageUrl}
          imageUrl={imageUrl}
          mode={mode}
        />

        {technology && (
          <button
            type="button"
            className="flex items-center gap-2 text-red-300 text-sm"
            onClick={onRemoveTechnology}
          >
            <BiTrash
              size={20}
            />

            <span>Excluir tecnologia</span>
          </button>
        )}

        <input
          type="hidden"
          disabled
          {...register("image", {
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