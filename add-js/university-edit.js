let detailsParams = new URLSearchParams(window.location.search);
let id = detailsParams.get("id");
const university_detail_div_inputs = document.querySelectorAll(
  "#univeristy_detail_div input"
);
const university_detail_div_textarea = document.querySelector(
  "#univeristy_detail_div textarea"
);
const saveUniveristyData = document.querySelector("#save_university_btn");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// Your web app's Firebase configuration
import {
  getDatabase,
  ref,
  get,
  remove,
  update,
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
const universityEditData = {};
get(dataRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const universityData = snapshot.val();
      console.log(universityData);

      [...university_detail_div_inputs].map((input) => {
        input.value = universityData[input.name];
      });
      university_detail_div_textarea.value = universityData.about;
      console.log(universityData);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error("Error reading data: ", error);
  });
university_detail_div_textarea.addEventListener("input", (e) => {
  universityEditData.about = e.target.value;
  console.log(universityEditData);
});
[...university_detail_div_inputs].map((input) => {
  input.addEventListener("input", () => {
    universityEditData[input.name] = input.value;
    console.log(universityEditData);
  });
});
saveUniveristyData.addEventListener("click", (e) => {
  console.log(e.target);

  update(ref(database, "/universities/" + id), universityEditData)
    .then(() => {
      alert("Data successfully Save");
      //   location.reload();
      window.location = "university-detail.html?id="+id;
    })
    .catch((error) => {
      alert("Data successfully Save", error);
    });
});
// const changeData = (e) => {
//   console.log(e.target);

//   update(ref(database, "/universities/" + dataKey), newData)
//     .then(() => {
//       alert("Data successfully Save");
//       //   location.reload();
//       window.location = "universities.html";
//     })
//     .catch((error) => {
//       alert("Data successfully Save", error);
//     });
// };
