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

const email = document.querySelector("input[type=email]");

const password = document.querySelector("input[type=password]");

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth();

console.log(email);
console.log(password);

const btn = document.querySelector("#login");

function login(e) {
  e.preventDefault();
  var obj = {
    email: email.value,
    password: password.value,
  };
  console.log(obj);
  signInWithEmailAndPassword(auth, obj.email, obj.password)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

btn.addEventListener("click", login);


