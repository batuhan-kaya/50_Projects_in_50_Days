const parentSection = document.querySelector(".section");
/*
    Schema
    <div class="content">
      <img src="" alt="" />
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
    projects.map((project, index) => {
      let content = document.createElement("div");
      let img = document.createElement("img");
      let title = document.createElement("h3");
      let btnAll = document.createElement("div");
      let demo_button = document.createElement("div");
      let github_button = document.createElement("div");
      let demo_link = document.createElement("a");
      let github_link = document.createElement("a");
      let days = document.createElement("p");

      content.className = "content";
      img.src = project.images;
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
      content.appendChild(img);
      content.appendChild(title);
      content.appendChild(btnAll);
      btnAll.append(demo_button, github_button);
      demo_button.appendChild(demo_link);
      github_button.appendChild(github_link);
      content.appendChild(days);
    });
  });

// Scroll effect
ScrollReveal({ reset: false });
ScrollReveal().reveal(".content");

// Loader
window.addEventListener("load", fg_load);

function fg_load() {
  document.getElementById("loading").style.display = "none";
}

// UpButton
let mybutton = document.querySelector(".upBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
    mybutton.classList.add("show");
  } else {
    mybutton.classList.remove("show");
  }
}

mybutton.addEventListener("click", topFunction);

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
