import { format } from "date-fns";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { ProjectCard } from "../components/ProjectCard";
import { ProjectList } from "../components/ProjectList";
import { database } from "../lib/firebase";
import { Project } from "../types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectsIsLoading, setProjectsIsLoading] = useState<boolean>(true);

  async function getProjects() {
    setProjectsIsLoading(true);

    const arrayDocs: Array<Project> = [];

    const q = query(
      collection(database, "projects"),
      orderBy("created_at", "desc")
    );

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      arrayDocs.push({
        id: doc.id,
        user: doc.data().user,
        name: doc.data().name,
        description: doc.data().description,
        repository: doc.data().repository,
        deploy: doc.data().deploy,
        image: doc.data().image,
        created_at: format(new Date(doc.data().created_at), "dd/MM/yyyy - HH:mm"),
        last_update: format(new Date(doc.data().last_update), "dd/MM/yyyy - HH:mm"),
      });
    });

    setProjects(arrayDocs);
    setProjectsIsLoading(false);
  }

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <Layout title="Início">
      {projectsIsLoading ? <Loading /> : <ProjectList projects={projects} />}
    </Layout>
  );
}