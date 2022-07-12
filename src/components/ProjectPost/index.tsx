import Link from "next/link";

import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database } from "../../lib/firebase";
import { Comment, Favorite, Project } from "../../types";
import { BackButton } from "../BackButton";
import { Comments } from "../Comments";
import { InteractionButtons } from "../ProjectCard/InteractionButtons";
import { InputComment } from "./InputComment";
import { ProjectPublisher } from "./ProjectPublisher";
import { FiExternalLink } from "react-icons/fi";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  project: Project;
}

export function ProjectPost({ project }: Props) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

  const dateFormatted = formatDistance(new Date(project.created_at), new Date(), {
    addSuffix: true,
    locale: ptBR,
  });

  useEffect(() => {
    const docRef = collection(database, "projects", `${project.id}`, "favorites");

    const unsubscribe = onSnapshot(docRef, snapshot => {
      setFavorites(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Favorite)));
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const docRef = collection(database, "projects", `${project.id}`, "comments");

    const q = query(docRef, orderBy("created_at", "desc"));

    const unsubscribe = onSnapshot(q, snapshot => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment)));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <BackButton />

      <div className="md:h-[598px] bg-grayish-700 rounded-sm overflow-hidden md:grid md:grid-cols-[2fr_1fr]">
        <div className="relative bg-slate-700">
          <img
            src={project.image}
            alt=""
            className="w-full h-[320px] md:h-full object-contain"
          />

          <Link href={project.image} passHref>
            <a target="_blank" className="absolute top-4 right-4 h-10 w-10 bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.4)] rounded-full flex items-center justify-center">
              <FiExternalLink
                size={20}
              />
            </a>
          </Link>
        </div>

        <div className="flex flex-col relative border-l-[0.05rem] border-l-gray-700">
          <ProjectPublisher user={project.user} />

          <div className="md:h-[413px] h-[280px] overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin">
            <div>
              <div className="flex gap-3 items-start group">
                <img
                  src={project.user.image}
                  alt=""
                  className="h-8 w-8 object-cover rounded-full"
                />

                <div className="flex flex-col gap-1 flex-1">
                  <Link href={`/profile/${project.user.email}`} passHref>
                    <a className="text-sm font-medium text-gray-400 hover:underline">
                      {project.user.name}
                    </a>
                  </Link>

                  <p className="text-sm text-gray-300">
                    {project.description}
                  </p>

                  <div className="text-gray-300 text-xs flex gap-3">
                    <a
                      href={project.repository}
                      target="_blank"
                      className="hover:underline hover:text-sky-400"
                    >
                      Repositório
                    </a>

                    {project.repository && (
                      <a
                        href={project.deploy}
                        target="_blank"
                        className="hover:underline hover:text-sky-400"
                      >
                        Projeto online
                      </a>
                    )}
                  </div>

                  <time className="text-[12px] text-gray-300">
                    {dateFormatted}
                  </time>
                </div>
              </div>
            </div>

            <Comments comments={comments} projectId={project.id} />
          </div>

          <div className="p-4 border-t-[0.05rem] border-t-gray-700">
            <InteractionButtons
              projectId={project.id}
              favorites={favorites}
              comments={comments}
            />
          </div>

          <InputComment projectId={project.id} />
        </div>
      </div>
    </div>
  );
}