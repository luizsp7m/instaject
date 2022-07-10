import { format } from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";
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

  async function getProjectsByEmail() {
    setProjectsIsLoading(true);

    const q = query(
      collection(database, "projects"),
      where("user.email", "==", email),
    );

    const querySnapshot = await getDocs(q);

    const arrayDocs: Array<Project> = [];

    querySnapshot.forEach(doc => {
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
    getProjectsByEmail();
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
