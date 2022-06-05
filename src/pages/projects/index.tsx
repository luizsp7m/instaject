import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { Layout } from "../../components/Layout";
import { Row } from "../../components/Row";

export default function Projects() {
  return (
    <Layout title="Projetos">
      <Row />
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