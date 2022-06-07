import { format } from "date-fns";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { Project } from "../types";

interface ProjectsContextData {
  projects: Array<Project>;
}

interface ProjectsProviderProps {
  children: ReactNode;
}

export const ProjectsContext = createContext({} as ProjectsContextData);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const { data: session } = useSession();

  const [projects, setProjects] = useState<Project[]>([]);

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
    if (session) {
      getProjects();
    }
  }, [session]);

  return (
    <ProjectsContext.Provider value={{
      projects,
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}