import { GetServerSideProps } from "next";
import { Layout } from "../../components/Layout";
import { Project } from "../../types";
import { ProjectPost as ProjectPostComponent } from "../../components/ProjectPost";
import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { database } from "../../lib/firebase";
import { useRouter } from "next/router";
import { Loading } from "../../components/Loading";


export default function ProjectPost() {
  const [project, setProject] = useState<Project>();
  const [loading, setLoading] = useState<boolean>(true);

  const { query: params } = useRouter();

  useEffect(() => {
    setLoading(true);

    const docRef = doc(database, "projects", `${params.id}`);

    const unsubscribe = onSnapshot(docRef, snapshot => {
      setProject({ id: snapshot.id, ...snapshot.data() } as Project);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout title={project?.name ?? "Carregando..."}>
      {loading ? <Loading /> : (
        project && <ProjectPostComponent project={project} />
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
    },
  }
}