import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDlQw1BT1eoOIdk_AvY4r7J5oWFhjYiFK8",
  authDomain: "to-do-app-f2a69.firebaseapp.com",
  databaseURL: "https://to-do-app-f2a69-default-rtdb.firebaseio.com",
  projectId: "to-do-app-f2a69",
  storageBucket: "to-do-app-f2a69.appspot.com",
  messagingSenderId: "829328079728",
  appId: "1:829328079728:web:3b61909de9097dd7e9adb5",
  measurementId: "G-J55W09K9Z8"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
// Login inputs
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const submitButton = document.getElementById("submit");


  


// Register Inputs

const signupEmailIn = document.getElementById("email-signup");
const confirmSignupEmailIn = document.getElementById("confirm-email-signup");
const signupPasswordIn = document.getElementById("password-signup");
const confirmSignupPasswordIn = document.getElementById(
  "confirm-password-signup");

 const signupButton = document.getElementById("sign-up");
  const returnBtn = document.getElementById("return-btn");
  const createacctSection = document.getElementById("create-acct");
  const main = document.getElementById("main");

  signupButton.addEventListener("click", () => {
    main.style.display = "none";
    createacctSection.style.display = "block";
  });
  
  let email,
  password,
  signupEmail,
  signupPassword,
  confirmSignupEmail,
  confirmSignUpPassword
  
  
  
const createAcctBtn = document.getElementById("create-acct");

createAcctBtn.addEventListener("click", () => {
  var isVerified = true;

  signupEmail = signupEmailIn.value;
  confirmSignupEmail = confirmSignupEmailIn.value;
  if (signupEmail != confirmSignupEmail) {
    window.alert("Emails do not match");
    isVerified = false;
  }

  signupPassword = signupPasswordIn.value;
  confirmSignUpPassword = confirmSignupPasswordIn.value;
  if (signupPassword != confirmSignUpPassword) {
    window.alert("Passwords do not match");
    isVerified = false;
  }

  if (
    signupEmail == null ||
    confirmSignupEmail == null ||
    signupPassword == null ||
    confirmSignUpPassword == null
  ) {
    window.alert("Please fill out all the inputs");
    isVerified = false;
  }

  if (isVerified) {
    createUserWithEmailAndPassword(auth, signupEmail, signupPassword)
      .then((userCredentials) => {
        // Send email verification
        const user = userCredentials.user;
        sendEmailVerification(user)
          .then(() => {
            window.alert("Success! Account Created. Verification email sent.");
            window.location = "../pages/createTask.html";
          })
         
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }
});

function sendEmailVerification(user) {
  return user.sendEmailVerification();
}

submitButton.addEventListener("click", () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredentials) => {
      const user = userCredentials.user;
      if (!user.emailVerified) {
        window.alert("Please verify your email before logging in.");
      } else {
        // Continue with your login logic
      }
    })
    .catch((error) => {
      window.alert(error.message);
    });
});
