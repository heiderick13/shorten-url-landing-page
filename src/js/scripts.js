const openMenu = document.querySelector("#mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav-links");

openMenu.addEventListener("click", () => {
  openMenu.classList.toggle("bi-list");
  openMenu.classList.toggle("bi-x-lg");
  mobileNav.classList.toggle("active");
});
