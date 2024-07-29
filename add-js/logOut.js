import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";

import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-analytics.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
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
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth();
const btn = document.querySelector("#logout");

function logout() {
  signOut(auth)
    .then(() => {
      console.log("Kullanıcı oturumu kapatıldı.");
      // Oturum kapatma başarılı olduğunda login sayfasına yönlendirin
      window.location.href = "page-login.html";
    })
    .catch((error) => {
      console.error("Oturum kapatma hatası:", error);
    });
}

btn.addEventListener("click", logout);