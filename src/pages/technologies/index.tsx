import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { Layout } from "../../components/Layout";
import { PageHeader } from "../../components/PageHeader";
import { database } from "../../lib/firebase";
import { Table } from "../../components/Table";
import { useTechnologies } from "../../hooks/useTechnologies";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useProjects } from "../../hooks/useProjects";


export default function Technologies() {
  const {
    removeList,
    setRemoveList,
    technologies,
  } = useTechnologies();

  const { projects } = useProjects();

  async function removeTechnology(technologyId: string) {
    let exists = false;

    projects.map(project => {
      project.technologies.map(technology => {
        if(technology.technologyId === technologyId) {
          exists = true;
        }
      });
    });

    if(exists) {
      throw new Error("Tecnologia cadastrada em projetos");
    }

    deleteDoc(doc(database, "technologies", technologyId));
  }

  async function removeTechnologies() {
    Promise.all(removeList.map(technology => removeTechnology(technology.id)))
      .then(() => {
        setRemoveList([]);
        toast.success("Deleted(s)");
      })
      .catch(error => {
        toast.error("Error");
      });
  }

  return (
    <Layout title="Tecnologias">
      <PageHeader
        title="Tecnologias"
        amount={technologies.length}
        destination="/technologies/create"
      />

      {technologies.length > 0 && <Table data={technologies} type="technology" />}

      {!!removeList.length && (
        <div className="absolute left-0 right-0 bottom-8 flex justify-center text-sm">
          <div className="bg-red-400 p-4 rounded flex gap-2">
            <p>{removeList.length} registro(s) selecionado(s)</p>
            <button onClick={removeTechnologies} className="underline font-medium">Excluir</button>
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