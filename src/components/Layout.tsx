import Head from "next/head";

import { Fragment, ReactNode } from "react";
import { ToastContainer } from "react-toastify";
import { Header } from "./Header";

interface Props {
  title: string;
  children: ReactNode;
}

export function Layout({ title, children }: Props) {
  return (
    <Fragment>
      <Head>
        <title>Instaject - {title}</title>
      </Head>

      <Header />

      <section className="max-w-[1086px] w-full mx-auto pt-[5rem] min-h-[calc(100vh-4rem)]">
        <main className="px-3 md:px-8 py-8">
          {children}
        </main>
      </section>

      <footer className="flex justify-center items-center h-16 border-t-[0.05rem] border-t-gray-800">
        <p className="text-sm text-slate-400">
          Desenvolvido por <a href="https://github.com/luizsp7m" target="_blank" className="underline">Luiz Oliveira</a>
        </p>
      </footer>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </Fragment>
  );
}