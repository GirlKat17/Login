import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set, update } from 'firebase/database';

// Initialize Firebase
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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app); 

function RegisterLoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [favoriteSong, setFavoriteSong] = useState('');
  const [milkBeforeCereal, setMilkBeforeCereal] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = () => {
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
  };

  const handleLogin = () => {
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

  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  const validateEmail = (email) => {
    const expression = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return expression.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateField = (field) => {
    return field && field.trim().length > 0;
  };

  return (
    <div>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {isRegistering && (
        <>
          <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <input type="text" placeholder="Favorite Song" value={favoriteSong} onChange={(e) => setFavoriteSong(e.target.value)} />
          <input type="text" placeholder="Milk Before Cereal" value={milkBeforeCereal} onChange={(e) => setMilkBeforeCereal(e.target.value)} />
        </>
      )}
      <button onClick={isRegistering ? handleRegister : handleLogin}>
        {isRegistering ? 'Register' : 'Login'}
      </button>
      <button onClick={toggleMode}>
        {isRegistering ? 'Switch to Login' : 'Switch to Register'}
      </button>
    </div>
  );
}

export default RegisterLoginForm;



document.addEventListener('DOMContentLoaded', function() {
  const LoginBox = document.querySelector('.loging-box');
  const loginLink = document.querySelector('.login-link');
  const registerLink = document.querySelector('.register-link');

  registerLink.addEventListener('click', () => {
      // Added check to prevent adding 'active' class multiple times
      if (!LoginBox.classList.contains('active')) {
          LoginBox.classList.add('active');
      }
  });

  loginLink.addEventListener('click', () => {
      // Added check to prevent removing 'active' class if it's not present
      if (LoginBox.classList.contains('active')) {
          LoginBox.classList.remove('active');
      }
  });
});



