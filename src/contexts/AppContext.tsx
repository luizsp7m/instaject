import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { Technology } from "../types";

interface AppContextData {
  addTechnologyToList: (technology: Technology) => void;
  technologyList: Array<Technology>;
}

interface AppProviderProps {
  children: ReactNode;
}

export const AppContext = createContext({} as AppContextData);

export function AppProvider({ children }: AppProviderProps) {
  const [technologyList, setTechnologyList] = useState<Technology[]>([]);

  const Router = useRouter();

  useEffect(() => {
    if (Router.asPath !== "/technologies") {
      setTechnologyList([]);
    }
  }, [Router]);

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

  return (
    <AppContext.Provider value={{
      addTechnologyToList,
      technologyList,
    }}>
      {children}
    </AppContext.Provider>
  )
}