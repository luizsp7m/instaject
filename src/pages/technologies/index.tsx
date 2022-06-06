import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { Layout } from "../../components/Layout";
import { PageHeader } from "../../components/PageHeader";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../lib/firebase";
import { Technology } from "../../types";
import { Table } from "../../components/Table";
import { format } from "date-fns";

export default function Technologies() {
  const [technologies, setTechnologies] = useState<Technology[]>([]);

  useEffect(() => {
    (async () => {
      const q = query(
        collection(database, "technologies"),
        where("email", "==", "luizoliveira2808@gmail.com"),
        orderBy("created_at", "desc")
      );
      const querySnapshot = await getDocs(q);
      const arrayDocs: Technology[] = [];
      querySnapshot.forEach(doc => {
        arrayDocs.push({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          imageUrl: doc.data().imageUrl,
          created_at: format(new Date(doc.data().created_at), "dd/MM/yyyy - HH:mm"),
        });
      });

      setTechnologies(arrayDocs);
    })();
  }, []);

  return (
    <Layout title="Tecnologias">
      <PageHeader
        title="Tecnologias"
        amount={technologies.length}
        destination="/technologies/create"
      />

      {technologies.length > 0 && <Table data={technologies} />}
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