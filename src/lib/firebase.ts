import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { collection, getDocs, getFirestore } from "firebase/firestore";

var firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databaseURL: "https://instaject-b2bbd-default-rtdb.firebaseio.com/",
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

const db = getFirestore(app);

const projectCollectionRef = collection(db, "projects");

interface GetProjectsResponse {
  id: string;
  data: {
    name: string;
  }
}

getDocs(projectCollectionRef)
.then(response => {
  const projects = response.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
  }));

  console.log(projects);
})
.catch(error => console.log("Houve um erro"));