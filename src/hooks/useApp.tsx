import { useContext } from "react";
import { TechnologiesContext } from "../contexts/TechnologiesContext";

export function useApp() {
  return useContext(TechnologiesContext);
}