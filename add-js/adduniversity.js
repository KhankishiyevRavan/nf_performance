import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const btn = document.querySelector("#save_univeristy_data");
const specialty = document.querySelector("#add_university_specialty");
import {
  getDatabase,
  ref,
  get,
  set,
  push,
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
const auth = getAuth(app);
const dataRef = ref(database, "/universities");
const universityData = {};
let documents = [];

get(dataRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error("Error reading data: ", error);
  });
const university_detail_div_inputs = document.querySelectorAll(
  "#univeristy_detail_div input"
);
const university_detail_div_textarea = document.querySelector(
  "#univeristy_detail_div textarea"
);
[...university_detail_div_inputs].map((input) => {
  input.addEventListener("input", () => {
    universityData[input.name] = input.value;
    console.log(universityData);
  });
});
university_detail_div_textarea.addEventListener("input", (e) => {
  universityData["about"] = e.target.value;
  console.log(universityData);
});
btn.addEventListener("click", (e) => {
  e.preventDefault();
  var objKey = push(dataRef).key;
  var rows = document.querySelectorAll("#specialty .card-body>.row");
  var data = [];

  rows.forEach(function (row) {
    let s_name = row.querySelector('[name="speciality_name"]');
    let b_c_p = row.querySelector('[name="b_correspondence_price"]');
    let m_c_p = row.querySelector('[name="m_correspondence_price"]');
    let b_f_p = row.querySelector('[name="b_full_price"]');
    let m_f_p = row.querySelector('[name="m_full_price"]');
    console.log(s_name);
    data.push({
      speciality_name: s_name.value,
      bachelor: {
        correspondence_price: b_c_p.value,
        full_time_price: b_f_p.value,
      },
      master: {
        correspondence_price: m_c_p.value,
        full_time_price: m_f_p.value,
      },
    });
  });
  universityData["specialties"] = [...data];
  universityData["documents"] = [...documents];
  onAuthStateChanged(auth, (user) => {
    if (user) {
      set(ref(database, "/universities/" + objKey), universityData)
        .then(() => {
          console.log("Data successfully written!");
          alert("Data successfully written!");
          window.location = `universities.html`;
        })
        .catch((error) => {
          console.error("Error writing data: ", error);
          alert("Error writing data: ", error);
          window.location = `universities.html`;
        }); 
    }else {
      alert("User not authenticated");
      window.location.href = 'page-login.html'; // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    }
  });
});
specialty.addEventListener("click", function () {
  var rows = document.querySelectorAll("#specialty .card-body>.row");
  var lastRow = rows[rows.length - 1];

  if (!lastRow) {
    console.error("No row elements found");
    return;
  }

  var newRow = document.createElement("div");
  newRow.style.position = "relative";
  newRow.className = "row";
  newRow.innerHTML = `
                  <div class="col-xl-12 col-sm-12">
                    <div class="mb-3">
                      <label
                        for="exampleFormControlInput9"
                        class="form-label text-primary"
                        >Ixtisas <span class="required">*</span></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput9"
                        placeholder="University of Oxford"
                        name="speciality_name"
                      />
                    </div>
                  </div>
                  <div class="col-xl-6 col-sm-6">
                    <div class="mb-3">
                      <label
                        for="exampleFormControlInput11"
                        class="form-label text-primary"
                        >Education type <span class="required">*</span></label
                      >
                      <h5>Əyani</h5>
                    </div>
                    <div class="row">
                      <div class="col-xl-12 col-sm-12">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput15"
                            class="form-label text-primary"
                            >Bachelor price<span class="required">*</span></label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput15"
                            placeholder="1000$"
                            name="b_full_price"

                          />
                        </div>

                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput13"
                            class="form-label text-primary"
                            >Master price<span class="required">*</span></label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput13"
                            placeholder="1000$"
                            name="m_full_price"

                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-xl-6 col-sm-6">
                    <div class="mb-3">
                      <label
                        for="exampleFormControlInput11"
                        class="form-label text-primary"
                        ><span class="required">
                          &nbsp;
                        </span></label
                      >
                    
                      <h5>Qiyabi</h5>
                    </div>
                    <div class="row">
                      <div class="col-xl-12 col-sm-12">
                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput16"
                            class="form-label text-primary"
                            >Bachelor price<span class="required">*</span></label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput16"
                            placeholder="1000$"
                            name="b_correspondence_price"
                          />
                        </div>

                        <div class="mb-3">
                          <label
                            for="exampleFormControlInput14"
                            class="form-label text-primary"
                            >Master price<span class="required">*</span></label
                          >
                          <input
                            type="text"
                            class="form-control"
                            id="exampleFormControlInput14"
                            placeholder="1000$"
                            name="m_correspondence_price"

                          />
                        </div>
                      </div>
                      <button class="delete-btn">Sil</button>
                    </div>
                  </div>
    `;

  lastRow.parentNode.insertBefore(newRow, lastRow.nextSibling);

  // Yeni eklenen silme butonuna olay ekleyelim
  newRow
    .querySelector("#specialty.delete-btn")
    .addEventListener("click", function () {
      newRow.remove();
    });
});

// Mevcut silme butonuna olay ekleyelim
document.querySelectorAll("#specialty .delete-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    button.closest(".row").remove();
  });
});

document
  .getElementById("add_document_btn")
  .addEventListener("click", function () {
    const newDocumentIndex = documents.length + 1;
    const documentRow = document.createElement("div");
    documentRow.className = "col-xl-6 col-sm-6";
    documentRow.innerHTML = `
        <div class="mb-3 document">
            <label class="form-label text-primary">Document ${newDocumentIndex}<span class="required">*</span></label>
            <input type="text" class="form-control" placeholder="Document" name="document" data-index="${newDocumentIndex}" />
            <button type="button" class="btn btn-danger remove_document_btn">Remove</button>
        </div>
    `;
    document.getElementById("university_documents").appendChild(documentRow);
    documents.push({ index: newDocumentIndex, value: "" });
    updateDocumentLabels();
  });

document
  .getElementById("university_documents")
  .addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("remove_document_btn")) {
      const input = e.target.closest(".document").querySelector("input");
      const index = parseInt(input.getAttribute("data-index"), 10);
      documents = documents.filter((doc) => doc.index !== index);
      e.target.closest(".col-xl-6").remove();
      updateDocumentLabels();
    }
  });

document
  .getElementById("university_documents")
  .addEventListener("input", function (e) {
    if (e.target && e.target.name === "document") {
      const index = parseInt(e.target.getAttribute("data-index"), 10);
      const document = documents.find((doc) => doc.index === index);
      if (document) {
        document.value = e.target.value;
      }
    }
  });

function updateDocumentLabels() {
  const documentLabels = document.querySelectorAll(
    "#university_documents .document label"
  );
  documentLabels.forEach((label, index) => {
    label.textContent = `Document ${index + 1}`;
    const input = label.parentElement.querySelector("input");
    input.setAttribute("data-index", index + 1);
    const document = documents.find(
      (doc) => doc.index === parseInt(input.getAttribute("data-index"), 10)
    );
    if (document) {
      document.index = index + 1;
    }
  });
  logDocuments();
}

// Optional: Function to log the documents array for debugging
function logDocuments() {
  console.log(documents);
}
