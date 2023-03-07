const openMenu = document.querySelector("#mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav-links");
const shortenForm = document.querySelector("#shorten-form");
const shortThis = document.querySelector("#short-this");
const shortBtn = document.querySelector("#submit-btn");
const api = "https://api.shrtco.de/v2/shorten?url=";

// Functions
async function getShorten() {
  let url = shortThis.value;

  let response = await fetch(api + url);
  let data = await response.json().then((data) => {
    console.log(data.result.full_short_link2);
    console.log(data.result.original_link);
  });
}

// Event handlers

openMenu.addEventListener("click", () => {
  openMenu.classList.toggle("bi-list");
  openMenu.classList.toggle("bi-x-lg");
  mobileNav.classList.toggle("active");
});

shortBtn.addEventListener("click", (e) => {
  e.preventDefault();
  getShorten();

  let isEmpty = shortThis.value == "";

  if (isEmpty) {
    shortenForm.classList.add("error");
    shortThis.classList.add("error");
  } else {
    shortenForm.classList.remove("error");
    shortThis.classList.remove("error");
  }
});
