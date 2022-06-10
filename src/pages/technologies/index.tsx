import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { Layout } from "../../components/Layout";
import { PageHeader } from "../../components/PageHeader";
import { useTechnologies } from "../../hooks/useTechnologies";
import { Loading } from "../../components/Loading";
import { TechnologiesTable } from "../../components/Table/TechnologiesTable";

export default function Technologies() {
  const {
    technologies,
    technologiesIsLoading
  } = useTechnologies();

  return (
    <Layout title="Tecnologias">
      <PageHeader
        title="Tecnologias"
        amount={technologies.length}
        destination="/technologies/create"
      />

      {technologiesIsLoading ? <Loading /> : <TechnologiesTable technologies={technologies} />}
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