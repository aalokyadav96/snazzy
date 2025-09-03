import { createElement } from "../../components/createElement.js";
import { apiFetch } from "../../../api/api.js";
import Button from "../../components/base/Button.js";

// ---- Page Components ----
const HomePage = () => {
  return createElement("section", { id: "home" }, [
    createElement("div", { class: "hero" }, [
      createElement("h1", {}, ["Hi, I'm Awdhoot Yadav"]),
      createElement("p", {}, ["Full-stack Developer (Golang, MongoDB, Vanilla JS)"]),
      Button("View My Work", "view-projects", {
        click: () => navigate("projects")
      }, "cta-btn")
    ])
  ]);
};

const ProjectsPage = async () => {
  const projects = await apiFetch("/projects");
  return createElement("section", { id: "projects" }, [
    createElement("h2", {}, ["Projects"]),
    createElement("div", { class: "grid" }, projects.map(project =>
      createElement("div", { class: "card" }, [
        createElement("img", { src: project.image, alt: project.title }),
        createElement("h3", {}, [project.title]),
        createElement("p", {}, [project.shortDescription]),
        Button("Details", `project-${project.id}`, {
          click: () => navigate("project", { id: project.id })
        }, "btn-small")
      ])
    ))
  ]);
};

const ProjectDetailsPage = async (params) => {
  const project = await apiFetch(`/projects/${params.id}`);
  if (!project) {
    return createElement("p", {}, ["Project not found."]);
  }
  return createElement("section", { id: "project-details" }, [
    createElement("h2", {}, [project.title]),
    createElement("img", { src: project.image, alt: project.title }),
    createElement("p", {}, [project.description]),
    createElement("div", { class: "links" }, project.links.map(link =>
      createElement("a", { href: link.url, target: "_blank" }, [link.text])
    ))
  ]);
};

const AboutPage = () => {
  return createElement("section", { id: "about" }, [
    createElement("h2", {}, ["About Me"]),
    createElement("p", {}, [
      "I’m a backend-focused developer with strong skills in Golang, MongoDB, and building fast, clean frontends with vanilla JavaScript."
    ])
  ]);
};

const ContactPage = () => {
  return createElement("section", { id: "contact" }, [
    createElement("h2", {}, ["Contact"]),
    createElement("p", {}, ["Feel free to reach out!"]),
    createElement("a", { href: "mailto:awdhoot@example.com" }, ["awdhoot@example.com"])
  ]);
};

// ---- Router ----
const routes = {
  home: HomePage,
  projects: ProjectsPage,
  project: ProjectDetailsPage,
  about: AboutPage,
  contact: ContactPage
};

function navigate(route, params = {}) {
  window.history.pushState({ route, params }, "", `#${route}`);
  render(route, params);
}

async function render(route, params = {}) {
  const app = document.getElementById("app");
  app.innerHTML = ""; // clear
  const themeToggleBtn = createElement("button", { class: "theme-toggle" }, ["🌙"]);

  themeToggleBtn.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
      document.documentElement.removeAttribute("data-theme");
      themeToggleBtn.textContent = "🌙";
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      themeToggleBtn.textContent = "☀️";
      localStorage.setItem("theme", "dark");
    }
  });

  const header = createElement("header", {}, [
    createElement("div", { class: "logo" }, [
      createElement("h1", {}, ["Awdhoot Yadav"])
    ]),
    createElement("nav", {}, [
      createElement("ul", {}, [
        createElement("li", {}, [createElement("a", { href: "#", onclick: () => navigate("home") }, ["Home"])]),
        createElement("li", {}, [createElement("a", { href: "#", onclick: () => navigate("projects") }, ["Projects"])]),
        createElement("li", {}, [createElement("a", { href: "#", onclick: () => navigate("about") }, ["About"])]),
        createElement("li", {}, [createElement("a", { href: "#", onclick: () => navigate("contact") }, ["Contact"])]),
      ])
    ]),
    themeToggleBtn
  ]);


  const page = await routes[route](params);

  const footer = createElement("footer", {}, [
    createElement("p", {}, ["© 2025 Awdhoot Yadav"])
  ]);

  app.appendChild(header);
  app.appendChild(createElement("main", {}, [page]));
  app.appendChild(footer);
}
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.documentElement.setAttribute("data-theme", "dark");
}

// ---- Init ----
window.addEventListener("popstate", (e) => {
  const { route, params } = e.state || { route: "home", params: {} };
  render(route, params);
});

render("home");
