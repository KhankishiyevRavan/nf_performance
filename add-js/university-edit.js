let detailsParams = new URLSearchParams(window.location.search);
let id = detailsParams.get("id");
const university_detail_div_inputs = document.querySelectorAll(
  "#univeristy_detail_div input"
);
const university_detail_div_textarea = document.querySelector(
  "#univeristy_detail_div textarea.az"
);
const university_detail_div_textarea_en = document.querySelector(
  "#univeristy_detail_div textarea.en"
);
const specialty = document.querySelector("#add_university_specialty");

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
let documents = [];
get(dataRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const universityData = snapshot.val();
      console.log(universityData);

      [...university_detail_div_inputs].map((input) => {
        input.value = universityData[input.name];
      });
      university_detail_div_textarea.value = universityData.about;
      university_detail_div_textarea_en.value = universityData.about_en;
      // console.log(universityData);
      // var rowsDiv = document.querySelector("#specialty .card-body");

      let rowsFirst = document.querySelector("#specialty .card-body>.row");
      let specialties = universityData?.specialties;
      if (universityData?.documents) {
        documents = universityData?.documents;
      }
      rowsFirst.innerHTML = `<div class="col-xl-6 col-sm-6">
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
              value='${specialties[0].speciality_name}'
            />
          </div>
        </div>
        <div class="col-xl-6 col-sm-6">
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
              name="speciality_name_en"
              value='${specialties[0].speciality_name_en}'
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
                  placeholder='1000$'
                  value='${specialties[0].bachelor?.full_time_price}'
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
                  value='${specialties[0].master?.full_time_price}'
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
                  value='${specialties[0].bachelor?.correspondence_price}'
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
                  value='${specialties[0].master?.correspondence_price}'
                />
              </div>
            </div>
          </div>
        </div>`;
      specialties.slice(1).map((s) => {
        console.log(s);
        let rows = document.querySelectorAll("#specialty .card-body>.row");
        let lastRow = rows[rows.length - 1];
        let newRow = document.createElement("div");
        newRow.style.position = "relative";
        newRow.className = "row";
        newRow.innerHTML = `
        <div class="col-xl-6 col-sm-6">
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
              value='${s?.speciality_name}'
            />
          </div>
        </div>
        <div class="col-xl-6 col-sm-6">
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
              name="speciality_name_en"
              value='${s?.speciality_name_en}'
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
                  placeholder='1000$'
                  value='${s?.bachelor?.full_time_price}'
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
                  value='${s?.master?.full_time_price}'
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
                  value='${s?.bachelor?.correspondence_price}'
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
                  value='${s?.master?.correspondence_price}'
                />
              </div>
            </div>
            <button class="delete-btn">Sil</button>
          </div>
        </div>
        `;
        lastRow.parentNode.insertBefore(newRow, lastRow.nextSibling);
        newRow
          .querySelector(".delete-btn")
          .addEventListener("click", function () {
            console.log("test");
            newRow.remove();
          });
      });
      documents?.map((doc, index) => {
        const documentRow = document.createElement("div");
        documentRow.classList.add("row");
        documentRow.style.position = "relative";
        const documentCol = document.createElement("div");
        documentCol.className = "col-xl-6 col-sm-6";
        documentCol.innerHTML = `
        <div class="mb-3 document">
            <label class="form-label text-primary">Document ${doc.index}<span class="required">*</span></label>
            <input type="text" class="form-control" placeholder="Document" value='${doc.value}' name="document" data-index="${doc.index}" />
            <button type="button" class="btn btn-danger remove_document_btn">Remove</button>
        </div>
    `;
        const documentColEn = document.createElement("div");
        documentColEn.className = "col-xl-5 col-sm-5";
        documentColEn.innerHTML = `
        <div class="mb-3 document">
            <label class="form-label text-primary">Document ${doc.index} En<span class="required">*</span></label>
            <input type="text" class="form-control" placeholder="Document" value='${doc.value_en}' name="document_en" data-index="${doc.index}" />
            
        </div>
    `;
        documentRow.append(documentCol, documentColEn);
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
  var rows = document.querySelectorAll("#specialty .card-body>.row");
  var data = [];

  rows.forEach(function (row) {
    let s_name = row.querySelector('[name="speciality_name"]');
    let s_name_en = row.querySelector('[name="speciality_name_en"]');
    let b_c_p = row.querySelector('[name="b_correspondence_price"]');
    let m_c_p = row.querySelector('[name="m_correspondence_price"]');
    let b_f_p = row.querySelector('[name="b_full_price"]');
    let m_f_p = row.querySelector('[name="m_full_price"]');
    console.log(s_name);
    data.push({
      speciality_name: s_name.value,
      speciality_name_en: s_name_en.value,
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
  universityEditData["specialties"] = [...data];
  universityEditData["documents"] = [...documents];
  console.log(universityEditData);
  update(ref(database, "/universities/" + id), universityEditData)
    .then(() => {
      alert("Data successfully Save");
      //   location.reload();
      window.location = "university-detail.html?id=" + id;
    })
    .catch((error) => {
      alert("Data successfully Save", error);
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
                  <div class="col-xl-6 col-sm-6">
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
                        for="exampleFormControlInput9"
                        class="form-label text-primary"
                        >Ixtisas <span class="required">*</span></label
                      >
                      <input
                        type="text"
                        class="form-control"
                        id="exampleFormControlInput9"
                        placeholder="University of Oxford"
                        name="speciality_name_en"
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
  newRow.querySelector(".delete-btn").addEventListener("click", function () {
    console.log("test");
    newRow.remove();
  });
});
document.querySelectorAll(".delete-btn").forEach(function (button) {
  button.addEventListener("click", function () {
    console.log(button.closest(".row"));
    button.closest(".row").remove();
  });
});

document
  .getElementById("add_document_btn")
  .addEventListener("click", function () {
    let newDocumentIndex = documents.length + 1;

    // Ensure the new index is unique
    while (documents.some((doc) => doc.index === newDocumentIndex)) {
      newDocumentIndex++;
    }
    const documentRow = document.createElement("div");
    documentRow.classList.add("row");
    documentRow.style.position = "relative";
    const documentCol = document.createElement("div");
    documentCol.className = "col-xl-6 col-sm-6";
    documentCol.innerHTML = `
      <div class="mb-3 document">
          <label class="form-label text-primary">Document ${newDocumentIndex}<span class="required">*</span></label>
          <input type="text" class="form-control" placeholder="Document" name="document" data-index="${newDocumentIndex}" />
          <button type="button" class="btn btn-danger remove_document_btn">Remove</button>
      </div>
  `;
    const documentColEn = document.createElement("div");
    documentColEn.className = "col-xl-5 col-sm-5";
    documentColEn.innerHTML = `
      <div class="mb-3 document">
          <label class="form-label text-primary">Document ${newDocumentIndex} En<span class="required">*</span></label>
          <input type="text" class="form-control" placeholder="Document" name="document_en" data-index="${newDocumentIndex}" />
      </div>
  `;
    documentRow.append(documentCol, documentColEn);
    document.getElementById("university_documents").appendChild(documentRow);
    documents.push({ index: newDocumentIndex, value: "", value_en: "" });
  });

document
  .getElementById("university_documents")
  .addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("remove_document_btn")) {
      const input = e.target.closest(".document").querySelector("input");
      const index = parseInt(input.getAttribute("data-index"), 10);
      documents = documents.filter((doc) => doc.index !== index);
      e.target.closest(".row").remove();

      // Re-index documents to ensure unique, sequential indexes
      let newIndex = 1;
      documents.forEach((doc) => {
        doc.index = newIndex++;
      });

      // Update the labels and data-index attributes
      const documentLabels = document.querySelectorAll(
        "#university_documents  .col-xl-6.col-sm-6 .document label"
      );
      documentLabels.forEach((label, idx) => {
        label.textContent = `Document ${idx + 1}`;
        label
          .closest(".row")
          .querySelector(".col-xl-5.col-sm-5 label").textContent = `Document ${
          idx + 1
        }`;
        const input = label.parentElement.querySelector("input");
        input.setAttribute("data-index", idx + 1);
        label
          .closest(".row")
          .querySelector(".col-xl-5.col-sm-5 input")
          .setAttribute("data-index", idx + 1);
      });
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
    if (e.target && e.target.name === "document_en") {
      const index = parseInt(e.target.getAttribute("data-index"), 10);
      const document = documents.find((doc) => doc.index === index);
      if (document) {
        document.value_en = e.target.value;
      }
    }
  });
