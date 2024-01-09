const openMenu = document.querySelector("#mobile-menu-btn");
const mobileNav = document.querySelector(".mobile-nav-links");
const shortenForm = document.querySelector("#shorten-form");
const shortThis = document.querySelector("#short-this");
const shortBtn = document.querySelector("#submit-btn");
const statsSection = document.querySelector("#advanced-stats");
const loadingElement = document.querySelector("#loading");
const urlsContainer = document.querySelector("#urls-container");
// const api = "https://api.shrtco.de/v2/shorten?url=";

// Functions
async function getShorten() {
  showLoading();
  const url = shortThis.value;
  const alias = Math.random() * 100;
  const request = new Request(url, {
    url: url,
    domain: "tinyurl.com",
    alias: alias,
    tags: "",
    expires_at: "",
    description: "string",
  });
  const response = await fetch(request);

  const data = await response.json().then((data) => {
    hideLoading();
    // addUrlElement(data.result.original_link, data.result.full_short_link2);
  });
  console.log(data);
}

function showLoading() {
  loadingElement.classList.add("show");
}

function hideLoading() {
  loadingElement.classList.remove("show");
}

function generateId() {
  return Date.now();
}

function addUrlElement(originalUrl, shortenedUrl) {
  urlsArr = getFromStorage();

  let urlObj = {
    id: generateId(),
    originalUrl: originalUrl,
    shortenedUrl: shortenedUrl,
  };

  urlsArr.push(urlObj);

  let urlEl = createUrlElement(
    urlObj.id,
    urlObj.originalUrl,
    urlObj.shortenedUrl
  );

  urlsContainer.prepend(urlEl);

  saveToStorage(urlsArr);

  loadPage();
}

function createUrlElement(id, originalUrl, shortenedUrl) {
  let urlEl = document.createElement("div");
  urlEl.classList.add("url-element");

  let original = document.createElement("p");
  original.classList.add("grow");
  original.textContent = originalUrl;

  let shortened = document.createElement("p");
  shortened.classList.add("shortened");
  shortened.textContent = shortenedUrl;

  let copyBtn = document.createElement("button");
  copyBtn.classList.add("btn");
  copyBtn.textContent = "Copy";

  urlEl.appendChild(original);
  urlEl.appendChild(shortened);
  urlEl.appendChild(copyBtn);

  // Event in the element
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(shortened.textContent);
    copyBtn.classList.add("copied");
    copyBtn.textContent = "Copied!";
  });

  return urlEl;
}

function getFromStorage() {
  return (savedUrls = JSON.parse(localStorage.getItem("urls") || "[]"));
}

function saveToStorage(urlArr) {
  urlsJson = JSON.stringify(urlArr);

  localStorage.setItem("urls", urlsJson);
}

function loadPage() {
  cleanUrls();

  getFromStorage().forEach((url) => {
    let urlEl = createUrlElement(url.id, url.originalUrl, url.shortenedUrl);
    urlsContainer.prepend(urlEl);
  });
}

function cleanUrls() {
  urlsContainer.innerHTML = " ";
}

// Event handlers

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
    getShorten();
  }
});

// Load page
loadPage();
