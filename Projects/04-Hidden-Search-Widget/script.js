const search = document.querySelector(".search");
const btn = document.querySelector(".btn");
const input = document.querySelector(".input");
const body = document.getElementById("body");

btn.addEventListener("click", () => {
  search.classList.toggle("active");
  input.focus();
});

window.addEventListener("click", (e) => {
  if (e.target.id == "body") {
    search.classList.toggle("active");
  }
});
