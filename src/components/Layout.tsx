import Head from "next/head";

import { Fragment, ReactNode } from "react";
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

      <section className="max-w-[1086px] w-full mx-auto pt-16">
        <main className="px-8 py-12">
          {children}
        </main>
      </section>
    </Fragment>
  );
}