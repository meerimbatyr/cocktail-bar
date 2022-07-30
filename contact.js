const form = document.querySelector(".contact-form");
const alert = document.querySelector(".alert");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  //checks if inputs are all filled out
  const requiredToFill = document.querySelectorAll(".required");
  const select = document.querySelector("#title");
  if (select.value === "Title") {
    alertMessage();
    select.style.border = "2px solid red";
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
