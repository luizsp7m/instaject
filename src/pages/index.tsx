import { useSession, signIn, signOut } from "next-auth/react";
import { Layout } from "../components/Layout";

export default function App() {
  const { data, status } = useSession();

  return (
    <Layout title="Início">
      <span>{status}</span>
    </Layout>
  );
}