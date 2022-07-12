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

interface Props {
  project: Project;
}

export function ProjectPost({ project }: Props) {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);

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

      <div className="h-[598px] bg-grayish-700 rounded-sm overflow-hidden grid grid-cols-[2fr_1fr]">
        <div className="relative">
          <img
            src={project.image}
            alt=""
            className="w-full h-full object-cover"
          />

          <Link href={project.image} passHref>
            <a target="_blank" className="absolute top-4 right-4 h-10 w-10 bg-[rgba(0,0,0,0.5)] hover:bg-[rgba(0,0,0,0.4)] rounded-full flex items-center justify-center">
              <FiExternalLink
                size={20}
              />
            </a>
          </Link>
        </div>

        <div className="flex flex-col relative">
          <ProjectPublisher user={project.user} />

          <div className="h-[413px] overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thumb-zinc-700 scrollbar-track-transparent scrollbar-thin">
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