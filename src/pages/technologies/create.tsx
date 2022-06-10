import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { Layout } from "../../components/Layout";
import { TechnologyForm } from "../../components/Form/TechnologyForm";
import { BackButton } from "../../components/BackButton";

export default function Create() {
  return (
    <Layout title="Cadastrar tecnologia">
      <BackButton destination="/technologies" />
      <TechnologyForm /> { /* Create */}
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