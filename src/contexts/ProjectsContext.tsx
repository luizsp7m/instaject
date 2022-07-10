import { format } from "date-fns";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ProjectInputs } from "../components/Form/ProjectForm";
import { database } from "../lib/firebase";
import { Project } from "../types";

interface ProjectsContextData {
  createProject: (data: ProjectInputs) => Promise<void>;
}

interface ProjectsProviderProps {
  children: ReactNode;
}

export const ProjectsContext = createContext({} as ProjectsContextData);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const { data: session } = useSession();

  async function createProject(data: ProjectInputs) {
    try {
      const docRef = await addDoc(collection(database, "projects"), {
        ...data,
        user: session?.user,
        created_at: new Date().toISOString(),
        last_update: new Date().toISOString(),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <ProjectsContext.Provider value={{
      createProject,
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}