import { format } from "date-fns";
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { createContext, ReactNode, useEffect, useState } from "react";
import { TechnologyInputs } from "../components/Form/TechnologyForm";
import { database } from "../lib/firebase";
import { Technology } from "../types";

interface TechnologiesContextData {
  technologies: Array<Technology>;
  technologiesIsLoading: boolean;
  createTechnology: (data: TechnologyInputs) => Promise<void>;
  updateTechnology: (data: TechnologyInputs, technologyId: string) => Promise<void>;
  removeTechnology: (technologyId: string) => Promise<void>;
}

interface TechnologiesProviderProps {
  children: ReactNode;
}

export const TechnologiesContext = createContext({} as TechnologiesContextData);

export function TechnologiesProvider({ children }: TechnologiesProviderProps) {
  const { data: session } = useSession();

  const [technologies, setTechnologies] = useState<Technology[]>([]);
  const [technologiesIsLoading, setTechnologiesIsLoading] = useState(true);

  async function getTechnologies() {
    const q = query(
      collection(database, "technologies"),
      where("email", "==", session?.user?.email),
      orderBy("last_update", "desc")
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setTechnologiesIsLoading(true);

      const arrayDocs: Array<Technology> = [];

      querySnapshot.forEach(doc => {
        arrayDocs.push({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          image: doc.data().image,
          created_at: format(new Date(doc.data().created_at), "dd/MM/yyyy - HH:mm"),
          last_update: format(new Date(doc.data().last_update), "dd/MM/yyyy - HH:mm"),
        });
      });

      setTechnologies(arrayDocs);
      setTechnologiesIsLoading(false);
    });

    return () => unsubscribe();
  }

  async function createTechnology(data: TechnologyInputs) {
    await addDoc(collection(database, "technologies"), {
      ...data,
      email: session?.user?.email,
      created_at: new Date().toISOString(),
      last_update: new Date().toISOString(),
    });
  }

  async function updateTechnology(data: TechnologyInputs, technologyId: string) {
    await updateDoc(doc(database, "technologies", technologyId), {
      ...data,
      last_update: new Date().toISOString(),
    });
  }

  async function removeTechnology(technologyId: string) {
    await deleteDoc(doc(database, "technologies", technologyId));
  }

  useEffect(() => {
    if (session?.user) {
      getTechnologies();
    }
  }, [session]);

  return (
    <TechnologiesContext.Provider value={{
      technologies,
      technologiesIsLoading,
      createTechnology,
      updateTechnology,
      removeTechnology,
    }}>
      {children}
    </TechnologiesContext.Provider>
  )
}