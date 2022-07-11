import { onValue, ref } from "firebase/database";
import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout";
import { database } from "../../lib/firebase";
import { Project } from "../../types";
import { ProjectPost as ProjectPostComponent } from "../../components/ProjectPost";
import { Loading } from "../../components/Loading";

interface Props {
  projectId: string;
}

export default function ProjectPost({ projectId }: Props) {
  const [project, setProject] = useState<Project>();
  const [projectIsLoading, setProjectIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setProjectIsLoading(true);

    const projectRef = ref(database, `projects/${projectId}`);

    const unsubscribe = onValue(projectRef, snapshot => {
      const data = snapshot.val();

      setProject({
        id: projectId,
        name: data.name,
        description: data.description,
        repository: data.repository,
        deploy: data.deploy,
        image: data.image,
        created_at: data.created_at,
        user: data.user,
        favorites: Object.entries<any>(data.favorites ?? {}).map(([key, data]) => {
          return {
            id: key,
            user: data.user,
          }
        }),

        comments: Object.entries<any>(data.comments ?? {}).map(([key, value]) => {
          return {
            id: key,
            user: value.user,
            created_at: value.created_at,
            comment: value.comment,
          }
        }),
      });

      setProjectIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout title={project?.name ?? "Carregando..."}>
      {projectIsLoading && <Loading />}
      {!projectIsLoading && project && <ProjectPostComponent project={project} />}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const projectRef = ref(database, `projects/${context.params?.id}`);

  let project = false;

  onValue(projectRef, snapshot => {
    const data = snapshot.val();

    if (data) {
      project = true;
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
      projectId: context.params?.id,
    },
  }
}