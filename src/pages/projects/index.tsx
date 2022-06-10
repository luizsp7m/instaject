import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { Layout } from "../../components/Layout";
import { PageHeader } from "../../components/PageHeader";
import { Loading } from "../../components/Loading";
import { TechnologiesTable } from "../../components/Table/TechnologiesTable";
import { useProjects } from "../../hooks/useProjects";
import { ProjectsTable } from "../../components/Table/ProjectsTable";

export default function Projects() {
  const {
    projects,
    projectsIsLoading,
  } = useProjects();

  return (
    <Layout title="Projetos">
      <PageHeader
        title="Projetos"
        amount={projects.length}
        destination="/projects/create"
      />

      {projectsIsLoading ? <Loading /> : <ProjectsTable projects={projects} />}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
    },
  }
}