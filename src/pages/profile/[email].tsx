import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BackButton } from "../../components/BackButton";
import { Layout } from "../../components/Layout";
import { Loading } from "../../components/Loading";
import { ProjectList } from "../../components/ProjectList";
import { projectCollectionRef } from "../../lib/firestore.collection";
import { Project } from "../../types";

interface Props {
  email: string;
}

export default function List({ email }: Props) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { query: params } = useRouter();

  useEffect(() => {
    setLoading(true);

    const q = query(projectCollectionRef, where("user.email", "==", `${params.email}`), orderBy("created_at", "desc"));

    const unsubscribe = onSnapshot(q, snapshot => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout title="Meus projetos">
      <div className="flex flex-col gap-8">
        <BackButton />
        {loading ? <Loading /> : <ProjectList projects={projects} />}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    }
  }

  return {
    props: {
    },
  }
}