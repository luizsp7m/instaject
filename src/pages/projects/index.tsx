import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { Layout } from "../../components/Layout";
import { PageHeader } from "../../components/PageHeader";
import { Table } from "../../components/Table";
import { useProjects } from "../../hooks/useProjects";

export default function Projects() {
  const { projects } = useProjects();

  return (
    <Layout title="Projetos">
      <PageHeader
        title="Projetos"
        amount={projects.length}
        destination="/projects/create"
      />
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