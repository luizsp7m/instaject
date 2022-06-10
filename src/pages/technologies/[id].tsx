import { format } from "date-fns";
import { collection, getDocs, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next"
import { getSession } from "next-auth/react";
import { BackButton } from "../../components/BackButton";
import { TechnologyForm } from "../../components/Form/TechnologyForm";
import { Layout } from "../../components/Layout";
import { database } from "../../lib/firebase";
import { Technology } from "../../types";

interface Props {
  technology: Technology;
}

export default function Update({ technology }: Props) {
  return (
    <Layout title="Tecnologias">
      <BackButton destination="/technologies" />
      <TechnologyForm technology={technology} /> { /* Update */}
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
    collection(database, "technologies"),
    where("email", "==", session.user?.email),
  );

  const querySnapshot = await getDocs(q);
  const technologies: Array<Technology> = [];
  querySnapshot.forEach(doc => {
    technologies.push({
      id: doc.id,
      email: doc.data().email,
      name: doc.data().name,
      image: doc.data().image,
      created_at: format(new Date(doc.data().created_at), "dd/MM/yyyy - HH:mm"),
      last_update: format(new Date(doc.data().last_update), "dd/MM/yyyy - HH:mm"),
    });
  });

  const technology = technologies.find(technology => technology.id === context.params?.id);

  if (!technology) {
    return {
      redirect: {
        destination: "/technologies",
        permanent: false,
      },
    }
  }

  return {
    props: {
      technology,
    },
  }
}
