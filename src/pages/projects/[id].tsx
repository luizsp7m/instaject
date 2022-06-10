import { format } from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import { BackButton } from "../../components/BackButton";
import { ProjectForm } from "../../components/Form/ProjectForm";
import { TechnologyForm } from "../../components/Form/TechnologyForm";
import { Layout } from "../../components/Layout";
import { database } from "../../lib/firebase";
import { Project, Technology } from "../../types";

interface Props {
  project: Project;
}

export default function Update({ project }: Props) {
  return (
    <Layout title="Projetos">
      <BackButton destination="/projects" />
      <ProjectForm project={project} /> { /* Update */}
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

  const q = query(
    collection(database, "projects"),
    where("email", "==", session.user?.email),
  );

  const querySnapshot = await getDocs(q);
  const projects: Array<Project> = [];
  querySnapshot.forEach(doc => {
    projects.push({
      id: doc.id,
      email: doc.data().email,
      name: doc.data().name,
      description: doc.data().description,
      repository: doc.data().repository,
      deploy: doc.data().deploy,
      image: doc.data().image,
      technologies: doc.data().technologies,
      created_at: format(new Date(doc.data().created_at), "dd/MM/yyyy - HH:mm"),
      last_update: format(new Date(doc.data().last_update), "dd/MM/yyyy - HH:mm"),
    });
  });

  const project = projects.find(project => project.id === context.params?.id);

  if (!project) {
    return {
      redirect: {
        destination: "/projects",
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
