import { format } from "date-fns";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { Project } from "../types";

interface ProjectsContextData {
  addProjectToList: (project: Project) => void;
  setRemoveList: Dispatch<SetStateAction<Project[]>>;
  removeList: Array<Project>;
  projects: Array<Project>;
}

interface ProjectsProviderProps {
  children: ReactNode;
}

export const ProjectsContext = createContext({} as ProjectsContextData);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const { data: session } = useSession();

  const [projects, setProjects] = useState<Project[]>([]); // Lista do banco de dados
  const [removeList, setRemoveList] = useState<Project[]>([]); // Lista de selecionadas pelo usuário

  const Router = useRouter();

  function addProjectToList(project: Project) {
    const updateProjectList = [...removeList];
    const exists = updateProjectList.find(item => item.id === project.id);

    if (!exists) {
      updateProjectList.push(project);
    } else {
      const projectIndex = updateProjectList.findIndex(item => item.id === project.id);
      updateProjectList.splice(projectIndex, 1);
    }

    setRemoveList(updateProjectList);
  }

  async function getProjects() {
    const q = query(
      collection(database, "projects"),
      where("email", "==", session?.user?.email),
      orderBy("created_at", "desc")
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const arrayDocs: Array<Project> = [];
      querySnapshot.forEach(doc => {
        arrayDocs.push({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          imageUrl: doc.data().imageUrl,
          created_at: format(new Date(doc.data().created_at), "dd/MM/yyyy - HH:mm"),
          deploy: doc.data().deploy,
          description: doc.data().description,
          repository: doc.data().repository,
        });
      });

      setProjects(arrayDocs);
    });

    return () => unsubscribe();
  }

  useEffect(() => {
    if (Router.asPath !== "/technologies") {
      setRemoveList([]);
    }
  }, [Router]);

  useEffect(() => {
    if (session) {
      getProjects();
    }
  }, [session]);

  return (
    <ProjectsContext.Provider value={{
      projects,
      removeList,
      setRemoveList,
      addProjectToList,
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}