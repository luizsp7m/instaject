import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react"
import { Layout } from "../components/Layout";
import { Loading } from "../components/Loading";
import { ProjectCard } from "../components/ProjectCard";
import { TechnologyCard } from "../components/TechnologyCard";
import { useProjects } from "../hooks/useProjects";
import { useTechnologies } from "../hooks/useTechnologies";

export default function Dashboard() {
  const { technologies, technologiesIsLoading } = useTechnologies();
  const { projects, projectsIsLoading } = useProjects();

  return (
    <Layout title="Início">
      {technologiesIsLoading && projectsIsLoading ?
        <div className="my-8">
          <Loading />
        </div> : (
          <>
            <div className="flex flex-col gap-4">
              <h1 className="font-medium">Tecnologias</h1>

              {technologies.length === 0 ? <p className="text-sm text-gray-400">Nenhuma tecnologia cadastrada</p> : (
                <div className="grid grid-cols-technologies-auto gap-4">
                  {technologies.map(technology => (
                    <TechnologyCard key={technology.id} technology={technology} />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="font-medium">Projetos</h1>

              {projects.length === 0 ? <p className="text-sm text-gray-400">Nenhum projeto cadastrado</p> : (
                <div className="grid grid-cols-projects-auto gap-4">
                  {projects.map(project => (
                    <ProjectCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
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