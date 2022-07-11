import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { ProjectList } from "../components/ProjectList";
import { database } from "../lib/firebase";
import { Project } from "../types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsIsLoading, setProjectsIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setProjectsIsLoading(true);

    const projectListRef = ref(database, "projects");

    onValue(projectListRef, snapshot => {
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

        setProjects(projects);
      }
    });

    setProjectsIsLoading(false);
  }, []);

  return (
    <Layout title="Início">
      {projectsIsLoading ? <Loading /> : <ProjectList projects={projects} />}
    </Layout>
  );
}