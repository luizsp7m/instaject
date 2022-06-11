import { useSession, signIn, getSession } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";

import Head from "next/head";
import { GetServerSideProps } from "next";

export default function App() {
  return (
    <div>
      <Head>
        <title>Dash Anything - SignIn</title>
      </Head>

      <div className="flex justify-center items-center h-screen p-4">
        <div className="max-w-[320px] w-full rounded flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <h1 className="text-2xl font-medium">Bem-vindo(a)!</h1>
            <p className="text-md text-gray-400">Entre com a sua conta para acessar nossa plataforma</p>
          </div>

          <div className="flex flex-col gap-3">
            <button type="button" onClick={() => signIn()} className="bg-violet-600 w-full rounded h-14 flex items-center justify-center gap-2 focus:ring-violet-500 hover:bg-violet-500">
              <AiFillGithub size={22} />
              <span className="text-sm">Iniciar sessão com GitHub</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if(session) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    }
  }

  return {
    props: {

    },
  }
}