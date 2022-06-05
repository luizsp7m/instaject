import { GetServerSideProps } from "next";
import { getSession, useSession } from "next-auth/react"
import { Layout } from "../../components/Layout";
import { BiArrowBack } from "react-icons/bi";
import { useForm, SubmitHandler } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { database } from "../../lib/firebase";

import Link from "next/link";
import Router, { useRouter } from "next/router";

type Inputs = {
  name: string;
};

export default function Create() {
  const { data: session } = useSession();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();

  const Router = useRouter();

  const createTechnology: SubmitHandler<Inputs> = async (data) => {
    try {
      const { name } = data;

      const docRef = await addDoc(collection(database, "technologies"), {
        name,
        email: session?.user?.email,
        created_at: new Date().toISOString(),
      });

      Router.push("/technologies");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Layout title="Adicionar tecnologia">
      <div className="flex">
        <Link href={"/technologies"} passHref>
          <a href="" className="flex items-center gap-2 text-sm text-gray-400 hover:underline">
            <BiArrowBack />
            <span>Voltar</span>
          </a>
        </Link>
      </div>

      <form onSubmit={handleSubmit(createTechnology)} className="flex flex-col max-w-3xl w-full mx-auto gap-6 items-end">
        <div className="flex flex-col gap-3 w-full">
          <label className="text-sm text-gray-400">Nome</label>
          <input
            className={`h-12 rounded bg-gray-700 px-4 text-sm text-gray-200 focus:outline-none ${errors.name && "ring-2 ring-red-400"}`}
            {...register("name", {
              required: true,
            })}
          />
          {errors.name && <span className="text-sm text-red-300">Campo obrigatório</span>}
        </div>

        <button type="submit" className="bg-sky-500 rounded h-12 px-4 focus:outline-none hover:bg-sky-400 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-sky-400 hover:bg-sky-400">
          { isSubmitting ? "Enviando..." : "Guardar" }
        </button>
      </form>
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