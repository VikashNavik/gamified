// ===== Import Firebase core + Auth module from CDN =====
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

// ===== Your Firebase Config =====
const firebaseConfig = {
  apiKey: "AIzaSyAxKkJqDUwXYkNpbmwsiVhh9m2SSdfordI",
  authDomain: "gamified-aut.firebaseapp.com",
  projectId: "gamified-aut",
  storageBucket: "gamified-aut.appspot.com",
  messagingSenderId: "379085065815",
  appId: "1:379085065815:web:f65123e48721b0967c9d12",
  measurementId: "G-X0RLME6KG7"
};

// ===== Initialize Firebase =====
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// ===== Reference to HTML Elements =====
const signUpForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");
const logoutBtn = document.getElementById("logout-btn");
const userDisplay = document.getElementById("user-display");

// ===== Sign Up =====
signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Stop page reload

  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("✅ Account created successfully!");
    signUpForm.reset();
  } catch (error) {
    alert(`Error: ${error.message}`);
    console.error(error);
  }
});

// ===== Login =====
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Stop page reload

  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("✅ Logged in successfully!");
    loginForm.reset();

    // Redirect once safely
    if (!sessionStorage.getItem("loggedIn")) {
      sessionStorage.setItem("loggedIn", "true");
      window.location.href = "index.html";
    }
  } catch (error) {
    alert(`Error: ${error.message}`);
    console.error(error);
  }
});

// ===== Logout =====
logoutBtn.addEventListener("click", async () => {
  try {
    await signOut(auth);
    alert("👋 Logged out!");
    sessionStorage.removeItem("loggedIn");
  } catch (error) {
    alert(`Error: ${error.message}`);
    console.error(error);
  }
});

// ===== Listen for User State Changes =====
onAuthStateChanged(auth, (user) => {
  if (user) {
    userDisplay.textContent = `Logged in as: ${user.email}`;
  } else {
    userDisplay.textContent = "No user logged in";
  }
});
