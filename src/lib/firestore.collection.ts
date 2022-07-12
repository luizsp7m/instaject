import { collection } from "firebase/firestore";
import { database } from "./firebase";

export const projectCollectionRef = collection(database, "projects");