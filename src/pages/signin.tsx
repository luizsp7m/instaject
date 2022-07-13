import Head from "next/head";

import { getSession, getProviders, LiteralUnion, ClientSafeProvider, signIn } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { GetServerSideProps } from "next";
import { BuiltInProviderType } from "next-auth/providers";

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>;
}

export default function SignIn({ providers }: Props) {
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
            {Object.values(providers).map((provider) => (
              <button
                key={provider.name}
                type="button"
                onClick={() => signIn(provider.id)}
                className="bg-sky-500 w-full rounded h-14 flex items-center justify-center gap-2 focus:ring-sky-400 hover:bg-sky-400"
              >
                <AiFillGithub size={22} />
                <span className="text-sm">
                  Iniciar sessão com {provider.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  const providers = await getProviders();

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  return {
    props: { providers },
  }
}