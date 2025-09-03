// ---- Utilities ----
const API_URL = "/api";

const apiFetch = async (endpoint, method = "GET", body = null, options = {}) => {
  const controller = options.controller || new AbortController();
  const fetchOptions = {
    method,
    headers: body && !(body instanceof FormData) ? { "Content-Type": "application/json" } : {},
    signal: controller.signal
  };
  if (body) fetchOptions.body = body instanceof FormData ? body : typeof body === "object" ? JSON.stringify(body) : body;

  const res = await fetch(`${API_URL}${endpoint}`, fetchOptions);
  if (!res.ok) throw new Error(await res.text() || `HTTP ${res.status}`);
  if (options.responseType === "blob") return res;
  if (options.responseType === "arrayBuffer") return await res.arrayBuffer();
  const text = await res.text();
  try { return text ? JSON.parse(text) : null; } catch { return text; }
};

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

const Button = (title, id = "", events = {}, classes = "", styles = {}) =>
  createElement("button", { id, class: `button ${classes}`, style: styles, events }, [title]);

// ---- Pages ----
const HomePage = () =>
  createElement("section", { id: "home" }, [
    createElement("div", { class: "hero" }, [
      createElement("h1", {}, ["Hi, I'm Aalok Yadav"]),
      createElement("p", {}, ["Full-stack Developer (Golang, MongoDB, Vanilla JS)"]),
      Button("View My Work", "view-projects", { click: () => navigate("projects") }, "cta-btn")
    ])
  ]);

const ProjectsPage = async () => {
  const projects = await apiFetch("/projects");
  return createElement("section", { id: "projects" }, [
    createElement("h2", {}, ["Projects"]),
    createElement("div", { class: "grid" },
      projects.map(p => createElement("div", { class: "card" }, [
        createElement("img", { src: p.image, alt: p.title }),
        createElement("h3", {}, [p.title]),
        createElement("p", {}, [p.shortDescription]),
        Button("Details", `project-${p.id}`, { click: () => navigate("project", { id: p.id }) }, "btn-small")
      ]))
    )
  ]);
};

const ProjectDetailsPage = async ({ id }) => {
  const p = await apiFetch(`/projects/${id}`);
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
