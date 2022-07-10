import "../styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { ProjectsProvider } from "../contexts/ProjectsContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <ProjectsProvider>
        <Component {...pageProps} />
      </ProjectsProvider>
    </SessionProvider>
  )
}
