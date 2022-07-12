import { collection, onSnapshot } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { database } from "../../lib/firebase";
import { Comment, Favorite, Project } from "../../types";
import { ProjectBody } from "./ProjectBody";
import { ProjectHeader } from "./ProjectHeader";
import { ProjectImage } from "./ProjectImage";
import { UpdateButton } from "./UpdateButton";

interface Props {
  project: Project;
}

export function ProjectCard({ project }: Props) {
  const { data: session } = useSession();

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

    const unsubscribe = onSnapshot(docRef, snapshot => {
      setComments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Comment)));
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="bg-grayish-700 rounded relative group">
      <ProjectHeader
        image={project.user.image}
        username={project.user.name}
        email={project.user.email}
      />

      <ProjectImage
        image={project.image}
        projectId={project.id}
      />

      <ProjectBody
        id={project.id}
        name={project.name}
        description={project.description}
        repository={project.repository}
        favorites={favorites}
        comments={comments}
      />

      {session?.user?.email === project.user.email && (
        <UpdateButton
          id={project.id}
        />
      )}
    </div>
  );
}