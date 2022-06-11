import { format } from "date-fns";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ProjectInputs } from "../components/Form/ProjectForm";
import { database } from "../lib/firebase";
import { Project } from "../types";

interface ProjectsContextData {
  projects: Array<Project>;
  projectsIsLoading: boolean;
  createProject: (data: ProjectInputs) => Promise<void>;
  updateProject: (data: ProjectInputs, projectId: string) => Promise<void>;
  removeProject: (projectId: string) => Promise<void>;
}

interface ProjectsProviderProps {
  children: ReactNode;
}

export const ProjectsContext = createContext({} as ProjectsContextData);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const { data: session } = useSession();

  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsIsLoading, setProjectsIsLoading] = useState(true);

  async function getProjects() {
    const q = query(
      collection(database, "projects"),
      where("email", "==", session?.user?.email),
      orderBy("last_update", "desc")
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setProjectsIsLoading(true);

      const arrayDocs: Array<Project> = [];

      querySnapshot.forEach(doc => {
        arrayDocs.push({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          description: doc.data().description,
          repository: doc.data().repository,
          deploy: doc.data().deploy,
          image: doc.data().image,
          technologies: doc.data().technologies,
          created_at: format(new Date(doc.data().created_at), "dd/MM/yyyy - HH:mm"),
          last_update: format(new Date(doc.data().last_update), "dd/MM/yyyy - HH:mm"),
        });
      });

      setProjects(arrayDocs);
      setProjectsIsLoading(false);
    });

    return () => unsubscribe();
  }

  async function createProject(data: ProjectInputs) {
    await addDoc(collection(database, "projects"), {
      ...data,
      email: session?.user?.email,
      created_at: new Date().toISOString(),
      last_update: new Date().toISOString(),
    });
  }

  async function updateProject(data: ProjectInputs, projectId: string) {
    await updateDoc(doc(database, "projects", projectId), {
      ...data,
      last_update: new Date().toISOString(),
    });
  }

  async function removeProject(projectId: string) {
    await deleteDoc(doc(database, "projects", projectId));
  }

  useEffect(() => {
    if (session?.user) {
      getProjects();
    }
  }, [session]);

  return (
    <ProjectsContext.Provider value={{
      projects,
      projectsIsLoading,
      createProject,
      updateProject,
      removeProject,
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}