import Head from "next/head";

import { Fragment, ReactNode, useState } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

interface Props {
  title: string;
  children: ReactNode;
}

export function Layout({ title, children }: Props) {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);

  function onToggleSidebar() {
    setSidebarIsOpen(!sidebarIsOpen);
  }

  return (
    <Fragment>
      <Head>
        <title>Dash Anything - {title}</title>
      </Head>

      <main className="h-screen overflow-x-auto">
        <Sidebar isOpen={sidebarIsOpen} />

        <section className={`transition-all duration-300 ${sidebarIsOpen ? "pl-[350px]" : "pl-0"}`}>
          <Header onToggleSidebar={onToggleSidebar} />

          <div className="h-[calc(100vh-4rem)] overflow-y-auto p-4">
            {children}
          </div>
        </section>
      </main>
    </Fragment>
  );
}