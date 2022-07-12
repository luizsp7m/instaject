import { onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { ProjectList } from "../components/ProjectList";
import { projectCollectionRef } from "../lib/firestore.collection";
import { Project } from "../types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);

    const q = query(projectCollectionRef, orderBy("created_at", "desc"));

    const unsubscribe = onSnapshot(q, snapshot => {
      setProjects(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project)));
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Layout title="Início">
      {loading ? <Loading /> : <ProjectList projects={projects} />}
    </Layout>
  );
}