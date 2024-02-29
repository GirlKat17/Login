// let users = []; // Array to store registered users

// document.getElementById('login-form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission

//     // Get input values
//     var username = document.getElementById('login-username').value;
//     var password = document.getElementById('login-password').value;

//     // Check credentials
//     let foundUser = users.find(user => user.username === username && user.password === password);
//     if (foundUser) {
//         // Successful login
//         alert('Login successful!');
//         // Redirect to another page or perform additional actions
//     } else {
//         // Failed login
//         document.getElementById('login-error-message').innerText = 'Invalid username or password';
//     }
// });

// document.getElementById('register-form').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form submission

//     // Get input values
//     var username = document.getElementById('register-username').value;
//     var password = document.getElementById('register-password').value;

//     // Check if username already exists
//     let existingUser = users.find(user => user.username === username);
//     if (existingUser) {
//         document.getElementById('register-error-message').innerText = 'Username already exists';
//     } else {
//         // Add new user to the users array
//         users.push({ username, password });
//         alert('Registration successful! You can now login.');
//         // Clear the register form
//         document.getElementById('register-form').reset();
//         // Clear any previous error message
//         document.getElementById('register-error-message').innerText = '';
//     }
// });


// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, set, update } from "firebase/database";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBEdh-Hj-dVZOw7wV2hPLvaBkRr0zUkhCE",
  authDomain: "podcast-29894.firebaseapp.com",
  databaseURL: "https://podcast-29894-default-rtdb.firebaseio.com",
  projectId: "podcast-29894",
  storageBucket: "podcast-29894.appspot.com",
  messagingSenderId: "1094937902023",
  appId: "1:1094937902023:web:ea490a3a3c7f0f714937e2",
  measurementId: "G-KC4KDNE4K8"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

function register() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const full_name = document.getElementById('full_name').value;
  const favourite_song = document.getElementById('favourite_song').value;
  const milk_before_cereal = document.getElementById('milk_before_cereal').value;

  // Validation code

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const database_ref = ref(database);
      const user_data = {
        email: email,
        full_name: full_name,
        favourite_song: favourite_song,
        milk_before_cereal: milk_before_cereal,
        last_login: Date.now()
      };
      set(ref(database, 'user/' + user.uid), user_data);
      alert('User Created');
    })
    .catch(error => {
      const error_message = error.message;
      alert(error_message);
    });
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Validation code

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      const user = auth.currentUser;
      const database_ref = ref(database);
      const user_data = {
        last_login: Date.now()
      };
      update(ref(database, 'user/' + user.uid), user_data);
      alert('User logged in');
    })
    .catch(error => {
      const error_message = error.message;
      alert(error_message);
    });
}

function validate_email(email) {
  const expression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return expression.test(email);
}

function validate_password(password) {
  return password.length >= 6;
}

function validate_field(field) {
  return field && field.trim().length > 0;
}

