import { onValue, ref } from "firebase/database";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import { ProjectForm } from "../../components/Form/ProjectForm";
import { Layout } from "../../components/Layout";
import { database } from "../../lib/firebase";
import { Project } from "../../types";

interface Props {
  project: Project;
}

export default function Update({ project }: Props) {
  return (
    <Layout title="Projetos">
      <ProjectForm project={project} />
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

  const projectRef = ref(database, `projects/${context.params?.id}`);

  let project = undefined;

  onValue(projectRef, snapshot => {
    const data = snapshot.val();
    
    project = {
      id: context.params?.id,
      ...data,
    }
  });

  if (!project) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      project,
    },
  }
}
