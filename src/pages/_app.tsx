import "../styles/global.css";
import "react-toastify/dist/ReactToastify.css";

import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react"
import { TechnologiesProvider } from "../contexts/TechnologiesContext";
import { ProjectsProvider } from "../contexts/ProjectsContext";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <TechnologiesProvider>
        <ProjectsProvider>
          <Component {...pageProps} />
        </ProjectsProvider>
      </TechnologiesProvider>
    </SessionProvider>
  )
}
