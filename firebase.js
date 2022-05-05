import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCOTHeRQtARcXK7gu-AO5_pb2NMNMhPJTE",
  authDomain: "paw-pack-872f4.firebaseapp.com",
  databaseURL: "https://paw-pack-872f4-default-rtdb.firebaseio.com",
  projectId: "paw-pack-872f4",
  storageBucket: "paw-pack-872f4.appspot.com",
  messagingSenderId: "875611849576",
  appId: "1:875611849576:web:65ca1338874f7a0ea20cdd",
  measurementId: "G-YV14EMCZWB"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Export the database for components to use
export default database;