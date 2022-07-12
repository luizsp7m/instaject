import { collectionGroup, getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { ProjectList } from "../components/ProjectList";
import { database } from "../lib/firebase";
import { Project } from "../types";

export default function Favorites() {
  const [projects, setProjects] = useState<Project[]>([]);

  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      const docsRef = collectionGroup(database, "favorites");

      const q = query(docsRef, where("user.email", "==", `${session?.user?.email}`));

      const unsubscribe = onSnapshot(q, snapshot => {
        
      });

      return () => unsubscribe();
    }
  }, [session]);

  return (
    <Layout title="Favoritos">
      {/* <ProjectList projects={projects} /> */}
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