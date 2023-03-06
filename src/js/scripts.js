const openMenu = document.querySelector("#mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav-links");
const shortenForm = document.querySelector("#shorten-form");
const shortThis = document.querySelector("#short-this");
const shortBtn = document.querySelector("#submit-btn");

openMenu.addEventListener("click", () => {
  openMenu.classList.toggle("bi-list");
  openMenu.classList.toggle("bi-x-lg");
  mobileNav.classList.toggle("active");
});

shortBtn.addEventListener("click", (e) => {
  e.preventDefault();

  let isEmpty = shortThis.value == "";

  if (isEmpty) {
    shortenForm.classList.add("error");
    shortThis.classList.add("error");
  } else {
    shortenForm.classList.remove("error");
    shortThis.classList.remove("error");
  }
});
