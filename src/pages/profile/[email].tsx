import { onValue, ref } from "firebase/database";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { BackButton } from "../../components/BackButton";
import { Layout } from "../../components/Layout";
import { Loading } from "../../components/Loading";
import { ProjectList } from "../../components/ProjectList";
import { database } from "../../lib/firebase";
import { Project } from "../../types";

interface Props {
  email: string;
}

export default function List({ email }: Props) {
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
          }
        });

        setProjects(projects);
      }
    });

    setProjectsIsLoading(false);
  }, []);

  return (
    <Layout title="Meus projetos">
      <div className="flex flex-col gap-8">
        <BackButton destination="/" />
        {projectsIsLoading ? <Loading /> : <ProjectList projects={projects} />}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      email: context.params?.email,
    },
  }
}
