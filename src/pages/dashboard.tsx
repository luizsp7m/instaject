import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { Layout } from "../components/Layout";

export default function Dashboard() {
  return (
    <Layout title="Início">
      
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