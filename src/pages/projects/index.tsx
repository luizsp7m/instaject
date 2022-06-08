import { deleteDoc, doc } from "firebase/firestore";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { toast } from "react-toastify";
import { Layout } from "../../components/Layout";
import { PageHeader } from "../../components/PageHeader";
import { Table } from "../../components/Table";
import { useProjects } from "../../hooks/useProjects";
import { database } from "../../lib/firebase";

export default function Projects() {
  const {
    removeList,
    setRemoveList,
    projects,
  } = useProjects();

  async function removeProject(projectId: string) {
    await deleteDoc(doc(database, "projects", projectId));
  }

  async function removeProjects() {
    Promise.all(removeList.map(project => removeProject(project.id)))
      .then(() => {
        setRemoveList([]);
        toast.success("Deleted(s)");
      })
      .catch(error => {
        toast.success("Error");
      });
  }

  return (
    <Layout title="Projetos">
      <PageHeader
        title="Projetos"
        amount={projects.length}
        destination="/projects/create"
      />

      {projects.length > 0 && <Table data={projects} type="project" />}

      {!!removeList.length && (
        <div className="absolute left-0 right-0 bottom-8 flex justify-center text-sm">
          <div className="bg-red-400 p-4 rounded flex gap-2">
            <p>{removeList.length} registro(s) selecionado(s)</p>
            <button onClick={removeProjects} className="underline font-medium">Excluir</button>
          </div>
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
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: {
    },
  }
}