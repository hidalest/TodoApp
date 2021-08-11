const body = document.querySelector("body");
const darkModeToggle = document.querySelector(".image--darkMode");

darkModeToggle.addEventListener("click", (e) => {
  console.log(`clicked`);
  body.classList.toggle("dark-body");
  darkModeToggle.src = `/images/icon-${"sun" ? "sun" : "moon"}.svg`;
});
