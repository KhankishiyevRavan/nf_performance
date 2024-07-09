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
let languageSelector = document.querySelector("#language_selector");

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, get, remove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBFIm8-rrJIMJZDYu3n3LfFl07yEx2d9Yw",
  authDomain: "nfeducationback.firebaseapp.com",
  databaseURL: "https://nfeducationback-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "nfeducationback",
  storageBucket: "nfeducationback.appspot.com",
  messagingSenderId: "988909498509",
  appId: "1:988909498509:web:929e8927f39aacf86a32c4",
  measurementId: "G-D2F640JQFW"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef = ref(database, "/universities/" + id);

function displayData(data, language) {
  universityName.innerText = language === 'en' ? data?.name_en : data?.name;
  universityLocation.innerText = language === 'en' ? `${data.country_en}, ${data.city_en}` : `${data.country}, ${data.city}`;
  universityAbout.innerText = language === 'en' ? data.about_en : data.about;
  universityImg.src = data.image_url;
  universityLogoImg.src = data.logo_url;

  specialtiesTable.innerHTML = ''; // Clear previous data
  let specialties = data.specialties;
  let counter = 1;
  specialties.forEach((specialty) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${counter}</td>
      <td>${language === 'en' ? specialty.speciality_name_en : specialty.speciality_name}</td>
      <td>${specialty.bachelor.full_time_price}</td>
      <td>${specialty.bachelor.correspondence_price}</td>
      <td>${specialty.master.full_time_price}</td>
      <td>${specialty.master.correspondence_price}</td>
    `;
    specialtiesTable.append(tr);
    counter++;
  });

  const documentsContainer = document.getElementById("university_documents");
  documentsContainer.innerHTML = ''; // Clear previous data
  let documents = data.documents;
  documents.forEach((doc) => {
    const documentRow = document.createElement("div");
    documentRow.className = "col-xl-6 col-sm-6";
    documentRow.innerHTML = `
      <div class="mb-3 document">
        <label class="form-label text-primary">Document ${doc.index}<span class="required">*</span></label>
        <input type="text" class="form-control" placeholder="----" disabled value='${language === 'en' ? doc.value_en : doc.value}' name="document" data-index="${doc.index}" />
      </div>
    `;
    documentsContainer.appendChild(documentRow);
  });
}

get(dataRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      displayData(data, languageSelector.value); // Display data in the initially selected language
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error("Error reading data: ", error);
  });

languageSelector.addEventListener("change", (e) => {
  const language = e.target.value;
  get(dataRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        displayData(data, language);
      }
    })
    .catch((error) => {
      console.error("Error reading data: ", error);
    });
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
