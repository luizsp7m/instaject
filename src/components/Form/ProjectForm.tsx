import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useTechnologies } from "../../hooks/useTechnologies";
import { database } from "../../lib/firebase";
import { ImageLocal, Project, Technology } from "../../types";
import { FileInput } from "../Input/FileInput";
import { TechnologiesInput } from "../Input/TechnologiesInput";
import { TextInput } from "../Input/TextInput";
import { Loading } from "../Loading";

interface Props {
  project?: Project;
}

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

export function ProjectForm({ project }: Props) {
  const { technologies } = useTechnologies();
  const { data: session } = useSession();
  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<Inputs>({
    defaultValues: {
      name: project ? project.name : "",
      description: project ? project.description : "",
      repository: project ? project.repository : "",
      deploy: project ? project.deploy : "",
      imageUrl: project ? project.imageUrl : "",
      technologies: project ? project.technologies : [],
    }
  });

  const [imageLocal, setImageLocal] = useState<ImageLocal | null>(null);
  const [imageUrl, setImageUrl] = useState(project ? project.imageUrl : "");
  const [chosenList, setChosenList] = useState<Technology[]>([]);

  const mode = !project ? "create" : "update";

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    return mode === "create" ?
      createProject(data) :
      updateProject(data, project?.id + "");
  }

  async function createProject(data: Inputs) {
    try {
      const {
        name,
        description,
        repository,
        deploy,
        imageUrl,
        technologies,
      } = data;

      const docRef = await addDoc(collection(database, "projects"), {
        name,
        description,
        repository,
        deploy,
        imageUrl,
        technologies,
        email: session?.user?.email,
        created_at: new Date().toISOString(),
      });

      setValue("name", "");
      setValue("description", "");
      setValue("repository", "");
      setValue("deploy", "");
      setValue("imageUrl", "");
      setValue("technologies", []);

      setImageLocal(null);
      setImageUrl("");
      setChosenList([]);

      toast.success("Created");
    } catch (error) {
      toast.error("Error");
    }
  };

  async function updateProject(data: Inputs, projectId: string) {
    try {
      const {
        name,
        description,
        repository,
        deploy,
        imageUrl,
        technologies,
      } = data;

      const docRef = await updateDoc(doc(database, "projects", projectId), {
        name,
        description,
        repository,
        deploy,
        imageUrl,
        technologies,
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

  useEffect(() => {
    if (chosenList.length > 0) {
      const technologiesId = chosenList.map(item => {
        return {
          technologyId: item.id
        }
      });

      setValue("technologies",
        technologiesId,
        { shouldValidate: true });
    } else {
      setValue("technologies", []);
    }
  }, [chosenList]);

  useEffect(() => {
    if (!!technologies.length && project) {
      const chosenList = project.technologies.map(({ technologyId }) => {
        return technologies.find(item => item.id === technologyId);
      });

      setChosenList(chosenList as Array<Technology>);
    }
  }, [technologies]);

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

        <TechnologiesInput
          chosenList={chosenList}
          setChosenList={setChosenList}
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