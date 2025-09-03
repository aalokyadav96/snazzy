// ---- Utilities ----
const createElement = (tag, attrs = {}, children = []) => {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "events") for (const [e, fn] of Object.entries(v)) el.addEventListener(e, fn);
    else if (k === "class") el.classList.add(...v.split(" "));
    else if (k === "style") Object.assign(el.style, v);
    else if (k === "dataset") Object.assign(el.dataset, v);
    else if (k in el) el[k] = v;
    else el.setAttribute(k, v);
  }
  [].concat(children).forEach(c => {
    if (c || c === 0) el.appendChild(typeof c === "string" || typeof c === "number" ? document.createTextNode(c) : c);
  });
  return el;
};

// ---- Project Data ----
const projects = [
  {
    id: 1,
    title: "Portfolio Website",
    shortDescription: "My personal portfolio built with vanilla JS and Golang backend.",
    description: "A clean, responsive portfolio showcasing my projects, skills, and contact info.",
    image: "assets/portfolio.png",
    links: [{ url: "https://github.com/aalok/portfolio", text: "GitHub" }]
  },
  {
    id: 2,
    title: "Task Manager",
    shortDescription: "A simple task manager app with MongoDB backend.",
    description: "Lets users create, edit, and delete tasks with JWT authentication.",
    image: "assets/task-manager.png",
    links: [{ url: "https://github.com/aalok/task-manager", text: "GitHub" }]
  }
];

// ---- Pages ----
const HomePage = () =>
  createElement("section", { id: "home" }, [
    createElement("div", { class: "hero" }, [
      createElement("h1", {}, ["Hi, I'm Aalok Yadav"]),
      createElement("p", {}, ["Full-stack Developer (Golang, MongoDB, Vanilla JS)"]),
      createElement("button", {
        id: "view-projects",
        class: "cta-btn",
        events: { click: () => navigate("projects") }
      }, ["View My Work"])
    ])
  ]);

const ProjectsPage = () =>
  createElement("section", { id: "projects" }, [
    createElement("h2", {}, ["Projects"]),
    createElement("div", { class: "grid" },
      projects.map(p => createElement("div", { class: "card" }, [
        createElement("img", { src: p.image, alt: p.title }),
        createElement("h3", {}, [p.title]),
        createElement("p", {}, [p.shortDescription]),
        createElement("button", {
          id: `project-${p.id}`,
          class: "btn-small",
          events: { click: () => navigate("project", { id: p.id }) }
        }, ["Details"])
      ]))
    )
  ]);

const ProjectDetailsPage = ({ id }) => {
  const p = projects.find(x => x.id === id);
  return !p ? createElement("p", {}, ["Project not found."]) :
    createElement("section", { id: "project-details" }, [
      createElement("h2", {}, [p.title]),
      createElement("img", { src: p.image, alt: p.title }),
      createElement("p", {}, [p.description]),
      createElement("div", { class: "links" },
        p.links.map(l => createElement("a", { href: l.url, target: "_blank" }, [l.text]))
      )
    ]);
};

const AboutPage = () =>
  createElement("section", { id: "about" }, [
    createElement("h2", {}, ["About Me"]),
    createElement("p", {}, ["I’m a backend-focused developer with strong skills in Golang, MongoDB, and building fast, clean frontends with vanilla JavaScript."])
  ]);

const ContactPage = () =>
  createElement("section", { id: "contact" }, [
    createElement("h2", {}, ["Contact"]),
    createElement("p", {}, ["Feel free to reach out!"]),
    createElement("a", { href: "mailto:Aalok@example.com" }, ["Aalok@example.com"])
  ]);

// ---- Router ----
const routes = { home: HomePage, projects: ProjectsPage, project: ProjectDetailsPage, about: AboutPage, contact: ContactPage };

function navigate(route, params = {}) {
  window.history.pushState({ route, params }, "", `#${route}`);
  render(route, params);
}

async function render(route, params = {}) {
  const app = document.getElementById("app");
  app.innerHTML = "";

  const themeBtn = createElement("button", { class: "theme-toggle" }, [document.documentElement.getAttribute("data-theme") === "dark" ? "☀️" : "🌙"]);
  themeBtn.addEventListener("click", () => {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    document.documentElement.setAttribute("data-theme", dark ? "light" : "dark");
    themeBtn.textContent = dark ? "🌙" : "☀️";
    localStorage.setItem("theme", dark ? "light" : "dark");
  });

  const header = createElement("header", {}, [
    createElement("div", { class: "logo" }, [createElement("h1", {}, ["Aalok Yadav"])]),
    createElement("nav", {}, [createElement("ul", {}, [
      ...["home", "projects", "about", "contact"].map(r =>
        createElement("li", {}, [createElement("a", { href: "#", events: { click: () => navigate(r) } }, [r[0].toUpperCase() + r.slice(1)])]))
    ])]),
    themeBtn
  ]);

  const page = await routes[route](params);
  const footer = createElement("footer", {}, [createElement("p", {}, ["© 2025 Aalok Yadav"])]);

  app.append(header, createElement("main", {}, [page]), footer);
}

// ---- Init ----
if (localStorage.getItem("theme") === "dark") document.documentElement.setAttribute("data-theme", "dark");
window.addEventListener("popstate", e => {
  const { route, params } = e.state || { route: "home", params: {} };
  render(route, params);
});
render("home");
