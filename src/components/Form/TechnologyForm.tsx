import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ImageLocal, Technology } from "../../types";
import { FileInput } from "../Input/FileInput";
import { TextInput } from "../Input/TextInput";
import { Loading } from "../Loading";
import { toast } from "react-toastify";
import { useTechnologies } from "../../hooks/useTechnologies";
import { useProjects } from "../../hooks/useProjects";
import { DeleteButton } from "./DeleteButton";
import { SubmitButton } from "./SubmitButton";
import { useRouter } from "next/router";

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

  const Router = useRouter();

  const validations = {
    name: {
      required: "Campo obrigatório",
      maxLength: {
        value: 20,
        message: "Máximo de 20 caracteres"
      }
    },

    image: {
      required: "Campo obrigatório"
    },
  }

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
      Router.push("/technologies");
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

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-start">
        <TextInput
          title="Nome"
          error={errors.name}
          {...register("name", validations.name)}
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

        <input
          type="hidden"
          disabled
          {...register("image", {
            required: true,
          })}
        />

        <SubmitButton isSubmitting={isSubmitting} />

        {technology && <DeleteButton onRemove={onRemoveTechnology} />}
      </form>
    </div>
  );
}