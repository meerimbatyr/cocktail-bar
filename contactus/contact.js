import { toggleBar } from "../toggle.js";

const form = document.querySelector(".contact-form");
const alert = document.querySelector(".alert");
const requiredToFill = document.querySelectorAll(".required");
const select = document.querySelector("#title");

toggleBar();
form.addEventListener("submit", (e) => {
  e.preventDefault();

  //checks if inputs are all filled out

  if (select.value === "Title") {
    alertMessage();
    select.style.border = "2px solid red";
  } else {
    select.style.border = "2px solid green";
  }
  requiredToFill.forEach((input) => {
    if (!input.value) {
      alertMessage();
      input.style.border = "2px solid red";
    } else {
      input.style.border = "2px solid green";
    }
  });
});

function alertMessage() {
  alert.style.display = "block";
  alert.innerText = "PLease fill out all required fields";
  setTimeout(() => {
    alert.style.display = "none";
    alert.innerText = "";
  }, 3000);
}

//local storage

const fname = document.querySelector("#fname");
const lname = document.querySelector("#lname");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

fname.value = localStorage.getItem("fname");
fname.oninput = () => localStorage.setItem("fname", fname.value);

lname.value = localStorage.getItem("lname");
lname.oninput = () => localStorage.setItem("lname", lname.value);

email.value = localStorage.getItem("email");
email.oninput = () => localStorage.setItem("email", email.value);

message.value = localStorage.getItem("message");
message.oninput = () => localStorage.setItem("message", message.value);
