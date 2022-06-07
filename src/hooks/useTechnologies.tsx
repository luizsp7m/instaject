import { useContext } from "react";
import { TechnologiesContext } from "../contexts/TechnologiesContext";

export function useTechnologies() {
  return useContext(TechnologiesContext);
}