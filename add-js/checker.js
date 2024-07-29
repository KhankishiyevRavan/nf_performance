import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
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
const auth = getAuth(app);

// Kullanıcı giriş durumu kontrolü
onAuthStateChanged(auth, (user) => {
  console.log(user);
  if (!user) {
    // Kullanıcı giriş yapmamışsa, login sayfasına yönlendir
    if (window.location.pathname !== "/page-login.html") {
      window.location.href = "/page-login.html";
    }
  } else {
    // Kullanıcı giriş yapmışsa ve login sayfasındaysa, ana sayfaya yönlendir
    if (window.location.pathname === "/page-login.html") {
      window.location.href = "/universities.html";
    }
  }
});
