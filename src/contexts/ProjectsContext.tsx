import { format } from "date-fns";
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { ProjectInputs } from "../components/Form/ProjectForm";
import { database } from "../lib/firebase";
import { Project } from "../types";

interface ProjectsContextData {
  createProject: (data: ProjectInputs) => Promise<void>;
  updateProject: (data: ProjectInputs, projectId: string) => Promise<void>;
  removeProject: (projectId: string) => Promise<void>;
  addProjectToFavorite: (projectId: string) => Promise<void>;
}

interface ProjectsProviderProps {
  children: ReactNode;
}

export const ProjectsContext = createContext({} as ProjectsContextData);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const { data: session } = useSession();

  async function createProject(data: ProjectInputs) {
    await addDoc(collection(database, "projects"), {
      ...data,
      user: session?.user,
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

  async function addProjectToFavorite(projectId: string) {
    await updateDoc(doc(database, "projects", projectId), {
      favorites: session?.user,
    });
  }

  return (
    <ProjectsContext.Provider value={{
      createProject,
      updateProject,
      removeProject,
      addProjectToFavorite,
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}