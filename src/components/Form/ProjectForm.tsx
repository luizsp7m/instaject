import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useProjects } from "../../hooks/useProjects";
import { ImageLocal, Project } from "../../types";
import { DeleteButton } from "./DeleteButton";
import { FileInput } from "../Input/FileInput";
import { TextInput } from "../Input/TextInput";
import { SubmitButton } from "./SubmitButton";
import { useRouter } from "next/router";
import { BackButton } from "../BackButton";

interface Props {
  project?: Project;
}

export type ProjectInputs = {
  name: string;
  description: string;
  repository: string;
  deploy: string;
  image: string;
}

const validations = {
  name: {
    required: "Campo obrigatório",
    maxLength: {
      value: 20,
      message: "Máximo de 20 caracteres"
    }
  },

  description: {
    required: "Campo obrigatório",
    minLength: {
      value: 16,
      message: "Minimo de 16 caracteres"
    },
    maxLength: {
      value: 104,
      message: "Máximo de 104 caracteres"
    }
  },

  repository: {
    required: "Campo obrigatório",
  },

  deploy: {
    required: "Campo obrigatório",
  },

  image: {
    required: "Campo obrigatório",
  },
}

export function ProjectForm({ project }: Props) {
  const { createProject, updateProject, removeProject } = useProjects();

  const Router = useRouter();

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<ProjectInputs>({
    defaultValues: {
      name: project ? project.name : "",
      description: project ? project.description : "",
      repository: project ? project.repository : "",
      deploy: project ? project.deploy : "",
      image: project ? project.image : "",
    }
  });

  const [imageLocal, setImageLocal] = useState<ImageLocal | null>(null);
  const [imageUrl, setImageUrl] = useState(project ? project.image : "");

  const mode = !project ? "create" : "update";

  const onSubmit: SubmitHandler<ProjectInputs> = async (data) => {
    !project ? handleCreateProject(data) : handleUpdateProject(data, project.id)
  }

  function handleCreateProject(data: ProjectInputs) {
    createProject(data).then(() => {
      setValue("name", "");
      setValue("description", "");
      setValue("repository", "");
      setValue("deploy", "");
      setValue("image", "");
      setImageLocal(null);
      setImageUrl("");
      toast.success("Projeto criado");
    }).catch(error => {
      toast.error("Houve um erro");
    });
  };

  function handleUpdateProject(data: ProjectInputs, projectId: string) {
    updateProject(data, projectId).then(() => {
      toast.success("Dados salvos");
    }).catch(error => {
      toast.error("Houve um erro");
    });
  }

  function handleRemoveProject(projectId: string) {
    removeProject(projectId).then(() => {
      Router.push("/");
    }).catch(error => {
      toast.error("Houve um erro");
    })
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
      <BackButton destination="/" />

      <h1>Formulário</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-start">
        <TextInput
          title="Nome"
          error={errors.name}
          {...register("name", validations.name)}
        />

        <TextInput
          title="Descrição"
          error={errors.description}
          {...register("description", validations.description)}
        />

        <TextInput
          title="Repositório"
          error={errors.repository}
          {...register("repository", validations.repository)}
        />

        <TextInput
          title="Deploy"
          error={errors.deploy}
          {...register("deploy", validations.deploy)}
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
          {...register("image", validations.image)}
        />

        <SubmitButton isSubmitting={isSubmitting} />

        {project && <DeleteButton onRemove={() => handleRemoveProject(project.id)} />}
      </form>
    </div >
  );
}