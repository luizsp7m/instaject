import { format } from "date-fns";
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import { database } from "../lib/firebase";
import { Technology } from "../types";

interface TechnologiesContextData {
  addTechnologyToList: (technology: Technology) => void;
  setTechnologyList: Dispatch<SetStateAction<Technology[]>>
  technologyList: Array<Technology>;
  technologies: Array<Technology>;
}

interface TechnologiesProviderProps {
  children: ReactNode;
}

export const TechnologiesContext = createContext({} as TechnologiesContextData);

export function TechnologiesProvider({ children }: TechnologiesProviderProps) {
  const { data: session } = useSession();

  const [technologies, setTechnologies] = useState<Technology[]>([]); // Lista do banco de dados
  const [technologyList, setTechnologyList] = useState<Technology[]>([]); // Lista de selecionadas pelo usuário

  const Router = useRouter();

  function addTechnologyToList(technology: Technology) {
    const updateTechnologyList = [...technologyList];
    const exists = updateTechnologyList.find(item => item.id === technology.id);

    if (!exists) {
      updateTechnologyList.push(technology);
    } else {
      const technologyIndex = updateTechnologyList.findIndex(item => item.id === technology.id);
      updateTechnologyList.splice(technologyIndex, 1);
    }

    setTechnologyList(updateTechnologyList);
  }

  async function getTechnologies() {
    const q = query(
      collection(database, "technologies"),
      where("email", "==", session?.user?.email),
      orderBy("created_at", "desc")
    );

    const unsubscribe = onSnapshot(q, querySnapshot => {
      const arrayDocs: Array<Technology> = [];
      querySnapshot.forEach(doc => {
        arrayDocs.push({
          id: doc.id,
          email: doc.data().email,
          name: doc.data().name,
          imageUrl: doc.data().imageUrl,
          created_at: format(new Date(doc.data().created_at), "dd/MM/yyyy - HH:mm"),
        });
      });

      setTechnologies(arrayDocs);
    });

    return () => unsubscribe();
  }

  useEffect(() => {
    if (Router.asPath !== "/technologies") {
      setTechnologyList([]);
    }
  }, [Router]);

  useEffect(() => {
    if (session) {
      getTechnologies();
    }
  }, [session]);

  return (
    <TechnologiesContext.Provider value={{
      addTechnologyToList,
      setTechnologyList,
      technologyList,
      technologies,
    }}>
      {children}
    </TechnologiesContext.Provider>
  )
}