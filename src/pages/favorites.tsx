import { collectionGroup, doc, getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { ProjectList } from "../components/ProjectList";
import { database } from "../lib/firebase";
import { Project } from "../types";

export default function Favorites() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      setLoading(true);

      const docsRef = collectionGroup(database, "favorites");

      const q = query(docsRef, where("user.email", "==", `${session?.user?.email}`));

      let arr = [];

      const unsubscribe = onSnapshot(q, snapshot => {
        arr = snapshot.docs.map(doc => doc.ref.parent.parent?.id);

        Promise.all(arr.map(projectRef => {
          return getDoc(doc(database, "projects", `${projectRef}`));
        })).then(docs => {
          const arrDocs: Project[] = [];

          docs.map(doc => {
            if (doc.exists()) {
              arrDocs.push({ id: doc.id, ...doc.data() } as Project);
            }
          });

          setProjects(arrDocs);
          setLoading(false);
        });
      });

      return () => unsubscribe();
    }
  }, [session]);

  return (
    <Layout title="Favoritos">
      {loading ? <Loading /> : (
        <div className="flex flex-col gap-4">
          <p className="text-md font-medium">Projetos favoritos</p>
          <ProjectList projects={projects} />
        </div>
      )}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    }
  }

  return {
    props: {
    },
  }
}