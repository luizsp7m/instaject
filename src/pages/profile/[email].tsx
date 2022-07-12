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
    if (params) {
      setLoading(true);

      const q = query(projectCollectionRef, where("user.email", "==", `${params.email}`), orderBy("created_at", "desc"));

      const unsubscribe = onSnapshot(q, snapshot => {
        setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
        setLoading(false);
      });

      return () => unsubscribe();
    }
  }, [params]);

  return (
    <Layout title="Meus projetos">
      <div className="flex flex-col gap-8">
        <BackButton />
        {loading ? <Loading /> : (
          projects.length === 0 ? <p className="text-sm font-medium">Nenhum projeto publicado por esse usuário</p> : (
            <div className="flex flex-col gap-4">
              <div className="bg-grayish-700 flex justify-center relative rounded-sm p-6">
                <div className="flex items-center flex-col gap-3">
                  <img
                    src={projects[0].user.image}
                    alt=""
                    className="h-20 w-20 object-cover rounded-full"
                  />

                  <div className="flex flex-col gap-1 items-center">
                    <h1 className="text-md font-medium">{projects[0].user.name}</h1>
                    <span className="text-sm text-gray-400">{projects[0].user.email}</span>
                    <h5 className="text-sm font-medium text-gray-300">{projects.length} projeto(s) publicado(s)</h5>
                  </div>
                </div>
              </div>

              <ProjectList projects={projects} />
            </div>
          )
        )}
      </div>
    </Layout>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/signin",
//         permanent: false,
//       },
//     }
//   }

//   return {
//     props: {
//     },
//   }
// }