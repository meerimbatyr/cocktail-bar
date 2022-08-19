export const toggleBar = function () {
  const toggle = document.querySelector(".nav-toggle");

  //Navbar toggle button
  toggle.addEventListener("click", function (e) {
    const links = e.currentTarget.parentNode.nextElementSibling;
    links.classList.toggle("hidden");
  });
};
