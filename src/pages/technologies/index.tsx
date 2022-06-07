import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { Layout } from "../../components/Layout";
import { PageHeader } from "../../components/PageHeader";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { database } from "../../lib/firebase";
import { Technology } from "../../types";
import { Table } from "../../components/Table";
import { format } from "date-fns";
import { useTechnologies } from "../../hooks/useTechnologies";
import { doc, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";


export default function Technologies() {
  const {
    technologyList,
    setTechnologyList,
    technologies,
  } = useTechnologies();

  async function removeTechnology(technologyId: string) {
    await deleteDoc(doc(database, "technologies", technologyId));
  }

  async function removeTechnologies() {
    Promise.all(technologyList.map(technology => removeTechnology(technology.id)))
      .then(() => {
        setTechnologyList([]);
        toast.success("Deleted(s)");
      })
      .catch(error => {
        toast.success("Error");
      });
  }

  return (
    <Layout title="Tecnologias">
      <PageHeader
        title="Tecnologias"
        amount={technologies.length}
        destination="/technologies/create"
      />

      {technologies.length > 0 && <Table data={technologies} />}

      {!!technologyList.length && (
        <div className="absolute left-0 right-0 bottom-8 flex justify-center text-sm">
          <div className="bg-red-400 p-4 rounded flex gap-2">
            <p>{technologyList.length} registro(s) selecionado(s)</p>
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