import { useSession } from "next-auth/react";
import { createContext, ReactNode } from "react";
import { ProjectInputs } from "../components/Form/ProjectForm";
import { database } from "../lib/firebase";
import { push, ref, remove, set, update } from "firebase/database";

interface ProjectsContextData {
  createProject: (data: ProjectInputs) => Promise<void>;
  updateProject: (data: ProjectInputs, projectId: string) => Promise<void>;
  removeProject: (projectId: string) => Promise<void>;
  addProjectToFavorites: (projectId: string) => Promise<void>;
  removeProjectFromFavorites: (projectId: string, favoriteId: string) => Promise<void>;
  createComment: (projectId: string, comment: string) => Promise<void>;
}

interface ProjectsProviderProps {
  children: ReactNode;
}

export const ProjectsContext = createContext({} as ProjectsContextData);

export function ProjectsProvider({ children }: ProjectsProviderProps) {
  const { data: session } = useSession();

  async function createProject(data: ProjectInputs) {
    const projectListRef = ref(database, "projects");
    const newProjectRef = push(projectListRef);
    set(newProjectRef, {
      ...data,
      user: session?.user,
      created_at: new Date().toISOString(),
    });
  }

  async function updateProject(data: ProjectInputs, projectId: string) {
    const projectRef = ref(database, `projects/${projectId}`);
    update(projectRef, {
      ...data,
    });
  }

  async function removeProject(projectId: string) {
    const projectRef = ref(database, `projects/${projectId}`);
    remove(projectRef);
  }

  async function addProjectToFavorites(projectId: string) {
    const projectRef = ref(database, `projects/${projectId}/favorites`);
    const newProjectFavorite = push(projectRef);
    set(newProjectFavorite, {
      user: session?.user,
    });
  }

  async function removeProjectFromFavorites(projectId: string, favoriteId: string) {
    const favoriteRef = ref(database, `projects/${projectId}/favorites/${favoriteId}`);
    remove(favoriteRef);
  }

  async function createComment(projectId: string, comment: string) {
    const projectRef = ref(database, `projects/${projectId}/comments`);
    const newProjectComment = push(projectRef);
    set(newProjectComment, {
      comment,
      user: session?.user,
      created_at: new Date().toISOString(),
    });
  }

  return (
    <ProjectsContext.Provider value={{
      createProject,
      updateProject,
      removeProject,
      addProjectToFavorites,
      removeProjectFromFavorites,
      createComment,
    }}>
      {children}
    </ProjectsContext.Provider>
  );
}