import { onValue, ref } from "firebase/database";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { ProjectList } from "../components/ProjectList";
import { database } from "../lib/firebase";
import { Project } from "../types";

export default function Favorites() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsIsLoading, setProjectsIsLoading] = useState<boolean>(true);

  const { data: session } = useSession();

  useEffect(() => {
    setProjectsIsLoading(true);

    const projectListRef = ref(database, "projects");

    const unsubscribe = onValue(projectListRef, snapshot => {
      const data = snapshot.val();

      if (data) {
        const projects = Object.entries<any>(data).map(([key, value]) => {
          return {
            id: key,
            name: value.name,
            description: value.description,
            repository: value.repository,
            deploy: value.deploy,
            image: value.image,
            created_at: value.created_at,
            user: value.user,
            favorites: Object.entries<any>(value.favorites ?? {}).map(([key, value]) => {
              return {
                id: key,
                user: value.user,
              }
            }),
            comments: Object.entries<any>(value.comments ?? {}).map(([key, value]) => {
              return {
                id: key,
                user: value.user,
                created_at: value.created_at,
                comment: value.comment,
              }
            }),
          }
        });

        let projectsFavorites: Project[] = [];

        projects.map(project => {
          return project.favorites.map(favorite => {
            if (favorite.user.email === session?.user?.email) {
              projectsFavorites.push(project);
            }
          });
        });

        setProjects(projectsFavorites);
        setProjectsIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [session]);

  return (
    <Layout title="Início">
      {projectsIsLoading ? <Loading /> : <ProjectList projects={projects} />}
    </Layout>
  );
}