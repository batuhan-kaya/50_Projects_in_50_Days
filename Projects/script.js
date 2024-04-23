const parentSection = document.querySelector(".section");
/*
    Schema
    <div class="content">
          <div class="containerImg">
            <img src="" alt="" class="upgradeIcon" />
            <img src="" alt="" class="projectImg" />
          </div>
          <h3 class="title">Coming Soon</h3>
          <div class="btnAll">
            <div class="btn">
              <a href="#"></a>
            </div>
            <div class="btn">
              <a href="#"></a>
            </div>
          </div>
          <p></p>
        </div>
*/

fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    const projects = data.projects;
    projects.forEach((project, index) => {
      let content = document.createElement("div");
      let containerImgs = document.createElement("div");
      let img = document.createElement("img");
      let title = document.createElement("h3");
      let btnAll = document.createElement("div");
      let demo_button = document.createElement("button");
      let github_button = document.createElement("button");
      let demo_link = document.createElement("a");
      let github_link = document.createElement("a");
      let days = document.createElement("p");

      content.className = "content";
      img.src = project.images;
      img.className = "projectImg";
      containerImgs.className = "containerImg";
      title.className = "title";
      title.textContent = project.title;
      btnAll.className = "btnAll";
      demo_button.className = "btn";
      github_button.className = "btn";
      demo_link.href = project.demo_link;
      demo_link.setAttribute("target", "_blank");
      github_link.href = project.github_link;
      github_link.setAttribute("target", "_blank");
      demo_link.innerHTML = `<i class="fa-solid fa-link"></i></i>Demo`;
      github_link.innerHTML = `<i class="fa-brands fa-github"></i>Github`;
      days.textContent = `Day: ${index + 1}`;

      parentSection.appendChild(content);
      content.appendChild(containerImgs);
      containerImgs.appendChild(img);
      content.appendChild(title);
      content.appendChild(btnAll);
      btnAll.append(demo_button, github_button);
      demo_button.appendChild(demo_link);
      github_button.appendChild(github_link);
      content.appendChild(days);

      if (project.upgradeIcon) {
        containerImgs.insertAdjacentHTML("beforeend", `<img id="iconInfo" class="imgIcon" src="${project.upgradeIcon}">`);
      }
    });
    disableButton();
  });

// Button Disable
function disableButton() {
  let url = "https://live-50-projects-in-50-days.vercel.app/#";
  const disableBtnAll = document.querySelectorAll(".btn");
  disableBtnAll.forEach((disableBtn) => {
    if (url == disableBtn.firstElementChild.href) {
      disableBtn.firstElementChild.remove();
      disableBtn.classList.add("disableButton");
      disableBtn.innerHTML = `<i class="fa-solid fa-screwdriver-wrench"></i>`;
    }
  });
}

// Scroll effect
ScrollReveal({ reset: false });
ScrollReveal().reveal(".content");

// UpButton

function scrollup() {
  const scrollup = document.querySelector(".upBtn");
  if (this.scrollY >= 560) scrollup.classList.add("show");
  else scrollup.classList.remove("show");
}
window.addEventListener("scroll", scrollup);

// Background Change
const backgroundButtons = document.querySelectorAll(".bg-btn");
backgroundButtons.forEach((button) => {
  button.onclick = () => {
    themeChange(button.dataset.name);
    localStorage.setItem("selected-theme", button.dataset.name);
  };
});

const themes = ["rainbow-theme", "dark-theme", "purple-theme"];

function themeChange(theme) {
  document.body.classList = themes.find((x) => x == theme);
}

const selectedTheme = localStorage.getItem("selected-theme");

const getCurrentTheme = () => (!selectedTheme ? document.body.classList.add("rainbow-theme") : document.body.classList.add(selectedTheme));

getCurrentTheme();

//tab change title

window.onload = function () {
  let pageTitle = document.title;
  let attentionMessage = "Come Back Please ❤";

  document.addEventListener("visibilitychange", function () {
    let isPageActive = !document.hidden;

    if (!isPageActive) {
      document.title = attentionMessage;
    } else {
      document.title = pageTitle;
    }
  });
};
