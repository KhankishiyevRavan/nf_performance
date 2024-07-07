let detailsParams = new URLSearchParams(window.location.search);
let id = detailsParams.get("id");
let universityName = document.querySelector("#university_name");
let universityLocation = document.querySelector("#university_location");
let universityAbout = document.querySelector("#university_about");
let universityImg = document.querySelector("#university_image");
let specialtiesTable = document.querySelector("#example3");
let editUniversityBtn = document.querySelector("#edit_university_btn");
let delUniversityBtn = document.querySelector("#delete_university_btn");
let universityLogoImg = document.querySelector("#logo_url");
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
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
      universityName.innerText = data?.name;
      universityLocation.innerText = `${data.country}, ${data.city}`;
      universityAbout.innerText = data.about;
      universityImg.src = data.image_url;
      universityLogoImg.src = data.logo_url;
      let specialties = data.specialties;
      let documents = data.documents;
      let counter = 1;
      specialties.map((specialty) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
					  <td>${counter}</td>
						<td>${specialty.speciality_name}</td>
						<td>${specialty.bachelor.full_time_price}</td>
						<td>${specialty.bachelor.correspondence_price}</td>
						<td>${specialty.master.full_time_price}</td>
						<td>${specialty.master.correspondence_price}</td>
            `;
        specialtiesTable.append(tr);
        counter++;
      });
      documents.map((doc,index) => {
        const documentRow = document.createElement("div");
        documentRow.className = "col-xl-6 col-sm-6";
        documentRow.innerHTML = `
        <div class="mb-3 document">
            <label class="form-label text-primary">Document ${doc.index}<span class="required">*</span></label>
            <input type="text" class="form-control" placeholder="Document" disabled value=${doc.value} name="document" data-index="${doc.index}" />
        </div>
    `;
        document
          .getElementById("university_documents")
          .appendChild(documentRow);
      });
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error("Error reading data: ", error);
  });
editUniversityBtn.addEventListener("click", () => {
  window.location = `university-edit.html?id=${id}`;
});
delUniversityBtn.addEventListener("click", (e) => deleteUniversity(e));
const deleteUniversity = (e) => {
  e.preventDefault();
  const itemKey = id;
  if (itemKey) {
    remove(ref(database, "/universities/" + itemKey))
      .then(() => {
        console.log("Data successfully deleted!");
        alert("Data successfully deleted!");
        window.location = `universities.html`;
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
        alert("Error deleting data: " + error);
        window.location = `universities.html`;
      });
  } else {
    alert("Silmek için geçerli bir anahtar girin.");
  }
};
