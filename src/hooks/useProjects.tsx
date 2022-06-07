import { useContext } from "react";
import { ProjectsContext } from "../contexts/ProjectsContext";

export function useProjects() {
  return useContext(ProjectsContext)
}