import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useProjects } from "../../hooks/useProjects";
import { ImageLocal, Project } from "../../types";
import { DeleteButton } from "./DeleteButton";
import { FileInput } from "../Input/FileInput";
import { TechnologiesInput } from "../Input/TechnologiesInput";
import { TextInput } from "../Input/TextInput";
import { Loading } from "../Loading";
import { SubmitButton } from "./SubmitButton";
import { useRouter } from "next/router";

interface Props {
  project?: Project;
}

export type ProjectInputs = {
  name: string;
  description: string;
  repository: string;
  deploy: string;
  image: string;
  technologies: Array<string>;
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
      technologies: project ? project.technologies : [],
    }
  });

  const [imageLocal, setImageLocal] = useState<ImageLocal | null>(null);
  const [imageUrl, setImageUrl] = useState(project ? project.image : "");
  const [chosenTechnologies, setChosenTechnologies] = useState<string[]>(project ? project.technologies : []);

  const mode = !project ? "create" : "update";

  const onSubmit: SubmitHandler<ProjectInputs> = async (data) => {
    return mode === "create" ?
      onCreateProject(data) :
      onUpdateProject(data, project?.id + "");
  }

  function onCreateProject(data: ProjectInputs) {
    createProject(data).then(() => {
      setValue("name", "");
      setValue("description", "");
      setValue("repository", "");
      setValue("deploy", "");
      setValue("image", "");
      setValue("technologies", []);

      setImageLocal(null);
      setImageUrl("");
      setChosenTechnologies([]);

      toast.success("Projeto criado");
    }).catch(error => {
      toast.success("Houve um erro");
    });
  };

  function onUpdateProject(data: ProjectInputs, projectId: string) {
    updateProject(data, projectId).then(() => {
      toast.success("Dados salvos");
    }).catch(error => {
      toast.error("Houve um erro");
    });
  }

  function onRemoveProject() {
    removeProject(project?.id + "").then(() => {
      Router.push("/projects");
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

  useEffect(() => {
    if (chosenTechnologies.length > 0) {
      setValue("technologies", chosenTechnologies, {
        shouldValidate: true,
      });
    } else {
      setValue("technologies", []);
    }
  }, [chosenTechnologies]);

  return (
    <div className="max-w-lg w-full mx-auto flex flex-col gap-6 text-md font-medium">
      <h1>Formulário</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 items-start">
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

        <TechnologiesInput
          chosenTechnologies={chosenTechnologies}
          setChosenTechnologies={setChosenTechnologies}
          error={errors.technologies}
        />

        <input
          type="hidden"
          disabled
          {...register("technologies", {
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

        <input
          type="hidden"
          disabled
          {...register("image", {
            required: true,
          })}
        />

        <SubmitButton isSubmitting={isSubmitting} />

        {project && <DeleteButton onRemove={onRemoveProject} />}
      </form>
    </div >
  );
}