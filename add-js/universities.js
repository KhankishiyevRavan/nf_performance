import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
// import { getDatabase } from "firebase/database";
// Your web app's Firebase configuration
// const university_detail_info = document.querySelector("")
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
const universities_table = document.querySelector("#universities_table tbody");
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const dataRef = ref(database, "/universities");
get(dataRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log(data);
      let counter = 0;
      for (let universityId in data) {
        let university = data[universityId];
        // console.log(university);
        counter++;
        let tr = document.createElement("tr");
        tr.setAttribute("itemKey", universityId);
        tr.innerHTML = `
        <tr>
					<th>${counter}</th>
					<td>
            <div class="d-flex align-items-center">
              <img src=${university?.logo_url} class="rounded-lg me-2" width="24" alt="">
                <a class="w-space-no" style='cursor:pointer;' href="university-detail.html?id=${universityId}">
                  ${university?.name}
                </a>
            </div>
          </td>
					<td>
            <span class="badge badge-primary light">${university?.country}</span>
		      </td>
					<td>${university?.city}</td>
					<td class="color-primary">${university?.specialties?.length}</td>
          <td>
            <div class="d-flex">
              <a href="#" class="btn btn-primary shadow btn-xs sharp me-1"><i class="fa fa-pencil"></i></a>
              <a href="#" class="btn btn-danger shadow btn-xs sharp"><i class="fa fa-trash"></i></a>
            </div>
          </td>
				</tr>`;
        universities_table.append(tr);
      }
      let deleteBtns = universities_table.querySelectorAll(
        ".btn.btn-danger.shadow.btn-xs.sharp"
      );
      [...deleteBtns].map((btn) =>
        btn.addEventListener("click", deleteUniversity)
      );
      //   console.log();
    } else {
      console.log("No data available");
    }
  })
  .catch((error) => {
    console.error("Error reading data: ", error);
  });

const deleteUniversity = (e) => {
  e.preventDefault();
  console.log(e.target.closest("tr"));
  const itemKey = e.target.closest("tr").getAttribute("itemKey");
  console.log(itemKey);
  if (itemKey) {
    remove(ref(database, "/universities/" + itemKey))
      .then(() => {
        console.log("Data successfully deleted!");
        alert("Data successfully deleted!");
        location.reload();
      })
      .catch((error) => {
        console.error("Error deleting data: ", error);
        alert("Error deleting data: " + error);
        location.reload();
      });
  } else {
    alert("Silmek için geçerli bir anahtar girin.");
  }
};
