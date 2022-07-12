import { doc, getDoc } from "firebase/firestore";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import { ProjectForm } from "../../../components/Form/ProjectForm";
import { Layout } from "../../../components/Layout";
import { database } from "../../../lib/firebase";
import { Project } from "../../../types";

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

  const docRef = doc(database, "projects", `${context.params?.id}`);

  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  if (docSnap.data().user.email !== session.user?.email) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
      project: { id: docSnap.id, ...docSnap.data() }
    },
  }
}
