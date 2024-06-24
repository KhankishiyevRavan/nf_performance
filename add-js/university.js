let detailsParams = new URLSearchParams(window.location.search);
let id = detailsParams.get("id");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
import {
  getDatabase,
  ref,
  get,
  remove,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
const firebaseConfig = {
  apiKey: "AIzaSyBFIm8-rrJIMJZDYu3n3LfFl07yEx2d9Yw",
  authDomain: "nfeducationback.firebaseapp.com",
  databaseURL:
    "https://nfeducationback-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nfeducationback",
  storageBucket: "nfeducationback.appspot.com",
  messagingSenderId: "988909498509",
  appId: "1:988909498509:web:929e8927f39aacf86a32c4",
  measurementId: "G-D2F640JQFW",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef = ref(database, "/universities/" + id);
get(dataRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);
    //   for (let universityId in data) {
    //     let university = data[universityId];
    //     // console.log(university);
        
    //   }
      
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error("Error reading data: ", error);
  });

